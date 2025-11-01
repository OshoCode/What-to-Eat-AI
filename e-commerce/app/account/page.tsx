"use client"

import type React from "react"

import { useState, useEffect} from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth.context"
import { useOrder } from "@/context/order.context"
import { useWishlist } from "@/context/wishlist.context"
import { useCart } from "@/context/cart.context"
import { supabase } from '../backend/client';
import {
  User,
  Package,
  Heart,
  CreditCard,
  MapPin,
  LogOut,
  Settings,
  ShoppingBag,
  AlertCircle,
  CheckCircle,
  Trash2,
  Star,
} from "lucide-react"

export default function AccountPage() {
  const { session, logOut } = useAuth() as { session: { user: { id: string; firstName?: string; lastName?: string; email?: string; phone?: number; address?: { street?: string; city?: string; state?: string; zipCode?: number; country?: string } } } | null; logOut: () => void }
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })
  const [orders, setOrders] = useState<any[]>([])
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const { getOrderById } = useOrder()
  const { items: wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({})

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/login")
    } else {
      handleUserProfile()
    }
  }, [isLoading, session, router])
    
  useEffect(() => {
    try{
      const fetchOrders = async () => {
        if (session) {
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", session?.user?.id || "")
            .order("created_at", { ascending: false })
          if (error) {
            console.error("Error fetching orders:", error.message)
          } else {
            setOrders(data || [])
          }
        }
      }

      fetchOrders()
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }, [session, getOrderById])
  

  // Check if tab is in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get("tab")
    if (tab && ["profile", "orders", "wishlist", "payment", "addresses", "settings"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUserProfile = async () => {
    if (session) {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error("Error fetching user profile:", error.message)
        return
      } else {
        setProfileData({
          firstName: data.user?.user_metadata.first_name || "",
          lastName: data.user?.user_metadata.last_name || "",
          email: data.user?.email || "",
          phone: data.user?.user_metadata.phone || "",
          street: data.user?.user_metadata.address?.street || "",
          city: data.user?.user_metadata.address?.city || "",
          state: data.user?.user_metadata.address?.state || "",
          zipCode: data.user?.user_metadata.address?.zipCode || "",
          country: data.user?.user_metadata.address?.country || "",
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
          address: {
            street: profileData.street,
            city: profileData.city,
            state: profileData.state,
            zipCode: profileData.zipCode,
            country: profileData.country,
          },
        },
      });
  
      if (error) {
        console.error("Error updating:", error.message);
        setNotification({ type: "error", message: error.message });
        return;
      }
  
      console.log("Update successful:", data);
      setNotification({ type: "success", message: "Profile updated successfully!" });

      setTimeout(() => {
        setNotification(null);
      }, 4000);
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      setNotification({
        type: "error",
        message: err instanceof Error ? err.message : "An unknown error occurred",
      });
    } finally {
      setIsEditing(false);
    }
  };

  const handleAddToCart = (productId: string) => {
    const product = wishlistItems.find((item) => item.id === productId)
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

  // Show loading state or redirect if not logged in
  if (isLoading || !session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2A5D3C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#2A5D3C] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {profileData.firstName?.charAt(0) || ""}
                  {profileData.lastName?.charAt(0) || ""}
                </div>
                <div className="ml-4">
                  <h2 className="font-bold text-lg">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-gray-600 text-sm">{session?.user?.email || ""}</p>
                </div>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition ${
                    activeTab === "profile" ? "bg-[#2A5D3C] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition ${
                    activeTab === "orders" ? "bg-[#2A5D3C] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Package className="h-5 w-5 mr-3" />
                  <span>Order History</span>
                </button>

                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition ${
                    activeTab === "wishlist" ? "bg-[#2A5D3C] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Heart className="h-5 w-5 mr-3" />
                  <span>Wishlist</span>
                </button>

                <button
                  onClick={() => setActiveTab("payment")}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition ${
                    activeTab === "payment" ? "bg-[#2A5D3C] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  <span>Payment Methods</span>
                </button>

                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition ${
                    activeTab === "addresses" ? "bg-[#2A5D3C] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>Addresses</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition ${
                    activeTab === "settings" ? "bg-[#2A5D3C] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  <span>Account Settings</span>
                </button>

                <button
                  onClick={logOut}
                  className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-md transition"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {notification && (
              <div
                className={`mb-6 p-4 rounded-md flex items-center ${
                  notification.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {notification.type === "success" ? (
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                )}
                <span>{notification.message}</span>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My Profile</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium py-2 px-4 rounded-md transition duration-300"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        disabled
                        className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email address cannot be changed</p>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Address Information</h3>

                    <div className="mb-6">
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={profileData.street}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={profileData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State / Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={profileData.state}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={profileData.zipCode}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={profileData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium py-2 px-6 rounded-md transition duration-300"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                        <p className="mt-1">{profileData.firstName}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                        <p className="mt-1">{profileData.lastName}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                        <p className="mt-1">{session?.user.email}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                        <p className="mt-1">{profileData.phone || "Not provided"}</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Address Information</h3>

                    {profileData.street? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Street Address</h3>
                          <p className="mt-1">{profileData.street}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">City</h3>
                          <p className="mt-1">{profileData.city || "Not provided"}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">State / Province</h3>
                          <p className="mt-1">{profileData.state || "Not provided"}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">ZIP / Postal Code</h3>
                          <p className="mt-1">{profileData.zipCode || "Not provided"}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Country</h3>
                          <p className="mt-1">{profileData.country || "Not provided"}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No address information provided</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Order History</h2>

                {orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Items
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A5D3C]">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {new Date(order.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.items.length}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              ${order.total_price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <Link href={`/order-confirmation/${order.id}`} className="text-[#2A5D3C] hover:underline">
                                View Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">When you place an order, it will appear here.</p>
                    <Link
                      href="/shop"
                      className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium py-2 px-6 rounded-md transition duration-300"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

                {wishlistItems.length > 0 ? (
                  <div className="space-y-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-24 sm:h-24 flex-shrink-0">
                          <Link href={`/shop/${item.id}`}>
                            <div className="relative w-full h-24 rounded-md overflow-hidden">
                              <Image
                                src={item.image_url || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </Link>
                        </div>

                        <div className="flex-grow">
                          <Link href={`/shop/${item.id}`}>
                            <h3 className="font-semibold hover:text-[#2A5D3C] transition duration-300">{item.name}</h3>
                          </Link>
                          <div className="flex mb-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < item.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({item.review_count})</span>
                          </div>
                          <p className="text-gray-600 text-sm">{item.short_description}</p>

                          <div className="flex justify-between items-center mt-2">
                            <div>
                              {item.isOnsale && item.sale_price ? (
                                <div className="flex items-center">
                                  <span className="font-bold text-red-600">${item.sale_price.toFixed(2)}</span>
                                  <span className="text-sm text-gray-500 line-through ml-2">
                                    ${item.price.toFixed(2)}
                                  </span>
                                </div>
                              ) : (
                                <span className="font-bold">${item.price.toFixed(2)}</span>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAddToCart(item.id)}
                                className={`${
                                  addedToCart[item.id]
                                    ? "bg-[#4CAF50] hover:bg-[#3d9140]"
                                    : "bg-[#2A5D3C] hover:bg-[#1e4a2e]"
                                } text-white text-sm font-semibold py-2 px-3 rounded-md transition duration-300 flex items-center`}
                              >
                                {addedToCart[item.id] ? (
                                  "Added!"
                                ) : (
                                  <>
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Add to Cart
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => removeFromWishlist(item)}
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

                    <div className="mt-4 text-center">
                      <Link
                        href="/wishlist"
                        className="text-[#2A5D3C] hover:text-[#1e4a2e] font-medium inline-flex items-center"
                      >
                        View All Wishlist Items
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Save items you love to your wishlist.</p>
                    <Link
                      href="/shop"
                      className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium py-2 px-6 rounded-md transition duration-300"
                    >
                      Explore Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payment" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods saved</h3>
                  <p className="text-gray-500 mb-6">Add a payment method for faster checkout.</p>
                  <button className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium py-2 px-6 rounded-md transition duration-300">
                    Add Payment Method
                  </button>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>
                {profileData.street ? (
                  <div className="border rounded-md p-4 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Default Address</h3>
                        <p className="text-gray-700 mt-2">
                          {profileData.firstName} {profileData.lastName}
                          <br />
                          {profileData.street}
                          <br />
                          {profileData.city}, {profileData.state} {profileData.zipCode}
                          <br />
                          {profileData.country}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setActiveTab("profile");
                          }}
                          className="text-[#2A5D3C] hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <MapPin className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                    <p className="text-gray-500 mb-6">Add an address for faster checkout.</p>
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setActiveTab("profile");
                      }}
                      className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium py-2 px-6 rounded-md transition duration-300"
                    >
                      Add Address
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-4">Email Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="marketing-emails"
                          className="h-4 w-4 mt-1 text-[#2A5D3C] focus:ring-[#4CAF50] border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="marketing-emails" className="ml-2 block text-sm text-gray-700">
                          <span className="font-medium">Marketing emails</span>
                          <p className="text-gray-500">Receive emails about new products, sales, and promotions</p>
                        </label>
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="order-updates"
                          className="h-4 w-4 mt-1 text-[#2A5D3C] focus:ring-[#4CAF50] border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="order-updates" className="ml-2 block text-sm text-gray-700">
                          <span className="font-medium">Order updates</span>
                          <p className="text-gray-500">Receive emails about your orders and shipping updates</p>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold mb-4">Password</h3>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition">
                      Change Password
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
                    <button className="text-red-600 hover:text-red-800 font-medium">Delete Account</button>
                    <p className="text-sm text-gray-500 mt-1">
                      This action is permanent and cannot be undone. All your data will be deleted.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
