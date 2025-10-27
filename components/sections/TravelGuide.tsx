"use client";

import { useState } from "react";
import SectionWrapper from "@/components/sections/SectionWrapper";
import HeaderWithEditIcon from "@/components/shared/HeaderWithEditIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

type TravelGuideProps = {
  cityname?: string;
  fromDate?: number;
  toDate?: number;
  isLoading?: boolean;
};

export default function TravelGuide({
  cityname,
  fromDate,
  toDate,
  isLoading = false,
}: TravelGuideProps) {
  const [showLinks, setShowLinks] = useState(true);

  const handleToggleLinks = () => setShowLinks(!showLinks);

  if (isLoading) {
    return (
      <SectionWrapper id="travelguide">
        <HeaderWithEditIcon
          shouldShowEditIcon={false}
          handleToggleEditMode={() => {}}
          hasData={false}
          icon={<MapPin className="mr-2" />}
          title="Travel Guide"
          isLoading={true}
        />
        <div className="ml-8">
          <Skeleton className="w-full h-24" />
        </div>
      </SectionWrapper>
    );
  }

  if (!cityname || !fromDate || !toDate) {
    return (
      <SectionWrapper id="travelguide">
        <HeaderWithEditIcon
          shouldShowEditIcon={false}
          handleToggleEditMode={() => {}}
          hasData={false}
          icon={<MapPin className="mr-2" />}
          title="Travel Guide"
          isLoading={false}
        />
        <div className="ml-8 text-muted-foreground text-sm">
          Travel details are not available.
        </div>
      </SectionWrapper>
    );
  }

  const city = cityname.split(/[ ,]/)[0]?.trim() || "Unknown";
  const from = new Date(fromDate).toISOString().split("T")[0];
  const to = new Date(toDate).toISOString().split("T")[0];

  const wikilinks = `https://en.wikivoyage.org/wiki/${encodeURIComponent(city)}`;
  const hotelLinks = `https://www.kayak.com/hotels/${encodeURIComponent(
    city
  )}/${from}/${to};map?sort=rank_a`;

  return (
    <SectionWrapper id="travelguide">
      <HeaderWithEditIcon
        shouldShowEditIcon
        handleToggleEditMode={handleToggleLinks}
        hasData
        icon={<MapPin className="mr-2" />}
        title="Travel Guide"
        isLoading={false}
      />

      <div className="ml-8 flex flex-col gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span>
            {from} → {to}
          </span>
        </div>

        {showLinks && (
          <div className="flex gap-3 mt-2">
            <Button asChild variant="default" className="flex-1">
              <Link href={wikilinks} target="_blank" rel="noopener noreferrer">
                View Travel Guide
              </Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1">
              <Link href={hotelLinks} target="_blank" rel="noopener noreferrer">
                Find Hotels
              </Link>
            </Button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
