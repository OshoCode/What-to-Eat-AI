import { Home, Building, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: <Home className="h-12 w-12 text-amber-500 dark:text-amber-400" />,
    title: "For Buyers",
    description:
      "We help you find your dream property with personalized search, exclusive access to off-market listings, and expert negotiation.",
    features: ["Personalized property search", "Private viewings", "Expert negotiation", "Seamless closing process"],
  },
  {
    icon: <Building className="h-12 w-12 text-amber-500 dark:text-amber-400" />,
    title: "For Sellers",
    description:
      "Maximize your property's value with our strategic marketing, global network of qualified buyers, and white-glove service.",
    features: [
      "Professional photography & staging",
      "Strategic pricing analysis",
      "Global marketing exposure",
      "Qualified buyer screening",
    ],
  },
  {
    icon: <TrendingUp className="h-12 w-12 text-amber-500 dark:text-amber-400" />,
    title: "For Investors",
    description:
      "Identify lucrative investment opportunities with our market analysis, portfolio management, and wealth preservation strategies.",
    features: ["Market trend analysis", "ROI optimization", "Portfolio diversification", "Property management"],
  },
]

export default function OurServices() {
  return (
    <section id="services" className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-900 dark:text-zinc-100 mb-4">
            Our <span className="font-medium">Services</span>
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
            Comprehensive real estate services tailored to your unique needs and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-serif font-medium text-zinc-900 dark:text-zinc-100 mb-4">{service.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-8 flex-grow">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-amber-500 dark:text-amber-400 mr-2">•</span>
                    <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="mt-auto border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-zinc-900"
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

