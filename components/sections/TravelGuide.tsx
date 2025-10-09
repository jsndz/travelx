"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TravelGuideProps {
  cityname?: string;
  fromDate?: number;
  toDate?: number;
}

const TravelGuide = ({ cityname, fromDate, toDate }: TravelGuideProps) => {
  if (!cityname || !fromDate || !toDate) {
    return (
      <Card className="max-w-md mx-auto mt-10 border-border/40 bg-background/70 backdrop-blur-md shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-center">
            Loading travel guide...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  // Extract city safely
  const city = cityname.split(/[ ,]/)[0]?.trim() || "Unknown";

  // Convert timestamps
  const from = new Date(fromDate).toISOString().split("T")[0];
  const to = new Date(toDate).toISOString().split("T")[0];

  const wikilinks = `https://en.wikivoyage.org/wiki/${encodeURIComponent(city)}`;
  const hotelLinks = `https://www.kayak.com/hotels/${encodeURIComponent(
    city
  )}/${from}/${to};map?sort=rank_a`;

  return (
    <Card
      className={cn(
        "max-w-md mx-auto mt-10 border-border/40 bg-background/70 backdrop-blur-md shadow-md rounded-2xl transition-all hover:shadow-lg"
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <MapPin className="w-5 h-5 text-primary" />
          {city}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span>
            {from} → {to}
          </span>
        </div>
        <div className="flex gap-3 mt-3">
          <Button asChild variant="default" className="flex-1">
            <Link href={wikilinks} target="_blank" rel="noopener noreferrer">
              Travel Guide
            </Link>
          </Button>
          <Button asChild variant="secondary" className="flex-1">
            <Link href={hotelLinks} target="_blank" rel="noopener noreferrer">
              Hotels
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelGuide;
