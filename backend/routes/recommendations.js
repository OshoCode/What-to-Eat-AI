import express from 'express';
import { getRecommendations } from '../services/recommendationService.js';

const router = express.Router();

/**
 * POST /api/recommendations
 * 
 * Request Body:
 * {
 *   location: {
 *     lat: 13.7563,
 *     lng: 100.5018
 *   },
 *   budget: 2,
 *   cuisines: ["street-food", "thai"],
 *   dietaryRestrictions: ["vegetarian"],
 *   timePreference: "now" // or "2024-01-15T18:00:00"
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   results: [
 *     {
 *       id: 1,
 *       name_th: "ร้านอาหารไทยอร่อย",
 *       address_th: "123 ถนนสุขุมวิท",
 *       budget_level: 2,
 *       tags: ["street-food", "thai"],
 *       distance: 500, // in meters
 *       suitability_score: 0.95,
 *       opening_hours: {...}
 *     }
 *   ]
 * }
 */
router.post('/recommendations', async (req, res) => {
    try {
        const {
            location,
            budget,
            cuisines = [],
            dietaryRestrictions = [],
            timePreference = 'now'
        } = req.body;

        // Validate required fields
        if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
            return res.status(400).json({
                success: false,
                error: 'Invalid location. Must provide lat and lng as numbers.'
            });
        }

        if (!budget || (budget < 1 || budget > 3)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid budget. Must be 1, 2, or 3.'
            });
        }

        // Get recommendations
        const results = await getRecommendations({
            location,
            budget,
            cuisines,
            dietaryRestrictions,
            timePreference
        });

        res.json({
            success: true,
            count: results.length,
            results
        });

    } catch (error) {
        console.error('Error in recommendations endpoint:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get recommendations',
            message: error.message
        });
    }
});

export default router;

