import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
        return NextResponse.json(
            { error: 'City parameter is required' },
            { status: 400 }
        );
    }

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );
        
        if (!res.ok) {
            throw new Error('Weather API request failed');
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
} 