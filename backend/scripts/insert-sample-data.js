/**
 * Sample Data Insertion Script
 * 
 * This script inserts sample restaurant data into the database for testing.
 * Run this after setting up the database schema.
 * 
 * Usage: node scripts/insert-sample-data.js
 */

import pool from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

// Sample restaurant data (Bangkok area)
const sampleRestaurants = [
    {
        name_th: 'ร้านอาหารไทยอร่อย',
        address_th: '123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพมหานคร',
        lat: 13.7300,
        lng: 100.5420,
        budget_level: 2,
        tags: ['thai', 'street-food'],
        opening_hours: {
            '1': '10:00-22:00',
            '2': '10:00-22:00',
            '3': '10:00-22:00',
            '4': '10:00-22:00',
            '5': '10:00-22:00',
            '6': '10:00-23:00',
            '0': '10:00-23:00'
        }
    },
    {
        name_th: 'สตรีทฟู้ดเด็ด',
        address_th: '456 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร',
        lat: 13.7300,
        lng: 100.5350,
        budget_level: 1,
        tags: ['street-food', 'thai', 'vegetarian'],
        opening_hours: {
            '1': '08:00-20:00',
            '2': '08:00-20:00',
            '3': '08:00-20:00',
            '4': '08:00-20:00',
            '5': '08:00-20:00',
            '6': '08:00-21:00',
            '0': '08:00-21:00'
        }
    },
    {
        name_th: 'ร้านนั่งชิล',
        address_th: '789 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพมหานคร',
        lat: 13.7350,
        lng: 100.5450,
        budget_level: 2,
        tags: ['relaxed', 'thai', 'healthy'],
        opening_hours: {
            '1': '09:00-21:00',
            '2': '09:00-21:00',
            '3': '09:00-21:00',
            '4': '09:00-21:00',
            '5': '09:00-22:00',
            '6': '09:00-22:00',
            '0': '09:00-22:00'
        }
    },
    {
        name_th: 'ร้านอาหารญี่ปุ่นพรีเมียม',
        address_th: '321 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร',
        lat: 13.7280,
        lng: 100.5380,
        budget_level: 3,
        tags: ['japanese'],
        opening_hours: {
            '1': '11:30-14:00,17:00-22:00',
            '2': '11:30-14:00,17:00-22:00',
            '3': '11:30-14:00,17:00-22:00',
            '4': '11:30-14:00,17:00-22:00',
            '5': '11:30-14:00,17:00-22:30',
            '6': '11:30-14:00,17:00-22:30',
            '0': '11:30-14:00,17:00-22:30'
        }
    },
    {
        name_th: 'ร้านอาหารคลีน',
        address_th: '555 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพมหานคร',
        lat: 13.7320,
        lng: 100.5400,
        budget_level: 2,
        tags: ['healthy', 'vegetarian', 'vegan'],
        opening_hours: {
            '1': '07:00-19:00',
            '2': '07:00-19:00',
            '3': '07:00-19:00',
            '4': '07:00-19:00',
            '5': '07:00-19:00',
            '6': '08:00-18:00',
            '0': '08:00-18:00'
        }
    },
    {
        name_th: 'ร้านอาหารเกาหลี',
        address_th: '888 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร',
        lat: 13.7260,
        lng: 100.5320,
        budget_level: 2,
        tags: ['korean'],
        opening_hours: {
            '1': '11:00-21:00',
            '2': '11:00-21:00',
            '3': '11:00-21:00',
            '4': '11:00-21:00',
            '5': '11:00-22:00',
            '6': '11:00-22:00',
            '0': '11:00-22:00'
        }
    },
    {
        name_th: 'ของหวานเจ้าเก่า',
        address_th: '999 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพมหานคร',
        lat: 13.7370,
        lng: 100.5480,
        budget_level: 1,
        tags: ['dessert', 'thai'],
        opening_hours: {
            '1': '10:00-22:00',
            '2': '10:00-22:00',
            '3': '10:00-22:00',
            '4': '10:00-22:00',
            '5': '10:00-23:00',
            '6': '10:00-23:00',
            '0': '10:00-23:00'
        }
    },
    {
        name_th: 'ร้านอาหารทะเลสด',
        address_th: '222 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพมหานคร',
        lat: 13.7240,
        lng: 100.5300,
        budget_level: 3,
        tags: ['seafood', 'thai'],
        opening_hours: {
            '1': '16:00-23:00',
            '2': '16:00-23:00',
            '3': '16:00-23:00',
            '4': '16:00-23:00',
            '5': '16:00-00:00',
            '6': '16:00-00:00',
            '0': '16:00-23:00'
        }
    }
];

async function insertSampleData() {
    try {
        console.log('🔄 Starting sample data insertion...');

        // Clear existing data (optional - comment out if you want to keep existing data)
        await pool.query('DELETE FROM restaurants;');
        console.log('✅ Cleared existing restaurants');

        // Insert sample restaurants
        for (const restaurant of sampleRestaurants) {
            const query = `
                INSERT INTO restaurants (
                    name_th,
                    address_th,
                    location,
                    budget_level,
                    tags,
                    opening_hours
                ) VALUES (
                    $1,
                    $2,
                    ST_SetSRID(ST_MakePoint($3, $4), 4326)::geography,
                    $5,
                    $6,
                    $7
                )
            `;

            await pool.query(query, [
                restaurant.name_th,
                restaurant.address_th,
                restaurant.lng, // Note: PostGIS uses (longitude, latitude) order
                restaurant.lat,
                restaurant.budget_level,
                restaurant.tags,
                JSON.stringify(restaurant.opening_hours)
            ]);
        }

        console.log(`✅ Successfully inserted ${sampleRestaurants.length} restaurants`);

        // Verify insertion
        const count = await pool.query('SELECT COUNT(*) FROM restaurants;');
        console.log(`📊 Total restaurants in database: ${count.rows[0].count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error inserting sample data:', error);
        process.exit(1);
    }
}

insertSampleData();

