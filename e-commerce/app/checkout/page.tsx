"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart.context"
import { useAuth } from "@/context/auth.context"
import { useOrder } from "@/context/order.context"
import { ArrowLeft, CreditCard, ShieldCheck, Truck } from "lucide-react"
import { supabase } from '../backend/client';


export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { session } = useAuth() as { session: { user: { id: string; firstName?: string; lastName?: string; email?: string; phone?: number; address?: { street?: string; city?: string; state?: string; zipCode?: number; country?: string } } } | null | undefined }
  const { createOrder } = useOrder()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: ""
    })
  const router = useRouter()

  useEffect(() => {
      if (!isLoading && !session) {
        router.push("/login")
      } else {
        handleUserProfile()
      }
  }, [isLoading, session, router])


  const handleUserProfile = async () => {
    if (session) {
          const { data, error } = await supabase.auth.getUser()
          if (error) {
            console.error("Error fetching user profile:", error.message)
            return
          } else {
            setFormData({
              firstName: data.user?.user_metadata.first_name || "",
              lastName: data.user?.user_metadata.last_name || "",
              email: data.user?.email || "",
              phone: data.user?.user_metadata.phone || "",
              street: data.user?.user_metadata.address?.street || "",
              city: data.user?.user_metadata.address?.city || "",
              state: data.user?.user_metadata.address?.state || "",
              zipCode: data.user?.user_metadata.address?.zipCode || "",
              country: data.user?.user_metadata.address?.country || "",
              cardName: data.user?.user_metadata.cardName || "",
              cardNumber: data.user?.user_metadata.cardNumber || "",
              cardExpiry: data.user?.user_metadata.cardExpiry || "",
              cardCvc: data.user?.user_metadata.cardCvc || ""
            })
          }
    }
  }


  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate shipping (free over $100)
  const shippingCost = subtotal >= 100 ? 0 : 9.99

  // Calculate total
  const total = subtotal + shippingCost

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields
    const requiredFields = [
      "name",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "zipCode",
      "country",
      "cardName",
      "cardNumber",
      "cardExpiry",
      "cardCvc",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "This field is required"
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (formData.phone && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Card number validation
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\D/g, ""))) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number"
    }

    // Card expiry validation
    if (formData.cardExpiry && !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Please use MM/YY format"
    }

    // CVC validation
    if (formData.cardCvc && !/^\d{3,4}$/.test(formData.cardCvc)) {
      newErrors.cardCvc = "Please enter a valid CVC"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Create a new order
    try {
      const newOrder = createOrder(
        session?.user.id || "",
        total,
        {
          name: formData.firstName + " " + formData.lastName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        {
          type: "credit_card",
          last4: formData.cardNumber.slice(-4),
        }
      )
      if (!newOrder) {
        throw new Error("Failed to create order")
      }
      // Redirect to order confirmation page
      const orderResult = await newOrder;
      if (orderResult.success) {
        router.push(`/order-confirmation/${orderResult.id}`);
      } else {
        console.error("Order creation failed:", orderResult.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating order:", error)
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart before proceeding to checkout.</p>
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                {/* Shipping Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.firstName + " " + formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                        placeholder="(123) 456-7890"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.street ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State / Province *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP / Postal Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.zipCode ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.country ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Payment Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.cardName ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-2 border ${
                          errors.cardNumber ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiration Date *
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-2 border ${
                          errors.cardExpiry ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                        CVC *
                      </label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="123"
                        className={`w-full px-4 py-2 border ${
                          errors.cardCvc ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition`}
                      />
                      {errors.cardCvc && <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>

                  <div className="flex items-center mt-4 bg-gray-50 p-4 rounded-md">
                    <ShieldCheck className="h-5 w-5 text-[#2A5D3C] mr-2" />
                    <span className="text-sm text-gray-600">Your payment information is secure and encrypted.</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    href="/cart"
                    className="text-[#2A5D3C] hover:text-[#1e4a2e] font-medium inline-flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Cart
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-3 px-8 rounded-md transition duration-300 flex items-center ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Complete Order
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="max-h-80 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start py-3 border-b">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                        <p className="font-medium text-sm mt-1">
                          $
                          {((item.isOnSale && item.salePrice ? item.salePrice : item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="flex items-center mb-2">
                    <Truck className="h-5 w-5 text-[#2A5D3C] mr-2" />
                    <span className="font-medium text-sm">Shipping</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-7">
                    {subtotal < 100 ? (
                      <>
                        Add <span className="font-medium">${(100 - subtotal).toFixed(2)}</span> more to qualify for free
                        shipping!
                      </>
                    ) : (
                      <span className="text-green-600 font-medium">✓ Your order qualifies for free shipping!</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 ml-7 mt-1">Estimated delivery: 3-5 business days</p>
                </div>

                <div className="text-sm text-gray-600">
                  By completing your purchase, you agree to our{" "}
                  <Link href="/terms" className="text-[#2A5D3C] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#2A5D3C] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
