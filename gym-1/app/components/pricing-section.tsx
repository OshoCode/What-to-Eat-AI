import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "1,500",
    features: ["Access to gym equipment", "Locker room access", "Basic fitness assessment"],
  },
  {
    name: "Premium",
    price: "2,500",
    features: [
      "All Basic features",
      "2 Personal training sessions/month",
      "Group classes access",
      "Nutrition consultation",
    ],
  },
  {
    name: "Elite",
    price: "4,000",
    features: [
      "All Premium features",
      "Unlimited personal training",
      "Priority class booking",
      "Massage therapy sessions",
      "Custom meal plans",
    ],
  },
]

export default function PricingSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <Card key={plan.name} className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold">
              ฿{plan.price}
              <span className="text-sm font-normal text-muted-foreground">/month</span>
            </p>
          </div>
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full">Choose Plan</Button>
        </Card>
      ))}
    </div>
  )
}

