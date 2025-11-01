import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Star, Users, ShieldCheck, Truck } from "lucide-react"
import { products } from "@/lib/products"

export default function Home() {
  // Get featured products for the homepage
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 3)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-[#2A5D3C] text-white">
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute inset-0 z-10" aria-hidden="true" />
            <img
              src="/hiking-hero.jpg"
              alt="Unforgettable outdoor experiences"
              className="w-full h-full object-cover"
            />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-7xl text-center md:text-left md:text-8xl font-bold mt-4 mb-8">Gear Up For The Best Adventure</h1>
            <p className="text-lg text-center md:text-left md:text-2xl mb-6 md:mb-12 text-gray-300">
              Premium outdoor equipment for explorers who demand quality, durability, and performance. We bring you high-quality gear to conquer any challenge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="bg-[#4CAF50] hover:bg-[#3d9140] text-white font-semibold text-xl py-3 px-8 rounded-md transition duration-300 flex items-center justify-center"
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/collections"
                className="border border-white hover:bg-white/10 text-white font-semibold text-xl py-3 px-8 rounded-md transition duration-300 flex items-center justify-center"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Premium Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-md">
              Discover our range of high-quality outdoor equipment designed for durability and performance.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
              <Link href="/shop?category=backpacks" className="block">
                <div className="relative h-64">
                  <Image
                    src="/hiking-1.jpg"
                    alt="Hiking Backpack"
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">All-Terrain Backpacks</h3>
                <p className="text-gray-600 mb-4">
                  Engineered with water-resistant materials and ergonomic design for maximum comfort on long treks.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Waterproof construction</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Adjustable support system</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Multiple compartments</span>
                  </li>
                </ul>
                <Link
                  href="/shop?category=backpacks"
                  className="w-full bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-2 px-4 rounded-md transition duration-300 block text-center"
                >
                  Shop Backpacks
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
              <Link href="/shop?category=tents" className="block">
                <div className="relative h-64">
                  <Image src="/hiking-2.jpg" alt="Camping Tent" fill className="object-cover" />
                </div>
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">All-Weather Tents</h3>
                <p className="text-gray-600 mb-4">
                  Lightweight yet durable tents that withstand weather conditions while being easy to set up.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Quick setup design</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Wind and rain resistant</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Reinforced anchor points</span>
                  </li>
                </ul>
                <Link
                  href="/shop?category=tents"
                  className="w-full bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-2 px-4 rounded-md transition duration-300 block text-center"
                >
                  Shop Tents
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
              <Link href="/shop?category=footwear" className="block">
                <div className="relative h-64">
                  <Image src="/hiking-3.avif" alt="Hiking Boots" fill className="object-cover" />
                </div>
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Trail-Ready Footwear</h3>
                <p className="text-gray-600 mb-4">
                  Boots and shoes designed for various terrains with superior grip and ankle support.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Vibram® soles for traction</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Waterproof membrane</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Breathable materials</span>
                  </li>
                </ul>
                <Link
                  href="/shop?category=footwear"
                  className="w-full bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-2 px-4 rounded-md transition duration-300 block text-center"
                >
                  Shop Footwear
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose OutdoorGear?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're not just selling equipment, we're providing reliable companions for your adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition duration-300">
              <div className="bg-[#2A5D3C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lifetime Warranty</h3>
              <p className="text-gray-600">
                Our confidence in our products is backed by an industry-leading lifetime warranty on all gear.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition duration-300">
              <div className="bg-[#2A5D3C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Advice</h3>
              <p className="text-gray-600">
                Our team consists of outdoor enthusiasts who test every product and can guide your purchase.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition duration-300">
              <div className="bg-[#2A5D3C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Free Shipping</h3>
              <p className="text-gray-600">
                Enjoy free carbon-neutral shipping on all orders over $50, with easy returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from outdoor enthusiasts who rely on our gear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The backpack I purchased has been with me on over 20 hikes across three continents. Still looks and
                functions like new. Incredible quality."
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-lg">Alex Morgan</h4>
                  <p className="text-sm text-gray-500">Adventure Photographer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "My tent withstood a surprise storm in the Rockies that forced others to evacuate. The customer service
                team was also incredibly helpful with setup tips."
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-lg">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Hiking Enthusiast</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "As a professional guide, I need equipment I can trust. OutdoorGear has been my go-to for five years
                now. Their boots have never let me down, even in the harshest conditions."
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-lg">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Mountain Guide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-[#2A5D3C] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready For Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied explorers who trust OutdoorGear for their adventures. Sign up today and get 15%
            off your first purchase.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
              <button className="bg-[#4CAF50] hover:bg-[#3d9140] text-white font-semibold py-3 px-6 rounded-md transition duration-300 whitespace-nowrap">
                Get 15% Off
              </button>
            </div>
            <p className="text-sm mt-4 text-gray-300">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
