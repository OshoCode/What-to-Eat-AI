import { Shield, Award, Gem, Users } from "lucide-react"

const benefits = [
  {
    icon: <Shield className="h-10 w-10 text-amber-500 dark:text-amber-400" />,
    title: "Exclusive Listings",
    description: "Access to off-market properties and exclusive listings not available to the general public.",
  },
  {
    icon: <Award className="h-10 w-10 text-amber-500 dark:text-amber-400" />,
    title: "Expert Advisors",
    description: "Our team of seasoned professionals brings decades of experience in luxury real estate markets.",
  },
  {
    icon: <Gem className="h-10 w-10 text-amber-500 dark:text-amber-400" />,
    title: "Personalized Service",
    description: "Tailored approach to meet your specific needs with white-glove service from start to finish.",
  },
  {
    icon: <Users className="h-10 w-10 text-amber-500 dark:text-amber-400" />,
    title: "Global Network",
    description: "Extensive international connections providing access to premium properties worldwide.",
  },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-900 dark:text-zinc-100 mb-4">
            Why <span className="font-medium">Choose Us</span>
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
            We deliver an unparalleled experience in luxury real estate, combining market expertise with personalized
            service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-8 text-center bg-zinc-50 dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/30 mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-serif font-medium text-zinc-900 dark:text-zinc-100 mb-3">{benefit.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

