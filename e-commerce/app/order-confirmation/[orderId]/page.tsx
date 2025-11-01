"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useOrder } from "@/context/order.context"
import { CheckCircle, Package, ArrowRight, Printer, Calendar, Truck } from "lucide-react"

export default function OrderConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const { getOrderById } = useOrder()
  const [order, setOrder] = useState<ReturnType<typeof getOrderById>>(undefined)

  useEffect(() => {
    if (params.orderId) {
      const foundOrder = getOrderById(params.orderId as string)
      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        // Order not found, redirect to home
        router.push("/")
      }
    }
  }, [params.orderId, getOrderById, router])

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2A5D3C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  // Format date
  const orderDate = new Date(order.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Thank You for Your Order!</h1>
            <p className="text-gray-600 mb-4">
              Your order has been received and is being processed. We've sent a confirmation email to your inbox.
            </p>
            <div className="inline-block bg-gray-100 rounded-lg px-4 py-2 font-medium">Order #{order.id}</div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Order Details</h2>
                <button
                  onClick={() => window.print()}
                  className="text-[#2A5D3C] hover:text-[#1e4a2e] font-medium flex items-center"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Receipt
                </button>
              </div>
            </div>

            <div className="p-6 border-b">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Order Number</h3>
                  <p>{order.id}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Date Placed</h3>
                  <p>{orderDate}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Order Status</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 border-b">
              <h3 className="font-semibold mb-4">Items in Your Order</h3>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.id} className="py-4 flex items-start">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${((item.isOnSale && item.salePrice ? item.salePrice : item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-6 border-b bg-gray-50">
              <div className="flex justify-end">
                <div className="w-full md:w-64">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Shipping Information</h3>
                  <p className="text-gray-800">
                    {order.shippingAddress.name}
                    <br />
                    {order.shippingAddress.street}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    <br />
                    {order.shippingAddress.country}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Payment Information</h3>
                  <p className="text-gray-800">
                    {order.paymentMethod.type === "credit_card" ? "Credit Card" : "PayPal"}
                    <br />
                    {order.paymentMethod.type === "credit_card" && (
                      <>
                        Ending in {order.paymentMethod.last4}
                        <br />
                      </>
                    )}
                    Amount: ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-8">
                <div className="relative flex items-start">
                  <div className="absolute left-0 rounded-full bg-[#2A5D3C] text-white flex items-center justify-center w-16 h-16">
                    <Package className="h-8 w-8" />
                  </div>
                  <div className="ml-24">
                    <h3 className="font-semibold">Order Placed</h3>
                    <p className="text-gray-600">{orderDate}</p>
                    <p className="text-sm text-gray-500 mt-1">Your order has been received and is being processed.</p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="absolute left-0 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center w-16 h-16">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <div className="ml-24">
                    <h3 className="font-semibold">Preparing for Shipment</h3>
                    <p className="text-gray-600">Estimated: {orderDate}</p>
                    <p className="text-sm text-gray-500 mt-1">Your order is being prepared and will be shipped soon.</p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="absolute left-0 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center w-16 h-16">
                    <Truck className="h-8 w-8" />
                  </div>
                  <div className="ml-24">
                    <h3 className="font-semibold">Estimated Delivery</h3>
                    <p className="text-gray-600">{order.estimatedDelivery}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Your order is expected to arrive within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <Link
              href="/account?tab=orders"
              className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
            >
              View Order History
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/shop"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
