"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/products"
import type { Product } from "@/lib/types"
import { useCart } from "@/context/cart.context"
import { useWishlist } from "@/context/wishlist.context"
import {
  Star,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle,
  Truck,
  RefreshCw,
  ShieldCheck,
} from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  useEffect(() => {
    // Find the product by ID
    const productId = params.productId as string
    const foundProduct = products.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      // Product not found, redirect to shop page
      router.push("/shop")
    }
  }, [params.productId, router])

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      // Add the product to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }

      // Show success message
      setAddedToCart(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setAddedToCart(false)
      }, 3000)
    }
  }

  const handleWishlistToggle = () => {
    if (!product) return

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  // Generate random specifications for the product
  const specifications = [
    { name: "Material", value: "Recycled Polyester" },
    { name: "Weight", value: "1.2 kg" },
    { name: "Dimensions", value: "30 x 45 x 15 cm" },
    { name: "Capacity", value: "35L" },
    { name: "Waterproof", value: "Yes" },
    { name: "Warranty", value: "Lifetime" },
  ]

  // Generate random reviews
  const reviews = [
    {
      id: 1,
      author: "Alex Johnson",
      date: "2023-10-15",
      rating: 5,
      content:
        "This product exceeded my expectations. The quality is outstanding and it has held up well during my recent hiking trip in the Rockies.",
    },
    {
      id: 2,
      author: "Sarah Miller",
      date: "2023-09-22",
      rating: 4,
      content:
        "Great product overall. Comfortable and durable. The only reason I'm giving 4 stars instead of 5 is that I wish it had one more pocket for organization.",
    },
    {
      id: 3,
      author: "Michael Chen",
      date: "2023-08-30",
      rating: 5,
      content:
        "Perfect for my needs. I've used it on multiple camping trips and it's still like new. Highly recommend to anyone looking for reliable outdoor gear.",
    },
  ]

  // Get related products (same category)
  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : []

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2A5D3C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2A5D3C]">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/shop" className="hover:text-[#2A5D3C]">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-[#2A5D3C]">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700 font-medium truncate">{product.name}</span>
        </div>

        {/* Back to Shop Button (Mobile) */}
        <div className="mb-6 md:hidden">
          <Link href="/shop" className="inline-flex items-center text-[#2A5D3C] hover:underline font-medium">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6">
            {/* Product Image */}
            <div className="lg:col-span-2">
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-[#4CAF50] text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </span>
                )}
                {product.isOnSale && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    SALE
                  </span>
                )}
              </div>

              {/* Additional Images (Thumbnails) */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="relative h-20 rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-3">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>

              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < product.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="mb-6">
                {product.isOnSale && product.salePrice ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-red-600">${product.salePrice.toFixed(2)}</span>
                    <span className="text-xl text-gray-500 line-through ml-3">${product.price.toFixed(2)}</span>
                    <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium px-2 py-0.5 rounded">
                      Save ${(product.price - product.salePrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                )}
              </div>

              <p className="text-gray-700 mb-6">{product.shortDescription}</p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                    className="p-2 w-16 text-center border-y border-gray-300 focus:outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`flex-grow ${
                    addedToCart ? "bg-[#4CAF50]" : "bg-[#2A5D3C] hover:bg-[#1e4a2e]"
                  } text-white font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center`}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`flex-grow sm:flex-grow-0 border ${
                    isInWishlist(product.id)
                      ? "border-red-300 bg-red-50 hover:bg-red-100 text-red-600"
                      : "border-gray-300 hover:bg-gray-50 text-gray-700"
                  } font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                  <span className="sm:hidden md:inline">
                    {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  </span>
                </button>
                <button className="flex-grow sm:flex-grow-0 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center">
                  <Share2 className="h-5 w-5 mr-2" />
                  <span className="sm:hidden md:inline">Share</span>
                </button>
              </div>

              {/* Product Highlights */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Product Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Premium quality materials</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Waterproof construction</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Lightweight design</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Multiple compartments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ergonomic design for comfort</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Lifetime warranty</span>
                  </li>
                </ul>
              </div>

              {/* Shipping Info */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-[#2A5D3C] mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Free Shipping</h4>
                      <p className="text-xs text-gray-500">On orders over $100</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <RefreshCw className="h-5 w-5 text-[#2A5D3C] mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Easy Returns</h4>
                      <p className="text-xs text-gray-500">30-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-[#2A5D3C] mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">Secure Checkout</h4>
                      <p className="text-xs text-gray-500">SSL encrypted payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === "description"
                    ? "border-b-2 border-[#2A5D3C] text-[#2A5D3C]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === "specifications"
                    ? "border-b-2 border-[#2A5D3C] text-[#2A5D3C]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === "reviews"
                    ? "border-b-2 border-[#2A5D3C] text-[#2A5D3C]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>

            <div className="p-6">
              {/* Description Tab */}
              {activeTab === "description" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                  <div className="prose max-w-none text-gray-700">
                    <p className="mb-4">
                      The {product.name} is designed for outdoor enthusiasts who demand quality, durability, and
                      functionality. Whether you're embarking on a day hike or a multi-day adventure, this product
                      provides the reliability you need in the wilderness.
                    </p>
                    <p className="mb-4">
                      Crafted from premium materials, it features a waterproof exterior that protects your gear from the
                      elements. The ergonomic design ensures comfort during extended use, while multiple compartments
                      offer organized storage for all your essentials.
                    </p>
                    <p>
                      Our commitment to quality is reflected in every stitch and seam. We stand behind our products with
                      a lifetime warranty against manufacturing defects, ensuring your investment is protected for years
                      to come.
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold mt-8 mb-4">Features</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Constructed with durable, eco-friendly materials</li>
                    <li>Water-resistant exterior keeps your gear dry in wet conditions</li>
                    <li>Reinforced stitching at stress points for enhanced durability</li>
                    <li>Ergonomic design minimizes strain during extended use</li>
                    <li>Multiple compartments for organized storage</li>
                    <li>Adjustable components for a customized fit</li>
                    <li>Reflective elements for visibility in low-light conditions</li>
                    <li>Compatible with hydration systems (sold separately)</li>
                  </ul>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        {specifications.map((spec, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                            <td className="py-3 px-4 border-b border-gray-200 font-medium">{spec.name}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-lg font-semibold mt-8 mb-4">What's Included</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>1 x {product.name}</li>
                    <li>User manual</li>
                    <li>Care instructions</li>
                    <li>Warranty information</li>
                  </ul>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <button className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium py-2 px-4 rounded-md transition duration-300">
                      Write a Review
                    </button>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="flex mr-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${i < product.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-bold">{product.rating.toFixed(1)} out of 5</span>
                    </div>
                    <p className="text-gray-600">Based on {product.reviewCount} reviews</p>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold">{review.author}</h4>
                          <span className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <button className="text-[#2A5D3C] hover:underline font-medium">Load More Reviews</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                >
                  <Link href={`/shop/${relatedProduct.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                      {relatedProduct.isNew && (
                        <span className="absolute top-2 right-2 bg-[#4CAF50] text-white text-xs font-bold px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                      {relatedProduct.isOnSale && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < relatedProduct.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({relatedProduct.reviewCount})</span>
                    </div>
                    <Link href={`/shop/${relatedProduct.id}`}>
                      <h3 className="font-semibold hover:text-[#2A5D3C] transition duration-300">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">{relatedProduct.shortDescription}</p>
                    <div className="mt-2">
                      {relatedProduct.isOnSale && relatedProduct.salePrice ? (
                        <div className="flex items-center">
                          <span className="font-bold text-red-600">${relatedProduct.salePrice.toFixed(2)}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${relatedProduct.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold">${relatedProduct.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
