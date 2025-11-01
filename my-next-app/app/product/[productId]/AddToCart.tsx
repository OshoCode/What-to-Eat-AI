'use client'
import { useState } from 'react';

interface AddToCartProps {
    productId: string;
}

export default function AddToCart({ productId }: AddToCartProps) {
    const [addedToCart, setAddedToCart] = useState(false);

    return (
        <div>
            <button onClick={() => setAddedToCart(true)}>Add to Cart</button>
            <p>Added to Cart: {addedToCart ? 'Yes' : 'No'}</p>
        </div>
    )
}
