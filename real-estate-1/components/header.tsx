"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-serif tracking-tight text-zinc-900 dark:text-zinc-100">
              LUXE<span className="text-amber-500">ESTATE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-900 hover:text-amber-500 dark:text-zinc-100 dark:hover:text-amber-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#properties"
              className="text-sm font-medium text-zinc-900 hover:text-amber-500 dark:text-zinc-100 dark:hover:text-amber-400 transition-colors"
            >
              Properties
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium text-zinc-900 hover:text-amber-500 dark:text-zinc-100 dark:hover:text-amber-400 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-zinc-900 hover:text-amber-500 dark:text-zinc-100 dark:hover:text-amber-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-zinc-900 hover:text-amber-500 dark:text-zinc-100 dark:hover:text-amber-400 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <Button
            variant="outline"
            className="hidden md:inline-flex border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-zinc-900"
          >
            Book a Consultation
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-zinc-900 dark:text-zinc-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Home
              </Link>
              <Link href="#properties" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Properties
              </Link>
              <Link href="#services" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Services
              </Link>
              <Link href="#about" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                About
              </Link>
              <Link href="#contact" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Contact
              </Link>
              <Button
                variant="outline"
                className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-zinc-900"
              >
                Book a Consultation
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

