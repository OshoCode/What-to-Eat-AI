"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote:
      "Working with LuxeEstate was a seamless experience from start to finish. Their attention to detail and market knowledge helped us find our dream home.",
    author: "Jonathan & Sarah Thompson",
    position: "Homeowners, Beverly Hills",
  },
  {
    id: 2,
    quote:
      "As an international investor, I needed a team I could trust. LuxeEstate's global expertise and personalized approach exceeded my expectations.",
    author: "Alexander Chen",
    position: "Real Estate Investor",
  },
  {
    id: 3,
    quote:
      "The team's discretion and professionalism were paramount in our high-profile transaction. They negotiated expertly and protected our privacy throughout.",
    author: "Victoria Reynolds",
    position: "CEO, Reynolds Enterprises",
  },
  {
    id: 4,
    quote:
      "LuxeEstate found us a property that wasn't even on the market. Their connections and dedication to understanding our needs made all the difference.",
    author: "Michael & Elizabeth Blackwood",
    position: "Luxury Homebuyers",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const visibleTestimonials = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1

  const nextSlide = () => {
    if (isAnimating) return
    setDirection("right")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (testimonials.length - visibleTestimonials + 1))
      setIsAnimating(false)
    }, 300)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setDirection("left")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - visibleTestimonials : prevIndex - 1))
      setIsAnimating(false)
    }, 300)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [currentIndex, isAnimating])

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-900 dark:text-zinc-100 mb-4">
            Client <span className="font-medium">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className={`flex transition-transform duration-300 ease-in-out ${
                isAnimating ? (direction === "right" ? "-translate-x-full" : "translate-x-full") : "translate-x-0"
              }`}
            >
              {testimonials.slice(currentIndex, currentIndex + visibleTestimonials).map((testimonial) => (
                <div key={testimonial.id} className="w-full lg:w-1/3 md:w-1/2 flex-shrink-0 px-4">
                  <Card className="h-full border-0 shadow-md bg-white dark:bg-zinc-800">
                    <CardContent className="p-8">
                      <Quote className="h-10 w-10 text-amber-500/30 dark:text-amber-400/30 mb-4" />
                      <p className="text-zinc-700 dark:text-zinc-300 mb-6 italic">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-serif font-medium text-zinc-900 dark:text-zinc-100">{testimonial.author}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.position}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 shadow-md rounded-full p-3 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 focus:outline-none z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white dark:bg-zinc-800 shadow-md rounded-full p-3 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 focus:outline-none z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

