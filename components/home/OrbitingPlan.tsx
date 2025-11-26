"use client";

import { motion } from "framer-motion";
import { MapPin, Heart } from "lucide-react";
import { useState } from "react";

const floatingPositions = [
  { x: -280, y: -120, rotate: -8, scale: 0.75 },
  { x: 260, y: -140, rotate: 6, scale: 0.7 },
  { x: -300, y: 140, rotate: 4, scale: 0.72 },
  { x: 280, y: 120, rotate: -5, scale: 0.68 },
];

export default function OrbitingPlan({ plan, index }: any) {
  const [hovered, setHovered] = useState(false);

  const pos = floatingPositions[index] || floatingPositions[0];

  return (
    <motion.div
      className="absolute hidden lg:block"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{
        opacity: 1,
        x: pos.x,
        y: pos.y,
        scale: pos.scale,
        rotate: pos.rotate,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        delay: 0.2 + index * 0.15,
        type: "spring",
      }}
      animate={
        hovered
          ? { scale: 0.9, zIndex: 20 }
          : {
              y: [pos.y, pos.y - 10, pos.y],
              transition: {
                type: "keyframes",
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }
      }
      whileHover={{ scale: 0.9, rotate: 0, zIndex: 30 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="relative w-56 rounded-2xl overflow-hidden bg-card shadow-xl hover:shadow-[#3B82F6]/20">
        <div className="relative h-32 overflow-hidden">
          <img
            src={plan.image}
            className="h-full w-full object-cover"
            alt={plan.title}
          />
        </div>

        <div className="p-3">
          <p className="text-xs flex items-center gap-1 text-[#3B82F6]">
            <MapPin className="size-3" />
            {plan.destination}
          </p>

          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{plan.duration}</span>
            <span className="flex items-center gap-1 text-rose-500">
              <Heart className="size-3 fill-current" />
              {plan.likes}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
