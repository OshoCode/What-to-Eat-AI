"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth.context"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart.context"
import { useProduct } from "@/context/product.context"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, itemCount } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const { session } = useAuth()
  const { products } = useProduct()

  // Calculate shipping (free over $100)
  const shippingCost = 0


  // Calculate total
  const total = subtotal + shippingCost

  // Handle coupon submission
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate the coupon code here
    alert(`Coupon code "${couponCode}" applied!`)
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Please Sign Up Before Ordering</h1>
            <p className="text-gray-600 mb-4">Looks like you haven't sign up yet, please create an account before making any order.</p>
            <Link
              href="/signup"
              className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-3 px-6 rounded-md transition duration-300 inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Sign Up
            </Link>
            <div className="mt-4 pt-2 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#2A5D3C] font-medium hover:underline">
                Log In
              </Link>
            </p>
          </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
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
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Cart Items ({itemCount})</h2>
                  <button onClick={clearCart} className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="sm:w-24 sm:h-24 flex-shrink-0">
                      <div className="relative w-full h-24 rounded-md overflow-hidden">
                        <Image src={item.image_url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">{item.short_description}</p>

                      <div className="flex flex-wrap justify-between items-end mt-2">
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

                        <div className="flex items-center mt-2 sm:mt-0">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-md mr-4">
                            <button
                              onClick={() => updateQuantity(item, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-2 py-1 min-w-[40px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item)}
                            className="text-gray-500 hover:text-red-600"
                            aria-label="Remove item"
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

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span>
                </div>


                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <form onSubmit={handleApplyCoupon} className="mb-6">
                <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md outline-none"
                    placeholder="Enter code"
                  />
                  <button
                    type="submit"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-small py-2 px-2 rounded-r-md transition"
                  >
                    Apply
                  </button>
                </div>
              </form>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </Link>

              {/* Shipping Notice */}
              <div className="mt-6 text-sm text-gray-600">
                <p className="mb-2">
                  {subtotal < 100 ? (
                    <>
                      Add <span className="font-medium">${(100 - subtotal).toFixed(2)}</span> more to qualify for free
                      shipping!
                    </>
                  ) : (
                    <span className="text-green-600 font-medium">✓ Your order qualifies for free shipping!</span>
                  )}
                </p>
                <p>Estimated delivery: 3-5 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
