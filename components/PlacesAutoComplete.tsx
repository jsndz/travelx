"use client";
import { Input } from "@/components/ui/input";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import { Loading } from "@/components/shared/Loading";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { formSchemaType } from "@/components/NewPlanForm";

type PlacesAutoCompleteProps = {
  selectedFromList: boolean;
  setSelectedFromList: Dispatch<SetStateAction<boolean>>;
  form: UseFormReturn<formSchemaType, any, undefined>;
  field: ControllerRenderProps<formSchemaType, "placeName">;
};

const PlacesAutoComplete = ({
  form,
  field,
  selectedFromList,
  setSelectedFromList,
}: PlacesAutoCompleteProps) => {
  const [showResults, setShowResults] = useState(false);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isEnglish = (text: string) => /^[A-Za-z0-9\s,.-]+$/.test(text);

  const handleSelectItem = (
    e: MouseEvent<HTMLLIElement>,
    description: string
  ) => {
    e.stopPropagation();
    form.clearErrors("placeName");

    setShowResults(false);
    setSelectedFromList(true);

    form.setValue("placeName", description);
  };

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    field.onChange(value);

    if (!value) {
      setShowResults(false);
      setPredictions([]);
      return;
    }

    if (!isEnglish(value)) {
      form.setError("placeName", {
        message: "This tool supports only English as input as of now.",
        type: "custom",
      });
      return;
    }

    if (selectedFromList) {
      form.setError("placeName", {
        message: "Place should be selected from the list",
        type: "custom",
      });
      setSelectedFromList(false);
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(
          value
        )}`
      );
      const data = await res.json();
      setPredictions(data);
      setShowResults(true);
    } catch (err) {
      console.error("Error fetching from OSM:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for your destination city..."
          onChange={handleSearch}
          onBlur={() => setShowResults(false)}
          value={field.value}
        />
        {loading && (
          <div className="absolute right-3 top-0 h-full flex items-center">
            <Loading className="w-6 h-6" />
          </div>
        )}
      </div>
      {showResults && predictions.length > 0 && (
        <div
          className="absolute w-full mt-2 shadow-md rounded-xl p-1 bg-background max-h-80 overflow-auto z-50"
          onMouseDown={(e) => e.preventDefault()}
        >
          <ul
            className="w-full flex flex-col gap-2"
            onMouseDown={(e) => e.preventDefault()}
          >
            {predictions.map((item) => (
              <li
                key={item.place_id}
                className="cursor-pointer border-b flex justify-between items-center hover:bg-muted hover:rounded-lg px-1 py-2 text-sm"
                onClick={(e) =>
                  handleSelectItem(
                    e,
                    item.display_name // OSM returns full address string
                  )
                }
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

export default PlacesAutoComplete;
