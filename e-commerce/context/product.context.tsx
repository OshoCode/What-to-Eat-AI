"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from '@/app/backend/client';

const ProductContext = createContext<any>(null)

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [products, setProducts] = useState<any[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
          const { data, error } = await supabase
            .from('products')
            .select()
    
            if (error) {
              setFetchError(error.message)
              setProducts([])
              console.error("Error fetching products:", error.message)
            }
            if (data) {
              setProducts(data)
              console.log("Fetched products:", data)
            }
        }
        fetchProducts()
    }, [])  

    return (
        <ProductContext.Provider value={{ fetchError, products }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
