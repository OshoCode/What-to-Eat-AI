import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CollectionsPage() {
  const collections = [
    {
      id: "hiking",
      title: "Hiking Essentials",
      description: "Everything you need for day hikes to multi-day treks.",
      image: "/placeholder.svg?height=600&width=800",
      categories: ["backpacks", "footwear", "clothing"],
    },
    {
      id: "camping",
      title: "Camping Gear",
      description: "Quality equipment for comfortable nights under the stars.",
      image: "/placeholder.svg?height=600&width=800",
      categories: ["tents", "accessories"],
    },
    {
      id: "winter",
      title: "Winter Adventure",
      description: "Specialized gear for cold weather exploration.",
      image: "/placeholder.svg?height=600&width=800",
      categories: ["clothing", "footwear", "accessories"],
    },
    {
      id: "water",
      title: "Water Activities",
      description: "Gear for lakes, rivers, and coastal adventures.",
      image: "/placeholder.svg?height=600&width=800",
      categories: ["clothing", "accessories"],
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-[#2A5D3C] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sp-3.jpg"
            alt="Collections background"
            fill
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2A5D3C]/90 via-[#3d7a50]/80 to-[#2A5D3C]/90"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
              Expertly Curated
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Our Collections</h1>
            <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Curated gear sets for every type of outdoor adventure. From hiking essentials to specialized equipment for
              extreme conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="relative h-64 md:h-80">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">{collection.title}</h2>
                    <p className="mb-4">{collection.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {collection.categories.map((category) => (
                        <Link
                          key={category}
                          href={`/shop?category=${category}`}
                          className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm backdrop-blur-sm transition"
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/collections/${collection.id}`}
                      className="inline-flex items-center text-white font-semibold hover:underline"
                    >
                      Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Collection */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Seasonal Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our latest gear selected specifically for this season's adventures.
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <div className="relative h-96">
              <Image
                src="/placeholder.svg?height=800&width=1600"
                alt="Seasonal Collection"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2A5D3C]/80 to-transparent flex flex-col justify-center p-8 md:p-16 text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Spring 2025 Collection</h3>
                <p className="text-lg max-w-md mb-6">
                  Lightweight, breathable gear designed for the variable conditions of spring adventures.
                </p>
                <Link
                  href="/shop"
                  className="bg-white text-[#2A5D3C] hover:bg-gray-100 transition px-6 py-3 rounded-md font-semibold inline-flex items-center w-fit"
                >
                  Shop the Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sets */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Curated Gear Sets</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete packages of essential gear, hand-selected by our experts for specific activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Backpacking Essentials"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Backpacking Essentials</h3>
                <p className="text-gray-600 mb-4">Everything you need for a weekend in the backcountry.</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">$499.99</span>
                  <span className="text-sm text-gray-500">Save $120</span>
                </div>
                <Link
                  href="/shop"
                  className="mt-4 bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-2 px-4 rounded-md transition duration-300 block text-center"
                >
                  View Set
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Day Hiker Package"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Day Hiker Package</h3>
                <p className="text-gray-600 mb-4">The perfect setup for day trips on the trail.</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">$249.99</span>
                  <span className="text-sm text-gray-500">Save $75</span>
                </div>
                <Link
                  href="/shop"
                  className="mt-4 bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-2 px-4 rounded-md transition duration-300 block text-center"
                >
                  View Set
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Family Camping Kit"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Family Camping Kit</h3>
                <p className="text-gray-600 mb-4">All the essentials for a comfortable family camping trip.</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">$699.99</span>
                  <span className="text-sm text-gray-500">Save $200</span>
                </div>
                <Link
                  href="/shop"
                  className="mt-4 bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-2 px-4 rounded-md transition duration-300 block text-center"
                >
                  View Set
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
