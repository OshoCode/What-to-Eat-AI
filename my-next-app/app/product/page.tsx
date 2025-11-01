import Link from "next/link";

export default function Product() {
    return (
        <div>
            <h1>Product</h1>
            <Link href="/product/1">Product 1</Link>
            <Link href="/product/2">Product 2</Link>
            <Link href="/product/3">Product 3</Link>
        </div>
    )
}
