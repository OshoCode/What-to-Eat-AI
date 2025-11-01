import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import Navbar from "@/components/navbar"
import { CartProvider } from "@/context/cart.context"
import { AuthProvider } from "@/context/auth.context"
import { OrderProvider } from "@/context/order.context"
import { WishlistProvider } from "@/context/wishlist.context"
import { ProductProvider } from "@/context/product.context";
import Footer from "@/components/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OutdoorGear - Premium Outdoor Equipment",
  description:
    "Shop high-quality outdoor gear for hiking, camping, and all your adventure needs. Free shipping on orders over $50.",
  keywords: "outdoor gear, camping equipment, hiking gear, backpacks, tents, outdoor clothing",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProductProvider>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>
                <WishlistProvider>
                  <Navbar />
                  {children}
                  <Footer />
                </WishlistProvider>
              </OrderProvider>
            </CartProvider>
          </AuthProvider>
        </ProductProvider>
      </body>
    </html>
  )
}
