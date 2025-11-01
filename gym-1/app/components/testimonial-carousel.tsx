"use client"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah L.",
    text: "The trainers here are amazing! I've achieved results I never thought possible.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Mike T.",
    text: "Best gym in Bangkok! The 24/7 access fits perfectly with my schedule.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Lisa K.",
    text: "State-of-the-art equipment and a great community. Highly recommended!",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative max-w-2xl mx-auto">
      <Card className="p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={testimonials[current].image || "/placeholder.svg"}
            alt={testimonials[current].name}
            className="w-20 h-20 rounded-full mb-4"
          />
          <p className="text-lg mb-4">{testimonials[current].text}</p>
          <p className="font-semibold">{testimonials[current].name}</p>
        </div>
      </Card>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-primary text-white"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-primary text-white"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

