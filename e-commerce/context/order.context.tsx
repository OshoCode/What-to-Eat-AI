"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "./cart.context"
import type { CartItem } from "./cart.context"
import { supabase } from '@/app/backend/client';

export interface OrderItem extends CartItem {}

export interface Order {
  id: string
  user_id: string
  items: OrderItem[]
  total_price: number
  status: "processing" | "shipped" | "delivered" | "cancelled"
  created_at: string
  shipping_address: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  payments: {
    type: "credit_card" | "paypal"
    last4?: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
}

interface OrderContextType {
  createOrder: (userId: string, totalPrice: number, shippingAddress: object, payments: object) => Promise<{ success: boolean; error?: string, id?: string }>
  createOrederItem: (orderId: string, items: OrderItem[]) => Promise<{ success: boolean; error?: string }>
  getOrderById: (userId: string) => Promise<Order | undefined>
  cancelOrder: (userId: string) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { clearCart } = useCart()
  const router = useRouter()

  

  const createOrder = async (userId: string, totalPrice: number, shippingAddress: object, payments: object) => {
    try {
      const { error } = await supabase
      .from('orders')
      .insert({
        id: userId + Date.now().toString().slice(-6),
        user_id: userId,
        created_at: new Date().toISOString(),
        status: "processing",
        total_price: totalPrice,
        shipping_address: shippingAddress,
        payments: payments,
      })
      .select()
      clearCart()
      if (error) {
        console.error("Error creating order:", error.message)
        return {success : false, error: error.message}
      } else {
        console.log("Creating order successful:")
        return {success : true}
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err)
      return {success : false, error: err instanceof Error ? err.message : "An unknown error occurred"}
    }
  }

  const createOrederItem = async (orderId: string, items: OrderItem[]) => {
    try {
      const { error } = await supabase
      .from('order_items')
      .insert(
        items.map(item => ({
          order_id: orderId,
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
        }))
      )
      .select()
      if (error) {
        console.error("Error creating order item:", error.message)
        return {success : false, error: error.message}
      } else {
        console.log("Creating order item successful:")
        return {success : true}
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err)
      return {success : false, error: err instanceof Error ? err.message : "An unknown error occurred"}
    }
  }

  const getOrderById = async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', userId + Date.now().toString().slice(-6))
      .single()
    if (error) {
      console.error("Error fetching order:", error.message)
      return undefined
    } else {
      return data as Order
    }
  }

  const cancelOrder = async (userId: string) => {
    try {
      const { error } = await supabase
      .from('orders')
      .update({ status: "cancelled" })
      .eq('id', userId + Date.now().toString().slice(-6))
      .select()
      if (error) {
        console.error("Error cancelling order:", error.message)
        return {success : false, error: error.message}
      } else {
        console.log("Cancelling order successful:")
        return {success : true}
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err)
      return {success : false, error: err instanceof Error ? err.message : "An unknown error occurred"}
    }
  }

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        createOrederItem,
        getOrderById,
        cancelOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
