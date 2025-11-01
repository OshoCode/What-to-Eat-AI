'use client';

import React, { useState } from 'react';
import { 
  Dumbbell, 
  Users, 
  Clock,
  MapPin,
  Zap,
  Apple,
  Instagram,
  Facebook,
  Twitter,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image"
import TestimonialCarousel from "./components/testimonial-carousel"
import FeatureCard from "./components/feature-card"
import PricingSection from "./components/pricing-section"
import ContactForm from "./components/contact-form"
import Navbar from "./components/navbar"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">POWERHOUSE</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="hover:text-red-500 transition-colors duration-300">Home</a>
            <a href="#about" className="hover:text-red-500 transition-colors duration-300">About</a>
            <a href="#classes" className="hover:text-red-500 transition-colors duration-300">Classes</a>
            <a href="#trainers" className="hover:text-red-500 transition-colors duration-300">Trainers</a>
            <a href="#contact" className="hover:text-red-500 transition-colors duration-300">Contact</a>
          </div>
          <button 
            className="md:hidden text-white hover:text-red-500 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#home" className="hover:text-red-500 transition-colors duration-300">Home</a>
              <a href="#about" className="hover:text-red-500 transition-colors duration-300">About</a>
              <a href="#classes" className="hover:text-red-500 transition-colors duration-300">Classes</a>
              <a href="#trainers" className="hover:text-red-500 transition-colors duration-300">Trainers</a>
              <a href="#contact" className="hover:text-red-500 transition-colors duration-300">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full h-screen"
        >
          <SwiperSlide className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
            <img 
              src="/gym1.jpg" 
              alt="Gym" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex justify-center items-center">
              <div className="container mx-auto px-4 flex justify-center">
                <div className="max-w-3xl text-center">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    Transform Your Body, <span className="text-red-600">Transform Your Life</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join the ultimate fitness experience with state-of-the-art equipment, expert trainers, and a supportive community.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2">
                      Start Your Journey
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="border-2 border-white/20 hover:border-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
            <img 
              src="/gym2.jpg" 
              alt="Gym" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex justify-center items-center">
              <div className="container mx-auto px-4 flex justify-center">
                <div className="max-w-3xl text-center">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    Build Your Strength, <span className="text-red-600">Build Your Future</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Experience the power of professional training and cutting-edge equipment in our world-class facility.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2">
                      Join Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="border-2 border-white/20 hover:border-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300">
                      View Classes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-600/50 transition-colors duration-300">
              <Dumbbell className="w-12 h-12 mb-4 text-red-600" />
              <h3 className="text-xl font-bold mb-2">Modern Equipment</h3>
              <p className="text-gray-400">State-of-the-art facilities and equipment for optimal training</p>
            </div>
            <div className="bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-600/50 transition-colors duration-300">
              <Users className="w-12 h-12 mb-4 text-red-600" />
              <h3 className="text-xl font-bold mb-2">Expert Trainers</h3>
              <p className="text-gray-400">Professional guidance and support from certified trainers</p>
            </div>
            <div className="bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-600/50 transition-colors duration-300">
              <Clock className="w-12 h-12 mb-4 text-red-600" />
              <h3 className="text-xl font-bold mb-2">24/7 Access</h3>
              <p className="text-gray-400">Work out on your schedule with round-the-clock access</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600/20 rounded-lg transform rotate-3"></div>
              <img 
                src="/gym3.jpg" 
                alt="About Us" 
                className="rounded-lg shadow-lg relative z-10"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Your Fitness Journey Starts Here</h3>
              <p className="text-gray-400 mb-8 text-lg">
                We are dedicated to helping you achieve your fitness goals. Our state-of-the-art facility
                and expert trainers provide the perfect environment for your transformation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-red-600/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-lg">Convenient location</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-red-600/10 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-lg">Modern equipment</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-red-600/10 p-3 rounded-lg">
                    <Apple className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-lg">Healthy lifestyle focus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12">What Our Members Say</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Membership Plans</h2>
          <PricingSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Start Your Fitness Journey</h2>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="h-8 w-8 text-red-600" />
                <span className="text-2xl font-bold">POWERHOUSE</span>
              </div>
              <p className="text-gray-400">Transform your body and mind with us.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-red-500 transition-colors duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-red-500 transition-colors duration-300">About</a></li>
                <li><a href="#classes" className="text-gray-400 hover:text-red-500 transition-colors duration-300">Classes</a></li>
                <li><a href="#trainers" className="text-gray-400 hover:text-red-500 transition-colors duration-300">Trainers</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Gym Street</li>
                <li>City, State 12345</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@powerhouse.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 POWERHOUSE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}