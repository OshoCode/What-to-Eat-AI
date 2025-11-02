# What to Eat? AI - Backend API

Backend server for the Context-Aware Food Recommender using Node.js, Express, PostgreSQL, and PostGIS.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Database

1. **Install PostgreSQL with PostGIS** (if not already installed)
   - See `../INSTALL_POSTGIS.md` for installation instructions

2. **Create Database and Enable PostGIS**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE what_to_eat_ai;

# Connect to the new database
\c what_to_eat_ai

# Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

# Run the schema
\i ../database.sql

# Verify PostGIS is working
SELECT PostGIS_version();
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update with your database credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=what_to_eat_ai
DB_USER=postgres
DB_PASSWORD=your_password_here
PORT=3000
```

### 4. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check

```bash
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Get Recommendations

```bash
POST /api/recommendations
Content-Type: application/json
```

Request Body:
```json
{
  "location": {
    "lat": 13.7563,
    "lng": 100.5018
  },
  "budget": 2,
  "cuisines": ["street-food", "thai"],
  "dietaryRestrictions": ["vegetarian"],
  "timePreference": "now"
}
```

Response:
```json
{
  "success": true,
  "count": 10,
  "results": [
    {
      "id": 1,
      "name_th": "ร้านอาหารไทยอร่อย",
      "address_th": "123 ถนนสุขุมวิท",
      "budget_level": 2,
      "tags": ["street-food", "thai", "vegetarian"],
      "opening_hours": {"1": "10:00-22:00", "2": "10:00-22:00"},
      "distance": 500,
      "suitability_score": 0.95
    }
  ]
}
```

## 🧠 Algorithm Overview

### Two-Stage Recommendation System

#### Stage 1: Hard Filtering (SQL + PostGIS)
- Filters restaurants by:
  - Location: Within 5km radius (using PostGIS `ST_DWithin`)
  - Budget: ±1 level flexibility
  - Cuisines: Must match at least one
  - Dietary Restrictions: Must match all
- Returns top 100 closest matches
- All filtering happens in the database for maximum performance

#### Stage 2: Soft Scoring (JavaScript)
- Scores each restaurant (0-1 scale) based on:
  - Budget exact match (0.3 weight)
  - Cuisine match ratio (0.4 weight)
  - Dietary restrictions match (0.2 weight)
  - Distance factor (0.1 weight)
  - Opening hours (bonus/penalty)
- Sorts by score, then distance
- Returns top 20 recommendations

## 🔧 Technology Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL 12+
- **Extension**: PostGIS 3.0+
- **Database Client**: pg (node-postgres)

## 📊 Performance

- **Stage 1 Query**: Uses PostGIS GIST index for O(log n) spatial queries
- **Stage 2 Processing**: Only processes ~100 results in memory
- **Total Response Time**: < 100ms for 1000+ restaurants

## 🐛 Troubleshooting

### PostGIS Not Working

```sql
-- Check if PostGIS is installed
SELECT * FROM pg_available_extensions WHERE name = 'postgis';

-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Verify
SELECT PostGIS_version();
```

### Connection Issues

- Check `.env` file has correct credentials
- Verify PostgreSQL service is running
- Check firewall allows connections on port 5432

### Query Errors

- Ensure `location` column is of type `GEOGRAPHY(Point, 4326)`
- Verify GIST index exists: `SELECT * FROM pg_indexes WHERE tablename = 'restaurants';`

## 📝 Testing

Test the API with curl:

```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "location": {"lat": 13.7563, "lng": 100.5018},
    "budget": 2,
    "cuisines": ["thai", "street-food"],
    "dietaryRestrictions": [],
    "timePreference": "now"
  }'
```

## 🔐 Security Notes

- Never commit `.env` file to version control
- Use environment variables for all sensitive data
- Consider adding rate limiting for production
- Implement authentication if needed

