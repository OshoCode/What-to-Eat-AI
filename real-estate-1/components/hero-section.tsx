"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true" />
        <img
          src="/re1.jpg"
          alt="Luxury real estate"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div
          className={`max-w-3xl transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 leading-tight">
            Luxury Accomodation, <span className="font-medium">Tailored for You</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-8 max-w-2xl">
            Discover unparalleled expertise in premium real estate. We curate exceptional properties for discerning
            clients who demand nothing but excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-none px-8 py-6 text-base">
              Discover Exclusive Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-none px-8 py-6 text-base"
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/80 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  )
}

