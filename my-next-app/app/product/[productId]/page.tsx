import AddToCart from "./AddToCart";

export async function generateMetadata({ params }: { params: { productId: string } }) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${params.productId}`);
        if (!res.ok) {
            return {
                title: 'Product Not Found',
                description: 'The requested product could not be found.',
            };
        }
        const product = await res.json();
        return {
            title: product.title,
            description: product.description,
        };
    } catch (error) {
        return {
            title: 'Error',
            description: 'Failed to load product details.',
        };
    }
}

interface Product {
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export default async function Product({ params }: { params: { productId: string } }) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${params.productId}`);
        if (!res.ok) {
            throw new Error('Failed to fetch product');
        }
        const product: Product = await res.json();
        
        return (
            <div>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <p>{product.category}</p>
                <img src={product.image} alt={product.title} />
                <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                <AddToCart productId={params.productId} />
            </div>
        );
    } catch (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>Failed to load product. Please try again later.</p>
            </div>
        );
    }
}