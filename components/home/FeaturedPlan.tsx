"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Heart, ArrowRight } from "lucide-react";

export default function FeaturedPlan({ plan }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="relative z-10 w-full max-w-md cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-3xl bg-card shadow-2xl shadow-[#3B82F6]/10">
        <motion.div className="absolute left-4 top-4 rounded-full bg-[#3B82F6] px-3 py-1 text-xs text-white">
          ✨ Featured
        </motion.div>

        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={plan.image}
            alt={plan.title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        <div className="p-6">

          <div className="mt-2 flex items-center gap-2 text-[#3B82F6]">
            <MapPin className="size-4" />
            <span>{plan.destination}</span>
          </div>

          <div className="mt-4 flex justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="size-4" />
              {plan.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-4" />
              {plan.travelers}
            </span>
            <span className="flex items-center gap-1 text-rose-500">
              <Heart className="size-4 fill-current" />
              {plan.likes}
            </span>
          </div>

        
        </div>
      </div>
    </motion.div>
  );
}
