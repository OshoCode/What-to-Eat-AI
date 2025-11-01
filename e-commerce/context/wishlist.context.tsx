"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/lib/types"
import { useAuth } from "@/context/auth.context"
import { useProduct } from "@/context/product.context"

interface WishlistContextType {
  items: Product[]
  addToWishlist: (productOrId: Product | any) => void
  removeFromWishlist: (productOrId: Product | any) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([])
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse saved wishlist:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
    console.log("Wishlist Items:", items);
  }, [items])

  const addToWishlist = (product: Product) => {
    console.log("Adding product to wishlist:", product);
    
    setItems((prevItems) => {
      // Check if item already exists in wishlist
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Item exists, do nothing
        return prevItems
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, product]
      }
    })
  }

  const removeFromWishlist = (productOrId: Product | any) => {
    const productId = typeof productOrId === "string" ? productOrId : productOrId.id;
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    console.log("Removing product from wishlist:", productId);
  }

  const isInWishlist = (productOrId: Product | any) => {
    const productId = typeof productOrId === "string" ? productOrId : productOrId.id;

    return items.some((item) => item.id === productId)
  }

  const clearWishlist = () => {
    setItems([])
  }

  // Calculate total number of items in wishlist
  const itemCount = items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
