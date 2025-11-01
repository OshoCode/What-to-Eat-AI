import Image from "next/image"
import { MapPin, Leaf, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-[#2A5D3C] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sp-1.jpg"
            alt="Mountain landscape"
            fill
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e4a2e] to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
              Est. 2010
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">About OutdoorGear</h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-[#4CAF50]"></div>
              <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
              <div className="w-12 h-0.5 bg-[#4CAF50]"></div>
            </div>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Our story, mission, and commitment to providing quality outdoor equipment for all your adventures.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                OutdoorGear was founded in 2010 by a group of passionate outdoor enthusiasts who were frustrated with
                the quality and durability of available equipment. What started as a small workshop creating custom
                backpacks has grown into a comprehensive outdoor retailer with a commitment to quality, sustainability,
                and adventure.
              </p>
              <p className="text-gray-600 mb-4">
                Our founders, Alex and Jamie, met on a challenging trek through the Rockies where both experienced
                equipment failures that cut their trip short. They decided then and there that outdoor enthusiasts
                deserved better gear – equipment that wouldn't just survive the elements but would enhance the outdoor
                experience.
              </p>
              <p className="text-gray-600">
                Today, OutdoorGear serves adventurers across the country with retail locations in 12 states and a robust
                online presence. We remain committed to our founding principles: exceptional quality, environmental
                responsibility, and making the outdoors accessible to everyone.
              </p>
            </div>
            <div className="md:w-1/2 relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="OutdoorGear founders"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at OutdoorGear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition duration-300">
              <div className="bg-[#2A5D3C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Without Compromise</h3>
              <p className="text-gray-600">
                We rigorously test all our products in real-world conditions and stand behind everything we sell with
                our lifetime warranty.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition duration-300">
              <div className="bg-[#2A5D3C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Environmental Stewardship</h3>
              <p className="text-gray-600">
                We're committed to sustainable practices, from using recycled materials to reducing our carbon footprint
                and supporting conservation efforts.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition duration-300">
              <div className="bg-[#2A5D3C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Connection</h3>
              <p className="text-gray-600">
                We believe in giving back to the outdoor community through education programs, trail maintenance, and
                making outdoor activities accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The passionate individuals who make OutdoorGear possible.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
              <div className="relative h-64">
                <Image src="/placeholder.svg?height=400&width=400" alt="Alex Thompson" fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">Alex Thompson</h3>
                <p className="text-[#4CAF50] font-medium">Co-Founder & CEO</p>
                <p className="text-gray-600 mt-2 text-sm">
                  Former mountain guide with 15+ years of experience in the outdoor industry.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
              <div className="relative h-64">
                <Image src="/placeholder.svg?height=400&width=400" alt="Jamie Rivera" fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">Jamie Rivera</h3>
                <p className="text-[#4CAF50] font-medium">Co-Founder & Head of Product</p>
                <p className="text-gray-600 mt-2 text-sm">
                  Product designer with a background in materials engineering and a passion for sustainable design.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
              <div className="relative h-64">
                <Image src="/placeholder.svg?height=400&width=400" alt="Sarah Chen" fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">Sarah Chen</h3>
                <p className="text-[#4CAF50] font-medium">Chief Sustainability Officer</p>
                <p className="text-gray-600 mt-2 text-sm">
                  Environmental scientist leading our sustainability initiatives and community partnerships.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
              <div className="relative h-64">
                <Image src="/placeholder.svg?height=400&width=400" alt="Michael Okafor" fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg">Michael Okafor</h3>
                <p className="text-[#4CAF50] font-medium">Head of Customer Experience</p>
                <p className="text-gray-600 mt-2 text-sm">
                  Outdoor educator focused on creating exceptional experiences for our customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit us at one of our retail stores for personalized advice and to experience our products firsthand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <MapPin className="h-6 w-6 text-[#2A5D3C] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Denver, CO - Flagship Store</h3>
                  <p className="text-gray-600">
                    1234 Mountain View Dr
                    <br />
                    Denver, CO 80202
                    <br />
                    (303) 555-1234
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Hours:</span> Mon-Sat 9am-8pm, Sun 10am-6pm
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <MapPin className="h-6 w-6 text-[#2A5D3C] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Portland, OR</h3>
                  <p className="text-gray-600">
                    567 Forest Avenue
                    <br />
                    Portland, OR 97205
                    <br />
                    (503) 555-6789
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Hours:</span> Mon-Sat 9am-8pm, Sun 10am-6pm
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <MapPin className="h-6 w-6 text-[#2A5D3C] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Seattle, WA</h3>
                  <p className="text-gray-600">
                    890 Rainier Street
                    <br />
                    Seattle, WA 98101
                    <br />
                    (206) 555-4321
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Hours:</span> Mon-Sat 9am-8pm, Sun 10am-6pm
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <MapPin className="h-6 w-6 text-[#2A5D3C] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Boulder, CO</h3>
                  <p className="text-gray-600">
                    432 Flatiron Way
                    <br />
                    Boulder, CO 80301
                    <br />
                    (303) 555-8765
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Hours:</span> Mon-Sat 9am-8pm, Sun 10am-6pm
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <MapPin className="h-6 w-6 text-[#2A5D3C] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Salt Lake City, UT</h3>
                  <p className="text-gray-600">
                    789 Canyon Road
                    <br />
                    Salt Lake City, UT 84101
                    <br />
                    (801) 555-2468
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Hours:</span> Mon-Sat 9am-8pm, Sun 10am-6pm
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <MapPin className="h-6 w-6 text-[#2A5D3C] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Austin, TX</h3>
                  <p className="text-gray-600">
                    321 Greenbelt Drive
                    <br />
                    Austin, TX 78701
                    <br />
                    (512) 555-1357
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Hours:</span> Mon-Sat 9am-8pm, Sun 10am-6pm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
