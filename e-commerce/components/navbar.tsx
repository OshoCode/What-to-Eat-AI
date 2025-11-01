"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, User, LogIn, UserPlus } from "lucide-react"
import { useCart } from "@/context/cart.context"
import { useAuth } from "@/context/auth.context"
import { useWishlist } from "@/context/wishlist.context"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()
  const { session, logOut } = useAuth() as { session: { user: any } | null; logOut: () => void }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">OutdoorGear</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition duration-300 ${isActive("/") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`transition duration-300 ${isActive("/shop") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className={`transition duration-300 ${isActive("/collections") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className={`transition duration-300 ${isActive("/about") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`transition duration-300 ${isActive("/contact") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Icons & Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {session?.user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/account"
                  className={`transition duration-300 ${isActive("/account") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
                >
                  My Account
                </Link>
                <button
                  onClick={logOut}
                  className="text-gray-700 hover:text-[#2A5D3C] font-medium transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-[#2A5D3C] font-medium transition duration-300 flex items-center"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Sign Up
                </Link>
              </>
            )}
            <div className="h-6 w-px bg-gray-300 mx-1"></div>
            {session?.user  && (
              <Link href="/account" className="p-2 rounded-full hover:bg-gray-100 transition duration-300">
                <User className="h-5 w-5 text-gray-700" />
              </Link>
            )}
            <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 transition duration-300 relative">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#4CAF50] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 transition duration-300 relative">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#4CAF50] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
            <button className="p-2 rounded-full hover:bg-gray-100 transition duration-300" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className={`py-2 ${isActive("/") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className={`py-2 ${isActive("/shop") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className={`py-2 ${isActive("/collections") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/about"
                className={`py-2 ${isActive("/about") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`py-2 ${isActive("/contact") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {session?.user  && (
                <Link
                  href="/account"
                  className={`py-2 ${isActive("/account") ? "text-[#2A5D3C] font-semibold" : "text-gray-700 hover:text-[#2A5D3C]"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
              )}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-gray-100">
              {session?.user ? (
                <button
                  onClick={() => {
                    logOut()
                    setIsMenuOpen(false)
                  }}
                  className="py-2 text-gray-700 hover:text-[#2A5D3C]"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="py-2 text-gray-700 hover:text-[#2A5D3C]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="py-2 bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium rounded-md text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {session?.user && (
              <div className="flex items-center mt-4">
                <Link
                  href="/account"
                  className="p-2 rounded-full hover:bg-gray-100 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 text-gray-700" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
