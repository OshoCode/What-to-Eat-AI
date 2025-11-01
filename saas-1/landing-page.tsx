import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ChevronRight, LineChart, MessageSquare, Shield, Star, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span className="text-xl text-yellow-500 font-bold">StreamLine</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-yellow-500">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-yellow-500">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-yellow-500">
              Pricing
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-yellow-500">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" className="hidden text-sm font-medium transition-colors hover:text-yellow-500 sm:block">
              Sign In
            </Link>
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              Get Started
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Workflow Like Never Before
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Boost productivity, reduce overhead, and focus on what matters most with our all-in-one platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600">
                    Start Free Trial
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Demo
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=32&width=32&text=${i}`}
                          alt="User"
                          width={32}
                          height={32}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-muted-foreground">
                    Trusted by <span className="font-medium text-foreground">2,000+</span> companies
                  </div>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550&text=Platform+Screenshot"
                width={550}
                height={550}
                alt="StreamLine Dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-yellow-500 px-3 py-1 text-sm text-yellow-950">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need in One Place</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our platform provides all the tools you need to manage your business efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <LineChart className="h-10 w-10 text-yellow-500" />
                  <CardTitle className="mt-4">Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gain valuable insights with our powerful analytics tools. Track performance and make data-driven
                    decisions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-yellow-500" />
                  <CardTitle className="mt-4">Enterprise Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Keep your data safe with our enterprise-grade security features. We prioritize your privacy.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-yellow-500" />
                  <CardTitle className="mt-4">Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Work together seamlessly with integrated communication tools and real-time collaboration features.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-yellow-500 px-3 py-1 text-sm text-yellow-950">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Don't just take our word for it. Here's what our customers have to say about StreamLine.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Alex Johnson",
                  role: "CTO, TechCorp",
                  content:
                    "StreamLine has transformed how our team works. The analytics features alone have saved us countless hours of manual work.",
                },
                {
                  name: "Sarah Williams",
                  role: "Marketing Director, GrowthLabs",
                  content:
                    "I can't imagine running our marketing campaigns without StreamLine. The collaboration tools are intuitive and powerful.",
                },
                {
                  name: "Michael Chen",
                  role: "Founder, StartupX",
                  content:
                    "As a startup founder, I need tools that scale with my business. StreamLine has been the perfect solution for our growing team.",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="relative overflow-hidden">
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=48&width=48&text=${testimonial.name.charAt(0)}`}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-base">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="relative">
                      <Star className="absolute -left-1 -top-1 h-6 w-6 text-yellow-500 opacity-20" />
                      <p className="pl-4 italic text-muted-foreground">{testimonial.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-yellow-500 px-3 py-1 text-sm text-yellow-950">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for you and start streamlining your workflow today.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              {[
                {
                  title: "Starter",
                  price: "$29",
                  description: "Perfect for individuals and small teams just getting started.",
                  features: ["Up to 5 team members", "Basic analytics", "24/7 support", "1GB storage"],
                  cta: "Get Started",
                  popular: false,
                },
                {
                  title: "Professional",
                  price: "$79",
                  description: "Ideal for growing teams that need more power and flexibility.",
                  features: [
                    "Up to 20 team members",
                    "Advanced analytics",
                    "Priority support",
                    "10GB storage",
                    "Custom integrations",
                  ],
                  cta: "Get Started",
                  popular: true,
                },
                {
                  title: "Enterprise",
                  price: "$149",
                  description: "For large organizations with advanced needs and dedicated support.",
                  features: [
                    "Unlimited team members",
                    "Enterprise analytics",
                    "Dedicated support",
                    "Unlimited storage",
                    "Custom development",
                    "SLA guarantees",
                  ],
                  cta: "Contact Sales",
                  popular: false,
                },
              ].map((plan, i) => (
                <Card key={i} className={plan.popular ? "border-yellow-500 shadow-lg" : ""}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-yellow-500 px-3 py-1 text-xs font-medium text-yellow-950">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="flex flex-col items-center justify-center space-y-1">
                    <CardTitle className="text-xl">{plan.title}</CardTitle>
                    <div className="flex items-baseline text-center">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <CardDescription className="text-center">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center space-y-4">
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-yellow-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${plan.popular ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of satisfied customers who are already streamlining their workflow.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600">
                  Start Your Free Trial
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">No credit card required. 14-day free trial.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                <span className="text-xl font-bold">StreamLine</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Streamline your workflow and boost productivity with our all-in-one platform.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} StreamLine, Inc. All rights reserved.
            </p>
            <div className="flex gap-4">
              {["Twitter", "GitHub", "LinkedIn", "Facebook"].map((social) => (
                <Link key={social} href="#" className="text-muted-foreground transition-colors hover:text-yellow-500">
                  <span className="sr-only">{social}</span>
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <Image
                      src={`/placeholder.svg?height=24&width=24&text=${social.charAt(0)}`}
                      alt={social}
                      width={24}
                      height={24}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

