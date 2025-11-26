"use client"

import { motion } from "framer-motion"
import { Plane, Compass, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const destinations = [
  { name: "Paris", country: "France", image: "/paris-eiffel-tower.png", delay: 0 },
  { name: "Tokyo", country: "Japan", image: "/tokyo-skyline-night.png", delay: 0.1 },
  { name: "Bali", country: "Indonesia", image: "/bali-tropical-beach.jpg", delay: 0.2 },
  { name: "New York", country: "USA", image: "/new-york-statue-liberty.jpg", delay: 0.3 },
  { name: "Santorini", country: "Greece", image: "/santorini-blue-domes.jpg", delay: 0.4 },
]

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

export function Banner() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Gradient spotlight background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#3B82F6]/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/4 h-[280px] w-[280px] rounded-full bg-[#CA8A04]/5 blur-3xl" />
      </div>

      {/* Animated travel elements */}
      <motion.div
        className="absolute left-[10%] top-[15%] text-[#3B82F6]/30"
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{
          rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      >
        <Compass className="h-16 w-16" />
      </motion.div>

      <motion.div
        className="absolute right-[15%] top-[20%] text-[#CA8A04]/40"
        animate={{ x: [0, 100, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Plane className="h-10 w-10 rotate-45" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-[#CA8A04]" />
            <span className="text-sm font-medium text-[#6B7280]">Powered by Advanced AI</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-4xl text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Your Perfect Trip,{" "}
            <span className="relative">
              <span className="text-[#3B82F6]">AI</span>
              <motion.span
                className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-[#CA8A04]"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </span>
            -Crafted
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6B7280] sm:text-xl"
          >
            Tell us your dreams, and our AI creates personalized itineraries tailored to your style, budget, and
            interests. Adventure awaits.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-[#3B82F6] px-8 py-6 text-lg font-semibold text-white hover:bg-[#3B82F6]/90"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Planning
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-[#CA8A04]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </div>

        {/* Circular composition with destination cards */}
        <div className="relative mt-28 flex items-center justify-center pt-16 sm:mt-32 sm:pt-24">
          {/* Central globe/map element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border-2 border-[#3B82F6]/20 bg-gradient-to-br from-[#3B82F6]/10 to-transparent sm:h-56 sm:w-56"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-dashed border-[#3B82F6]/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-dashed border-[#CA8A04]/30"
            />
            <div className="flex flex-col items-center gap-2">
              <MapPin className="h-10 w-10 text-[#3B82F6]" />
              <span className="text-sm font-medium text-[#6B7280]">Explore</span>
            </div>
          </motion.div>

          {/* Floating destination cards arranged in a circle */}
          {destinations.map((destination, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180)
            const radius = 150
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + destination.delay }}
                className="absolute hidden sm:block"
                style={{ left: `calc(50% + ${x}px - 60px)`, top: `calc(50% + ${y}px - 40px)` }}
              >
                <motion.div
                  animate={{
                    y: floatingAnimation.y,
                  }}
                  transition={{
                    duration: floatingAnimation.transition.duration,
                    repeat: floatingAnimation.transition.repeat,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.1, y: -15 }}
                  className="group cursor-pointer rounded-2xl border border-border bg-card p-3 shadow-lg transition-shadow hover:shadow-xl"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-1 left-2 right-2">
                      <p className="text-xs font-semibold text-white">{destination.name}</p>
                      <p className="text-[10px] text-white/70">{destination.country}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile destination cards - horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 flex gap-4 overflow-x-auto pb-4 sm:hidden"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.name}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 rounded-2xl border border-border bg-card p-3 shadow-lg"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-xl">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs font-semibold text-white">{destination.name}</p>
                  <p className="text-[10px] text-white/70">{destination.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-8 border-t border-border pt-12"
        >
          {[
            { value: "50K+", label: "Trips Planned" },
            { value: "120+", label: "Countries" },
            { value: "4.9★", label: "User Rating" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl font-bold text-[#3B82F6] sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-[#6B7280]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
