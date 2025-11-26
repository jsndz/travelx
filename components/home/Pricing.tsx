"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useState, useRef } from "react"
import { Check, MapPinned, Sailboat, Palette, Castle, PersonStanding, ShoppingBag, MoonStar } from "lucide-react"
import { features } from "@/lib/constants"

const ACTIVITY_PREFERENCES = [
  { id: "sightseeing", displayName: "Sightseeing", icon: MapPinned },
  { id: "adventure", displayName: "Adventure", icon: Sailboat },
  { id: "culturalexperiences", displayName: "Cultural Experiences", icon: Palette },
  { id: "historical", displayName: "Historical", icon: Castle },
  { id: "relaxationwellness", displayName: "Relaxation", icon: PersonStanding },
  { id: "shopping", displayName: "Shopping", icon: ShoppingBag },
  { id: "nightlife", displayName: "Nightlife", icon: MoonStar },
]

// Your original pricing values
const PRICING_PLANS = [
  {
    id: "free",
    name: "Free Plan",
    credits: "1 Credit",
    oldPrice: 100,
    newPrice: 0,
    features,
    subtext: "No subscription. Just start exploring.",
    popular: false,
    gradient: "from-card to-muted",
  },
  {
    id: "paid",
    name: "Paid Plan",
    credits: "5 Credits",
    oldPrice: 400,
    newPrice: 80,
    features,
    subtext: "One-time payment. No subscription.",
    popular: true,
    gradient: "from-card to-muted",
  },
]

function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onViewportEnter={() => {
        const start = 0
        const duration = 1000
        const startTime = Date.now()
        const tick = () => {
          const now = Date.now()
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplayValue(Math.floor(eased * value))
          if (progress < 1) requestAnimationFrame(tick)
        }
        tick()
      }}
    >
      ₹{displayValue}
    </motion.span>
  )
}

function NewPricingCard({
  plan,
  index,
}: {
  plan: (typeof PRICING_PLANS)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 })

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set(e.clientX - (rect.left + rect.width / 2))
    y.set(e.clientY - (rect.top + rect.height / 2))
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 120, damping: 22, delay: index * 0.15 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onLeave}
      className="relative perspective-1000"
    >
      {/* Glow */}
      <motion.div
        className={`absolute -inset-1 rounded-3xl bg-blue-500/20 blur-xl ${plan.popular ? "opacity-60" : "opacity-0"}`}
        animate={{ opacity: isHovered ? 0.9 : plan.popular ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card content */}
      <motion.div
        className={`relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${plan.gradient} p-8 shadow-xl dark:shadow-none backdrop-blur-sm`}
        animate={{ y: isHovered ? -12 : 0, scale: isHovered ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
      >
        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute top-4 right-4 rounded-full bg-blue-500 px-4 py-1 text-xs font-semibold text-white shadow-md">
            Most Popular
          </div>
        )}

        {/* Header */}
        <div className="mb-6" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-2xl font-bold text-blue-500">{plan.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{plan.credits}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-6" style={{ transform: "translateZ(20px)" }}>
          <span className="text-lg text-muted-foreground line-through">₹{plan.oldPrice}</span>
          <span className="text-5xl font-bold">
            <AnimatedCounter value={plan.newPrice} />
          </span>
        </div>

        {/* Features */}
        <ul className="mb-8 space-y-3" style={{ transform: "translateZ(10px)" }}>
          {plan.features.map((f, i) => (
            <motion.li
              key={i}
              className="flex items-center gap-3 text-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Check className="h-4 w-4 text-blue-600" />
              {f}
            </motion.li>
          ))}
        </ul>

        {/* Activity Icons */}
        <div className="mb-6 grid grid-cols-4 gap-3">
          {ACTIVITY_PREFERENCES.slice(0, 4).map((act, i) => (
            <motion.div
              key={act.id}
              whileHover={{ scale: 1.15 }}
              className="flex flex-col items-center rounded-xl bg-blue-500/10 p-3"
            >
              <act.icon className="h-5 w-5 text-blue-600" />
              <span className="mt-1 text-xs text-muted-foreground">{act.displayName}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          className={`w-full rounded-xl py-4 font-semibold transition ${
            plan.popular ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-card hover:bg-muted"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started
        </motion.button>

        <p className="mt-4 text-center text-xs text-muted-foreground">{plan.subtext}</p>
      </motion.div>
    </motion.div>
  )
}

export function Pricing() {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-blue-500 font-bold text-lg tracking-wider">Pricing</h2>
          <h3 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">Make Your Travel Plan Today</h3>
        </div>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-2">
          {PRICING_PLANS.map((plan, i) => (
            <NewPricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
