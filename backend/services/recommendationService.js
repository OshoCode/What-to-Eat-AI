import pool from '../config/database.js';

/**
 * Two-Stage Recommendation Algorithm
 * 
 * Stage 1: Hard Filtering (SQL) - Filters restaurants based on strict criteria
 * Stage 2: Soft Scoring (JavaScript) - Scores remaining restaurants for ranking
 */

/**
 * Calculate suitability score for a restaurant
 * @param {Object} restaurant - Restaurant data from database
 * @param {Object} preferences - User preferences
 * @returns {number} - Score between 0 and 1
 */
function calculateSuitabilityScore(restaurant, preferences) {
    let score = 1.0; // Start with perfect score

    const { budget, cuisines, dietaryRestrictions, timePreference } = preferences;

    // Budget matching (0.3 weight)
    if (restaurant.budget_level === budget) {
        // Perfect match
        score += 0.3;
    } else if (Math.abs(restaurant.budget_level - budget) === 1) {
        // Close match (1 level difference)
        score += 0.15;
    }
    // If 2 levels apart, no bonus

    // Cuisine matching (0.4 weight)
    if (restaurant.tags && cuisines.length > 0) {
        const matchingCuisines = cuisines.filter(cuisine => 
            restaurant.tags.includes(cuisine)
        ).length;
        
        if (matchingCuisines > 0) {
            // Match ratio: how many of user's preferred cuisines match
            const matchRatio = matchingCuisines / cuisines.length;
            score += 0.4 * matchRatio;
        } else {
            // No cuisine match - significant penalty
            score -= 0.2;
        }
    }

    // Dietary restrictions (0.2 weight - critical filter)
    if (restaurant.tags && dietaryRestrictions.length > 0) {
        const hasAllRestrictions = dietaryRestrictions.every(restriction =>
            restaurant.tags.includes(restriction)
        );
        
        if (hasAllRestrictions) {
            score += 0.2; // Bonus for matching all restrictions
        } else {
            // Missing a dietary restriction - major penalty
            score -= 0.5;
        }
    }

    // Distance factor (0.1 weight) - closer is better
    // Distance is already in meters
    if (restaurant.distance) {
        if (restaurant.distance < 500) {
            score += 0.1; // Very close
        } else if (restaurant.distance < 1000) {
            score += 0.05; // Close
        } else if (restaurant.distance > 3000) {
            score -= 0.05; // Too far
        }
    }

    // Opening hours check (bonus/penalty)
    if (timePreference === 'now') {
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
        
        if (restaurant.opening_hours && restaurant.opening_hours[currentDay]) {
            const hours = restaurant.opening_hours[currentDay];
            if (hours.includes('-')) {
                const [openTime, closeTime] = hours.split('-');
                if (currentTime >= openTime && currentTime <= closeTime) {
                    score += 0.1; // Bonus: restaurant is open now
                } else {
                    score -= 0.3; // Penalty: restaurant is closed
                }
            }
        }
    }

    // Ensure score is between 0 and 1
    return Math.max(0, Math.min(1, score));
}

/**
 * Main recommendation function
 * Implements Two-Stage Algorithm
 */
export async function getRecommendations(preferences) {
    const { location, budget, cuisines, dietaryRestrictions, timePreference } = preferences;

    // Stage 1: Hard Filtering with SQL + PostGIS
    // This query does the heavy lifting in the database
    
    // Build the SQL query with PostGIS functions
    let query = `
        SELECT 
            id,
            name_th,
            address_th,
            budget_level,
            tags,
            opening_hours,
            -- PostGIS function: Calculate distance in meters
            ST_Distance(
                location,
                ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
            ) AS distance
        FROM restaurants
        WHERE 
            -- Budget filter (allow ±1 level for flexibility)
            budget_level BETWEEN $3 - 1 AND $3 + 1
            
            -- Location filter: Within 5km radius
            AND ST_DWithin(
                location,
                ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
                5000 -- 5km in meters
            )
    `;

    const queryParams = [location.lng, location.lat, budget];
    let paramCounter = 4;

    // Add cuisine filter if specified (must match at least one)
    if (cuisines.length > 0) {
        query += ` AND tags && $${paramCounter}::text[]`;
        queryParams.push(cuisines);
        paramCounter++;
    }

    // Add dietary restrictions filter (MUST have all restrictions)
    if (dietaryRestrictions.length > 0) {
        query += ` AND tags @> $${paramCounter}::text[]`;
        queryParams.push(dietaryRestrictions);
        paramCounter++;
    }

    // Order by distance (closest first) and limit to top 100 for Stage 2 processing
    query += `
        ORDER BY distance ASC
        LIMIT 100
    `;

    try {
        // Execute Stage 1 query
        const result = await pool.query(query, queryParams);
        const restaurants = result.rows;

        if (restaurants.length === 0) {
            return [];
        }

        // Stage 2: Soft Scoring in JavaScript
        const scoredRestaurants = restaurants.map(restaurant => ({
            ...restaurant,
            suitability_score: calculateSuitabilityScore(restaurant, preferences),
            distance: Math.round(restaurant.distance) // Round distance to integer
        }));

        // Sort by suitability score (highest first), then by distance
        scoredRestaurants.sort((a, b) => {
            if (Math.abs(a.suitability_score - b.suitability_score) > 0.01) {
                return b.suitability_score - a.suitability_score;
            }
            return a.distance - b.distance;
        });

        // Return top 20 recommendations
        return scoredRestaurants.slice(0, 20);

    } catch (error) {
        console.error('Error in getRecommendations:', error);
        throw error;
    }
}

