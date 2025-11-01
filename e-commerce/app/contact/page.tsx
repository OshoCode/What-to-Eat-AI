"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<{
    submitted: boolean
    success: boolean
    message: string
  } | null>(null)

  // State to track which FAQ items are open
  const [openFaqs, setOpenFaqs] = useState<number[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We will get back to you shortly.",
    })

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    // In a real application, you would send the form data to your backend here
  }

  // Toggle FAQ open/close
  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  // FAQ data
  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day satisfaction guarantee on all unused products. If you're not completely satisfied, you can return your purchase for a full refund or exchange. Items must be in original condition with all tags and packaging intact.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account on our website and viewing your order history. Our shipping partners provide real-time updates on your package's journey.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see shipping options during checkout. Please note that international orders may be subject to customs fees and import duties, which are the responsibility of the recipient.",
    },
    {
      question: "How does the lifetime warranty work?",
      answer:
        "Our lifetime warranty covers manufacturing defects for the life of the product. If your gear fails due to a manufacturing defect, we'll repair or replace it at no cost to you. Normal wear and tear, misuse, or accidental damage are not covered under the warranty. To make a warranty claim, contact our customer service team.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "Orders can be modified or canceled within 1 hour of placement. After that, please contact our customer service team, and we'll do our best to accommodate your request. Once an order has been shipped, it cannot be canceled, but you can return it according to our return policy.",
    },
    {
      question: "Do you offer product repairs?",
      answer:
        "Yes, we offer repair services for our products. Depending on the issue, repairs may be covered under warranty or available for a reasonable fee. Our skilled repair team can fix most damage and extend the life of your gear. Contact our customer service team to arrange a repair.",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#1e4a2e] to-[#2A5D3C] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 mix-blend-soft-light opacity-100">
          <Image
            src="/sp-4.jpg"
            alt="Contact background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[#2A5D3C]/30"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(76, 175, 80, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(76, 175, 80, 0.15) 0%, transparent 50%)",
          }}
        ></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
              We're Here To Help
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Contact Us</h1>
            <div className="w-24 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help with all your outdoor gear needs.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information and Form */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Contact Information */}
              <div className="lg:w-1/3 bg-gradient-to-br from-[#2A5D3C] to-[#1e4a2e] p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-white/20 rounded-full p-3 mr-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <p className="text-white/90">
                        <a href="mailto:info@outdoorgear.com" className="hover:text-white transition">
                          info@outdoorgear.com
                        </a>
                      </p>
                      <p className="text-white/70 text-sm mt-1">For general inquiries and customer service</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 rounded-full p-3 mr-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Call Us</h3>
                      <p className="text-white/90">
                        <a href="tel:+18005551234" className="hover:text-white transition">
                          (800) 555-1234
                        </a>
                      </p>
                      <p className="text-white/70 text-sm mt-1">
                        Monday-Friday: 8am-8pm EST
                        <br />
                        Saturday-Sunday: 9am-6pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 rounded-full p-3 mr-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Headquarters</h3>
                      <p className="text-white/90">
                        1234 Mountain View Dr
                        <br />
                        Denver, CO 80202
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 rounded-full p-3 mr-4">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Business Hours</h3>
                      <p className="text-white/90">
                        Monday-Friday: 9am-6pm
                        <br />
                        Saturday: 10am-4pm
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:w-2/3 p-8 lg:p-12">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                {formStatus && (
                  <div
                    className={`mb-6 p-4 rounded-md flex items-start ${
                      formStatus.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                    }`}
                  >
                    {formStatus.success ? (
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition appearance-none bg-white"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option value="Customer Service">Customer Service</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Status">Order Status</option>
                      <option value="Returns & Exchanges">Returns & Exchanges</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none transition"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-semibold py-3 px-8 rounded-md transition duration-300 flex items-center shadow-md hover:shadow-lg"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to our most common questions. If you need additional help, don't hesitate to contact
              us.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left"
                >
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  {openFaqs.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-[#2A5D3C] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#2A5D3C] flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqs.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 pt-0 border-t border-gray-100 bg-gray-50 text-gray-700">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Our Headquarters</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our main office is located in the heart of Denver, with easy access from major highways.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center relative">
                <Image src="/placeholder.svg?height=800&width=1600" alt="Map location" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div className="bg-white p-4 rounded-lg shadow-lg max-w-md text-center">
                    <h3 className="font-bold text-lg mb-2">OutdoorGear Headquarters</h3>
                    <p className="text-gray-700">
                      1234 Mountain View Dr
                      <br />
                      Denver, CO 80202
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block bg-[#2A5D3C] hover:bg-[#1e4a2e] text-white font-medium py-2 px-4 rounded-md transition duration-300 text-sm"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
