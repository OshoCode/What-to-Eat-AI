import type React from "react"
import Image from "next/image"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  image: string
}

export default function FeatureCard({ icon, title, description, image }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg bg-card border flex flex-col">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="relative h-48 mt-auto">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover rounded-md" />
      </div>
    </div>
  )
}

