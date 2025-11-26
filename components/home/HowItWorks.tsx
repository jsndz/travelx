"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { LogIn, Lightbulb, MapPin, Sparkles } from "lucide-react"

const steps = [
  {
    icon: LogIn,
    title: "Sign In",
    description: "Create your account in seconds and unlock personalized travel planning.",
  },
  {
    icon: Lightbulb,
    title: "Share Your Dream",
    description: "Tell us where you want to go and what experiences you're seeking.",
  },
  {
    icon: Sparkles,
    title: "AI Magic",
    description: "Our AI crafts a custom itinerary tailored to your preferences.",
  },
  {
    icon: MapPin,
    title: "Start Exploring",
    description: "Receive your complete travel plan and begin your adventure.",
  },
]

export function HowItWorks() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section className="bg-background py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">How It Works</h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto text-pretty">
            Your perfect trip is just four simple steps away
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Animated connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2">
            <motion.div
              className="w-full bg-[#3B82F6] origin-top"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className={`relative flex items-center gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-[#E5E7EB] dark:bg-muted rounded-2xl p-6 md:p-8 shadow-sm"
                    >
                      {/* Mobile icon */}
                      <div className="md:hidden mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#3B82F6] flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Center Node - Desktop only */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        delay: 0.5 + index * 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="relative"
                    >
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#3B82F6]"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.4, 0, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.3,
                        }}
                      />
                      {/* Icon container */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-16 h-16 rounded-full bg-[#3B82F6] flex items-center justify-center shadow-lg shadow-[#3B82F6]/30"
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
