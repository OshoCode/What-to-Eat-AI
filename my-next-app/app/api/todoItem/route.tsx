import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const res = await fetch('http://localhost:3000/todoItems');
        if (!res.ok) {
            throw new Error('Failed to fetch todos');
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch todos' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const res = await fetch('http://localhost:3000/todoItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create todo' },
            { status: 500 }
        );
    }
}
