"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useWishlist } from "@/context/wishlist.context"
import { useCart } from "@/context/cart.context"
import { Heart, ShoppingBag, Trash2, ArrowLeft, Star } from "lucide-react"

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({})

  const handleAddToCart = (productId: string) => {
    const product = items.find((item) => item.id === productId)
    if (product) {
      addToCart(product)

      // Show "Added" feedback
      setAddedToCart((prev) => ({ ...prev, [productId]: true }))

      // Reset after 2 seconds
      setTimeout(() => {
        setAddedToCart((prev) => ({ ...prev, [productId]: false }))
      }, 2000)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-gray-600 mb-8">Save items you love to your wishlist for future reference.</p>
            <Link
              href="/shop"
              className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-3 px-6 rounded-md transition duration-300 inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Saved Items ({items.length})</h2>
              <button onClick={clearWishlist} className="text-red-600 hover:text-red-800 text-sm font-medium">
                Clear Wishlist
              </button>
            </div>
          </div>

          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                {/* Product Image */}
                <div className="sm:w-32 sm:h-32 flex-shrink-0">
                  <Link href={`/shop/${item.id}`}>
                    <div className="relative w-full h-32 rounded-md overflow-hidden">
                      <Image src={item.image_url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      {item.isOnsale && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </span>
                      )}
                    </div>
                  </Link>
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <Link href={`/shop/${item.id}`}>
                    <h3 className="font-semibold text-lg hover:text-[#2A5D3C] transition duration-300">{item.name}</h3>
                  </Link>
                  <div className="flex mb-2 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < item.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({item.review_count})</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{item.short_description}</p>

                  <div className="flex flex-wrap justify-between items-end">
                    <div>
                      {item.isOnsale && item.sale_price ? (
                        <div className="flex items-center">
                          <span className="font-bold text-red-600">${item.sale_price.toFixed(2)}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">${item.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        className={`${
                          addedToCart[item.id] ? "bg-[#4CAF50] hover:bg-[#3d9140]" : "bg-[#2A5D3C] hover:bg-[#1e4a2e]"
                        } text-white text-sm font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center`}
                      >
                        {addedToCart[item.id] ? (
                          "Added to Cart!"
                        ) : (
                          <>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-gray-500 hover:text-red-600 p-2"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50">
            <Link href="/shop" className="text-[#2A5D3C] hover:text-[#1e4a2e] font-medium inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
