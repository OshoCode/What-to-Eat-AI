"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ContactForm() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Add form submission logic here
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input type="text" placeholder="Name" required />
      </div>
      <div>
        <Input type="email" placeholder="Email" required />
      </div>
      <div>
        <Input type="tel" placeholder="Phone" required />
      </div>
      <div>
        <Textarea placeholder="Message" required />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Get Started"}
      </Button>
    </form>
  )
}

