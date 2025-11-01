"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Star, Filter, X, ChevronDown, ShoppingBag, Search, Heart, AlertCircle } from "lucide-react"

import type { Product } from "@/lib/types"
import { useCart } from "@/context/cart.context"
import { useWishlist } from "@/context/wishlist.context"
import { useAuth } from "@/context/auth.context"
import { useProduct } from "@/context/product.context"
import Link from "next/link"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { session } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const initialCategory = searchParams.get("category") || "all"
  const initialSearchTerm = searchParams.get("search") || ""
  const { fetchError, products } = useProduct()

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [filteredProducts, setFilteredProducts] = useState([...products])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRanges, setPriceRanges] = useState({
    under50: false,
    from50to100: false,
    from100to200: false,
    over200: false,
  })
  const [ratingFilter, setRatingFilter] = useState({
    fiveStars: false,
    fourStars: false,
    threeStars: false,
  })
  const [sortOption, setSortOption] = useState("featured")
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({})
  const [error, setError] = useState("") // Define error state

  const categories = [
    { id: "all", name: "All Products" },
    { id: "backpacks", name: "Backpacks" },
    { id: "tents", name: "Tents" },
    { id: "footwear", name: "Footwear" },
    { id: "clothing", name: "Clothing" },
    { id: "accessories", name: "Accessories" },
  ]
  

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    // Update the selected category state
    setSelectedCategory(categoryId)

    // Update URL
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }

    if (searchTerm) {
      params.set("search", searchTerm)
    }

    router.push(`/shop?${params.toString()}`)

    // Close mobile filter menu if open
    setIsFilterOpen(false)
  }

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())
    if (searchTerm) {
      params.set("search", searchTerm)
    } else {
      params.delete("search")
    }

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory)
    }

    router.push(`/shop?${params.toString()}`)
  }

  // Listen for URL changes
  useEffect(() => {
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    if (category) {
      setSelectedCategory(category)
    } else {
      setSelectedCategory("all")
    }

    if (search) {
      setSearchTerm(search)
    } else {
      setSearchTerm("")
    }
  }, [searchParams])

  // Apply filters and sorting
  useEffect(() => {
    if (!products || products.length === 0) return;

    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.short_description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Apply price range filters
    if (Object.values(priceRanges).some((value) => value)) {
      result = result.filter((product) => {
        if (priceRanges.under50 && product.price < 50) return true;
        if (priceRanges.from50to100 && product.price >= 50 && product.price < 100) return true;
        if (priceRanges.from100to200 && product.price >= 100 && product.price < 200) return true;
        if (priceRanges.over200 && product.price >= 200) return true;
        return false;
      });
    }

    // Apply rating filters
    if (Object.values(ratingFilter).some((value) => value)) {
      result = result.filter((product) => {
        if (ratingFilter.fiveStars && product.rating >= 5) return true;
        if (ratingFilter.fourStars && product.rating >= 4 && product.rating < 5) return true;
        if (ratingFilter.threeStars && product.rating >= 3 && product.rating < 4) return true;
        return false;
      });
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default: // featured
        result.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
    }

    console.log("Filtered Products:", result); // Debugging
    setFilteredProducts(result);
  }, [
    products,
    selectedCategory,
    priceRanges,
    ratingFilter,
    sortOption,
    searchTerm,
  ]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handlePriceRangeChange = (range: keyof typeof priceRanges) => {
    setPriceRanges((prev) => ({
      ...prev,
      [range]: !prev[range],
    }))
  }

  const handleRatingChange = (rating: keyof typeof ratingFilter) => {
    setRatingFilter((prev) => ({
      ...prev,
      [rating]: !prev[rating],
    }))
  }

  const clearAllFilters = () => {
    setSelectedCategory("all")
    setSearchTerm("")
    setPriceRanges({
      under50: false,
      from50to100: false,
      from100to200: false,
      over200: false,
    })
    setRatingFilter({
      fiveStars: false,
      fourStars: false,
      threeStars: false,
    })
    setSortOption("featured")
    router.push("/shop")
  }

  const handleAddToCart = (product: Product) => {
    if (!session) {
      setError("Please log in to add items to your cart.");
      setTimeout(() => {
        setError((prev) => (""))
      }, 5000)
      return;
    } else {
      addToCart(product)

      // Show "Added" feedback
      setAddedToCart((prev) => ({ ...prev, [product.id]: true }))

      // Reset after 2 seconds
      setTimeout(() => {
        setAddedToCart((prev) => ({ ...prev, [product.id]: false }))
      }, 2000)
    }
  }

  const handleWishlistToggle = (product: Product | any) => {
    if (!session) {
      setError("Please log in to add items to your wishlist.");
      setTimeout(() => {
        setError((prev) => (""))
      }, 5000)
      return;
    } else {
      if (isInWishlist(product)) {
        removeFromWishlist(product)
      } else {
        addToWishlist(product)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="relative bg-[#2A5D3C] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sp-2.jpg"
            alt="Shop background"
            fill
            className="object-cover opacity-100 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e4a2e]/90 to-[#2A5D3C]/70"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
              Premium Quality Gear
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Shop Our Products</h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Discover premium outdoor gear designed for durability, comfort, and performance in any environment.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex w-full max-w-xl mx-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-l-lg focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none"
                placeholder="Search for products..."
              />
            </div>
            <button
              type="submit"
              className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium py-2 px-4 rounded-r-lg transition duration-300"
            >
              Search
            </button>
          </form>
        </div>

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
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left py-2 px-3 rounded-md transition ${
                      selectedCategory === category.id ? "bg-[#2A5D3C] text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="price-1"
                      className="mr-2"
                      checked={priceRanges.under50}
                      onChange={() => handlePriceRangeChange("under50")}
                    />
                    <label htmlFor="price-1">Under $50</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="price-2"
                      className="mr-2"
                      checked={priceRanges.from50to100}
                      onChange={() => handlePriceRangeChange("from50to100")}
                    />
                    <label htmlFor="price-2">$50 - $100</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="price-3"
                      className="mr-2"
                      checked={priceRanges.from100to200}
                      onChange={() => handlePriceRangeChange("from100to200")}
                    />
                    <label htmlFor="price-3">$100 - $200</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="price-4"
                      className="mr-2"
                      checked={priceRanges.over200}
                      onChange={() => handlePriceRangeChange("over200")}
                    />
                    <label htmlFor="price-4">$200+</label>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Customer Rating</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rating-5"
                      className="mr-2"
                      checked={ratingFilter.fiveStars}
                      onChange={() => handleRatingChange("fiveStars")}
                    />
                    <label htmlFor="rating-5" className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                      <span className="ml-2">& Up</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rating-4"
                      className="mr-2"
                      checked={ratingFilter.fourStars}
                      onChange={() => handleRatingChange("fourStars")}
                    />
                    <label htmlFor="rating-4" className="flex items-center">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                      <span className="ml-2">& Up</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rating-3"
                      className="mr-2"
                      checked={ratingFilter.threeStars}
                      onChange={() => handleRatingChange("threeStars")}
                    />
                    <label htmlFor="rating-3" className="flex items-center">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                      <span className="ml-2">& Up</span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={clearAllFilters}
                className="w-full mt-8 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="md:w-3/4 lg:w-4/5">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try selecting a different category or clearing your filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    {searchTerm ? (
                      <>
                        Search results for "{searchTerm}"
                        <span className="ml-2 text-gray-500 text-sm font-normal">
                          ({filteredProducts.length} products)
                        </span>
                      </>
                    ) : (
                      <>
                        {selectedCategory === "all"
                          ? "All Products"
                          : categories.find((c) => c.id === selectedCategory)?.name}
                        <span className="ml-2 text-gray-500 text-sm font-normal">
                          ({filteredProducts.length} products)
                        </span>
                      </>
                    )}
                  </h2>
                  <div className="hidden md:block">
                    <select
                      className="border border-gray-300 rounded-md p-2"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="featured">Sort by: Featured</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                </div>
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
                    
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col h-full"
                    >
                      <Link href={`/shop/${product.id}`} className="block">
                        <div className="relative h-48 sm:h-56">
                          <Image
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          {product.isNew && (
                            <span className="absolute top-2 right-2 bg-[#4CAF50] text-white text-xs font-bold px-2 py-1 rounded">
                              NEW
                            </span>
                          )}
                          {product.isOnsale && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              SALE
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
                          <span className="text-xs text-gray-500 ml-1">({product.review_count})</span>
                        </div>

                        <Link href={`/shop/${product.id}`}>
                          <h3 className="font-semibold truncate mb-2 hover:text-[#2A5D3C] transition duration-300">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm h-10 overflow-hidden mb-auto">{product.short_description}</p>

                        <div className="mt-auto pt-4">
                          <div className="mb-2">
                            {product.isOnsale && product.sale_price ? (
                              <div>
                                <span className="font-bold text-lg text-red-600">${product.sale_price.toFixed(2)}</span>
                                <span className="text-sm text-gray-500 line-through ml-1">
                                  ${product.price.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className={`flex-grow ${
                                addedToCart[product.id]
                                  ? "bg-[#4CAF50] hover:bg-[#3d9140]"
                                  : "bg-[#2A5D3C] hover:bg-[#1e4a2e]"
                              } text-white text-sm font-semibold py-2 px-3 rounded-md transition duration-300 flex items-center justify-center`}
                            >
                              {addedToCart[product.id] ? (
                                "Added!"
                              ) : (
                                <>
                                  <ShoppingBag className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleWishlistToggle(product)}
                              className={`p-2 rounded-md transition duration-300 ${
                                isInWishlist(product)
                                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                              aria-label={isInWishlist(product) ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <Heart className={`h-5 w-5 ${isInWishlist(product) ? "fill-current" : ""}`} />
                            </button>
                          </div>
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
    </div>
  )
}
