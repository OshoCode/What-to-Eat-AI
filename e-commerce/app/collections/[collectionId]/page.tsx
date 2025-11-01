"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Filter, ChevronDown, X, Star, ShoppingCart } from "lucide-react"
import { products } from "@/lib/products"
import type { Product } from "@/lib/types"
import { useCart } from "@/context/cart.context"

// Define collection data
const collectionsData = {
  hiking: {
    title: "Hiking Essentials",
    description: "Everything you need for day hikes to multi-day treks.",
    image: "/placeholder.svg?height=1080&width=1920",
    categories: ["backpacks", "footwear", "clothing"],
    featuredProducts: ["1", "7", "10"], // IDs of featured products
  },
  camping: {
    title: "Camping Gear",
    description: "Quality equipment for comfortable nights under the stars.",
    image: "/placeholder.svg?height=1080&width=1920",
    categories: ["tents", "accessories"],
    featuredProducts: ["4", "5", "6"],
  },
  winter: {
    title: "Winter Adventure",
    description: "Specialized gear for cold weather exploration.",
    image: "/placeholder.svg?height=1080&width=1920",
    categories: ["clothing", "footwear", "accessories"],
    featuredProducts: ["7", "10", "11"],
  },
  water: {
    title: "Water Activities",
    description: "Gear for lakes, rivers, and coastal adventures.",
    image: "/placeholder.svg?height=1080&width=1920",
    categories: ["clothing", "accessories"],
    featuredProducts: ["9", "15", "16"],
  },
}

export default function CollectionPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const collectionId = params.collectionId as string

  const [collection, setCollection] = useState<any>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState("featured")
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({})

  // Check if collection exists
  useEffect(() => {
    const collectionData = collectionsData[collectionId as keyof typeof collectionsData]
    if (!collectionData) {
      router.push("/collections")
      return
    }
    setCollection(collectionData)
  }, [collectionId, router])

  // Filter products based on collection
  useEffect(() => {
    if (!collection) return

    let result = [...products]

    // Filter by collection categories
    result = result.filter((product) => collection.categories.includes(product.category))

    // Apply category filter if selected
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        break
      default: // featured
        // Sort by featured products first
        result.sort((a, b) => {
          const aFeatured = collection.featuredProducts.includes(a.id)
          const bFeatured = collection.featuredProducts.includes(b.id)
          if (aFeatured && !bFeatured) return -1
          if (!aFeatured && bFeatured) return 1
          return 0
        })
    }

    setFilteredProducts(result)
  }, [collection, selectedCategory, sortOption])

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setIsFilterOpen(false)
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)

    // Show "Added" feedback
    setAddedToCart((prev) => ({ ...prev, [product.id]: true }))

    // Reset after 2 seconds
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2A5D3C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collection...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-[#2A5D3C] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={collection.image || "/placeholder.svg"}
            alt={collection.title}
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2A5D3C]/90 via-[#3d7a50]/80 to-[#2A5D3C]/90"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Link href="/collections" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Collections
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{collection.title}</h1>
            <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">{collection.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <button
            onClick={toggleFilter}
            className="w-full flex items-center justify-between bg-white p-4 rounded-md shadow-sm border border-gray-200"
          >
            <span className="font-medium">Filter Products</span>
            {isFilterOpen ? <ChevronDown className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`md:w-1/4 lg:w-1/5 ${isFilterOpen ? "block" : "hidden md:block"}`}>
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Categories</h2>
                <button className="md:hidden" onClick={toggleFilter}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`w-full text-left py-2 px-3 rounded-md transition ${
                    selectedCategory === null ? "bg-[#2A5D3C] text-white" : "hover:bg-gray-100"
                  }`}
                >
                  All Categories
                </button>
                {collection.categories.map((category: string) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left py-2 px-3 rounded-md transition ${
                      selectedCategory === category ? "bg-[#2A5D3C] text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Sort By</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSortOption("featured")}
                    className={`w-full text-left py-2 px-3 rounded-md transition ${
                      sortOption === "featured" ? "bg-[#2A5D3C] text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    Featured
                  </button>
                  <button
                    onClick={() => setSortOption("price-low-high")}
                    className={`w-full text-left py-2 px-3 rounded-md transition ${
                      sortOption === "price-low-high" ? "bg-[#2A5D3C] text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => setSortOption("price-high-low")}
                    className={`w-full text-left py-2 px-3 rounded-md transition ${
                      sortOption === "price-high-low" ? "bg-[#2A5D3C] text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => setSortOption("rating")}
                    className={`w-full text-left py-2 px-3 rounded-md transition ${
                      sortOption === "rating" ? "bg-[#2A5D3C] text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    Customer Rating
                  </button>
                  <button
                    onClick={() => setSortOption("newest")}
                    className={`w-full text-left py-2 px-3 rounded-md transition ${
                      sortOption === "newest" ? "bg-[#2A5D3C] text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    Newest
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="md:w-3/4 lg:w-4/5">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try selecting a different category or clearing your filters.</p>
                <button
                  onClick={() => handleCategoryChange(null)}
                  className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    {selectedCategory
                      ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
                      : "All Products"}
                    <span className="ml-2 text-gray-500 text-sm font-normal">({filteredProducts.length} products)</span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col h-full"
                    >
                      <Link href={`/shop/${product.id}`} className="block">
                        <div className="relative h-48 sm:h-56">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          {product.isNew && (
                            <span className="absolute top-2 right-2 bg-[#4CAF50] text-white text-xs font-bold px-2 py-1 rounded">
                              NEW
                            </span>
                          )}
                          {product.isOnSale && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              SALE
                            </span>
                          )}
                          {collection.featuredProducts.includes(product.id) && (
                            <span className="absolute bottom-2 right-2 bg-[#2A5D3C] text-white text-xs font-bold px-2 py-1 rounded">
                              FEATURED
                            </span>
                          )}
                        </div>
                      </Link>
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < product.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                        </div>

                        <Link href={`/shop/${product.id}`}>
                          <h3 className="font-semibold truncate mb-2 hover:text-[#2A5D3C] transition duration-300">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm h-10 overflow-hidden mb-auto">{product.shortDescription}</p>

                        <div className="mt-auto pt-4">
                          <div className="mb-2">
                            {product.isOnSale && product.salePrice ? (
                              <div>
                                <span className="font-bold text-lg text-red-600">${product.salePrice.toFixed(2)}</span>
                                <span className="text-sm text-gray-500 line-through ml-1">
                                  ${product.price.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                            )}
                          </div>

                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`w-full ${
                              addedToCart[product.id]
                                ? "bg-[#4CAF50] hover:bg-[#3d9140]"
                                : "bg-[#2A5D3C] hover:bg-[#1e4a2e]"
                            } text-white text-sm font-semibold py-2 px-3 rounded-md transition duration-300 flex items-center justify-center`}
                          >
                            {addedToCart[product.id] ? (
                              "Added to Cart!"
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
