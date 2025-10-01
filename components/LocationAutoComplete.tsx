"use client";
import { Input } from "@/components/ui/input";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Loading } from "@/components/shared/Loading";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type LocationAutoCompletePropType = {
  planId: string;
  addNewPlaceToTopPlaces: (lat: number, lng: number, placeName: string) => void;
};

const LocationAutoComplete = ({
  planId,
  addNewPlaceToTopPlaces,
}: LocationAutoCompletePropType) => {
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updatePlaceToVisit = useMutation(api.plan.updatePlaceToVisit);

  const handleSelectItem = (e: MouseEvent<HTMLLIElement>, item: any) => {
    e.stopPropagation();
    setShowResults(false);
    setIsSaving(true);

    const { dismiss } = toast({
      description: `Adding the selected place!`,
    });

    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    const name = item.display_name;

    updatePlaceToVisit({
      placeName: name,
      lat,
      lng,
      planId: planId as Id<"plan">,
    }).then(() => {
      setSearchQuery("");
      setIsSaving(false);
      dismiss();
      addNewPlaceToTopPlaces(lat, lng, name);
    });
  };

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      setIsLoading(true);
      setShowResults(true);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching OSM results:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowResults(false);
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          disabled={isSaving}
          type="text"
          className="font-light h-12"
          placeholder="Search new location"
          onChange={handleSearch}
          value={searchQuery}
          onBlur={() => setShowResults(false)}
        />
        {isLoading ? (
          <div className="absolute right-3 top-0 h-full flex items-center">
            <Loading className="w-6 h-6" />
          </div>
        ) : (
          <div className="absolute right-3 top-0 h-full flex items-center">
            <Search className="w-4 h-4" />
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div
          className="absolute w-full mt-2 shadow-md rounded-xl p-1 bg-background max-h-80 overflow-auto z-50"
          onMouseDown={(e) => e.preventDefault()}
        >
          <ul className="w-full flex flex-col gap-2">
            {results.map((item) => (
              <li
                key={item.place_id}
                className="cursor-pointer border-b flex justify-between items-center hover:bg-muted hover:rounded-lg px-1 py-2 text-sm"
                onClick={(e) => handleSelectItem(e, item)}
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationAutoComplete;
