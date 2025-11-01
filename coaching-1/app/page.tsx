import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Play, CheckCircle, ArrowRight, DollarSign, Clock, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm bg-gray-900/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">WealthBuilder</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#why-us" className="text-gray-300 hover:text-white transition-colors">
                Why Us
              </Link>
              <Link href="#benefits" className="text-gray-300 hover:text-white transition-colors">
                Benefits
              </Link>
              <Link href="#proof" className="text-gray-300 hover:text-white transition-colors">
                Proof
              </Link>
            </div>

            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105">
              Enroll Now !
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-10 lg:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 justify-center items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 lg:w-1/2 relative z-10">
              <div className="space-y-6">
                <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10 inline-flex px-4 py-1.5">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  For Anyone Looking to Build A High-Intent Digital Product
                </Badge>

                <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left leading-tight">
                  Making <span className="text-green-400">$100,000+</span> by
                  Creating Digital Product 
                  <span className="text-orange-500"> in a Day</span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                  Here's the exact AI prompt system I used to make{" "}
                  <span className="text-green-400 font-semibold">$50,000+ in 23 days</span> by starting selling my own
                  digital product today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg w-full sm:w-auto shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Get the 7 Figure Product Prompt Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <div className="flex flex-row lg:flex-col gap-2 items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">4.9/5 (2,847 reviews)</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 hidden lg:block">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Generate profitable product ideas instantly</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">No strategy? No writing? AI prompts do it all</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Easy to start and even easier to succeed</span>
                </div>
              </div>
            </div>

            {/* Right Column - Video/Image */}
            <div className="relative lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden bg-gray-800/50 border border-gray-700/50 shadow-2xl max-w-lg mx-auto lg:max-w-none backdrop-blur-sm">
                <div className="relative w-full h-[400px] lg:h-[500px]">
                  <Image 
                    src="/coaching-1.png" 
                    alt="Success story video" 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-105" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full w-10 h-10 lg:w-10 lg:h-15 shadow-lg transition-all duration-300 hover:scale-110"
                    >
                      <Play className="w-6 h-6 lg:w-8 lg:h-8 text-white fill-white" />
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-orange-400 font-handwriting text-md leading-tight">
                      Watch me build million dollars business
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            You've been <span className="text-orange-500">sitting on the idea</span> of launching a product{" "}
            <span className="text-gray-400">for months...</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            But every time you try, you hit a wall. You don't know where to start, what to create, or how to make it
            profitable.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              What if I told you there's a <span className="text-green-400">proven system</span> that eliminates all the
              guesswork?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A system that uses AI to generate profitable product ideas, write your sales copy, create your content,
              and even build your marketing strategy — all in a single day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700 p-8 text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Instant Ideas</h3>
              <p className="text-gray-300">
                Generate 50+ profitable digital product ideas in minutes using our proven AI prompts
              </p>
            </Card>

            <Card className="bg-gray-800 border-gray-700 p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Profit-Focused</h3>
              <p className="text-gray-300">
                Every prompt is designed to create products that sell, not just products that exist
              </p>
            </Card>

            <Card className="bg-gray-800 border-gray-700 p-8 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Same Day Results</h3>
              <p className="text-gray-300">
                Go from idea to launched product in 24 hours or less with our step-by-step system
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join 10,000+ Successful Creators</h2>
            <p className="text-gray-300">Who've already transformed their ideas into profitable digital products</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$2.3M+</div>
              <div className="text-gray-300">Total Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">10,847</div>
              <div className="text-gray-300">Products Launched</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">24hrs</div>
              <div className="text-gray-300">Average Time to Launch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your <span className="text-orange-500">7-Figure Digital Product</span> Empire?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get instant access to the exact AI prompts and system that generated over $50,000 in just 23 days
          </p>

          <div className="space-y-4">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 rounded-full font-bold text-xl"
            >
              Get the 7 Figure Product Prompt Now
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Lifetime Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold">WealthBuilder</span>
            </div>

            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; 2024 WealthBuilder. All rights reserved. Transform your ideas into profit.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
