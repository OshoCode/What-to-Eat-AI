"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Oceanfront Penthouse",
    location: "Miami Beach, FL",
    price: "$8,500,000",
    beds: 4,
    baths: 5.5,
    sqft: 5200,
    image: "/re2.jpg",
    features: "Private Elevator, Infinity Pool",
  },
  {
    id: 2,
    title: "Modern Hillside Estate",
    location: "Beverly Hills, CA",
    price: "$12,900,000",
    beds: 6,
    baths: 8,
    sqft: 8500,
    image: "/re3.jpg",
    features: "Home Theater, Wine Cellar",
  },
  {
    id: 3,
    title: "Historic Brownstone",
    location: "Upper East Side, NY",
    price: "$7,200,000",
    beds: 5,
    baths: 4.5,
    sqft: 4800,
    image: "/re4.jpg",
    features: "Garden Terrace, Original Details",
  },
]

export default function FeaturedProperties() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="properties" className="py-24 bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-900 dark:text-zinc-100 mb-2">
            Featured <span className="font-medium">Properties</span>
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="rounded-none border-0 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-zinc-800"
              onMouseEnter={() => setHoveredId(property.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={property.image}
                  alt={property.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === property.id ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-1 text-sm font-medium">
                  {property.price}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                  {property.title}
                </h3>
                <div className="flex items-center text-zinc-600 dark:text-zinc-400 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-700 dark:text-zinc-300 mb-4">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.sqft} Sq.Ft.</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{property.features}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-zinc-900"
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="link"
            className="text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 text-base"
          >
            View All Properties
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

