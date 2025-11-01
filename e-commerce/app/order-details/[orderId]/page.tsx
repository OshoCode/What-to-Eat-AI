"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useOrder } from "@/context/order.context"
import { ArrowLeft, Printer, Package, Calendar, Truck, AlertCircle } from "lucide-react"

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { getOrderById, cancelOrder } = useOrder()
  const [order, setOrder] = useState<ReturnType<typeof getOrderById>>(undefined)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    if (params.orderId) {
      const foundOrder = getOrderById(params.orderId as string)
      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        // Order not found, redirect to account
        router.push("/account?tab=orders")
      }
    }
  }, [params.orderId, getOrderById, router])

  const handleCancelOrder = () => {
    if (!order || order.status !== "processing") return

    if (window.confirm("Are you sure you want to cancel this order?")) {
      setIsCancelling(true)

      // Simulate API call delay
      setTimeout(() => {
        cancelOrder(order.id)
        setOrder({ ...order, status: "cancelled" })
        setIsCancelling(false)
      }, 1000)
    }
  }

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
          <div className="mb-6">
            <Link
              href="/account?tab=orders"
              className="inline-flex items-center text-[#2A5D3C] hover:text-[#1e4a2e] font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Order History
            </Link>
          </div>

          {/* Order Status Banner */}
          {order.status === "cancelled" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Order Cancelled</h3>
                <p className="text-red-700 text-sm">This order has been cancelled and will not be processed.</p>
              </div>
            </div>
          )}

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => window.print()}
                    className="text-[#2A5D3C] hover:text-[#1e4a2e] font-medium flex items-center"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </button>
                  {order.status === "processing" && (
                    <button
                      onClick={handleCancelOrder}
                      disabled={isCancelling}
                      className={`text-red-600 hover:text-red-800 font-medium ${
                        isCancelling ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isCancelling ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-b">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Order Date</h3>
                  <p>{orderDate}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Order Status</h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                {order.trackingNumber && (
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-2">Tracking Number</h3>
                    <p>{order.trackingNumber}</p>
                  </div>
                )}
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
                      <Link href={`/shop/${item.id}`} className="font-medium hover:text-[#2A5D3C]">
                        {item.name}
                      </Link>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${((item.isOnSale && item.salePrice ? item.salePrice : item.price) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${(item.isOnSale && item.salePrice ? item.salePrice : item.price).toFixed(2)} each
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
          {order.status !== "cancelled" && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Timeline</h2>
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
                    <div
                      className={`absolute left-0 rounded-full ${
                        order.status === "shipped" || order.status === "delivered"
                          ? "bg-[#2A5D3C] text-white"
                          : "bg-gray-200 text-gray-500"
                      } flex items-center justify-center w-16 h-16`}
                    >
                      <Calendar className="h-8 w-8" />
                    </div>
                    <div className="ml-24">
                      <h3 className="font-semibold">Shipped</h3>
                      <p className="text-gray-600">
                        {order.status === "shipped" || order.status === "delivered"
                          ? "Your order has been shipped"
                          : "Pending"}
                      </p>
                      {order.trackingNumber && (
                        <p className="text-sm text-[#2A5D3C] mt-1">Tracking #: {order.trackingNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div
                      className={`absolute left-0 rounded-full ${
                        order.status === "delivered" ? "bg-[#2A5D3C] text-white" : "bg-gray-200 text-gray-500"
                      } flex items-center justify-center w-16 h-16`}
                    >
                      <Truck className="h-8 w-8" />
                    </div>
                    <div className="ml-24">
                      <h3 className="font-semibold">Delivered</h3>
                      <p className="text-gray-600">
                        {order.status === "delivered"
                          ? "Your order has been delivered"
                          : order.estimatedDelivery
                            ? `Estimated: ${order.estimatedDelivery}`
                            : "Pending"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Need Help? */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns about your order, please contact our customer service team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-2 px-4 rounded-md transition duration-300 text-center"
              >
                Contact Support
              </Link>
              <Link
                href="/shop"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300 text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
