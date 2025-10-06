"use client";
import { useState } from "react";
import SectionWrapper from "@/components/sections/SectionWrapper";
import HeaderWithEditIcon from "@/components/shared/HeaderWithEditIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Wallet } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

type EstimatedBudgetProps = {
  estimatedBudget:
    | {
        min: number;
        max: number;
        currency?: string;
      }
    | undefined;
  planId: string;
  isLoading: boolean;
  allowEdit: boolean;
};

export default function EstimatedBudget({
  estimatedBudget,
  isLoading,
  planId,
  allowEdit,
}: EstimatedBudgetProps) {
  const [editMode, setEditMode] = useState(false);
  const [localBudget, setLocalBudget] = useState({
    min: estimatedBudget?.min ?? 0,
    max: estimatedBudget?.max ?? 0,
    currency: estimatedBudget?.currency ?? "INR",
  });

  const updateEstimatedBudget = useMutation(api.plan.updateEstimatedBudget);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    await updateEstimatedBudget({
      planId: planId as Doc<"plan">["_id"],
      min: Number(localBudget.min),
      max: Number(localBudget.max),
      currency: localBudget.currency,
    });
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <SectionWrapper id="estimatedBudget">
        <Skeleton className="w-full h-[120px]" />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="estimatedBudget">
      <HeaderWithEditIcon
        shouldShowEditIcon={!editMode && allowEdit}
        handleToggleEditMode={handleToggleEditMode}
        hasData={!!estimatedBudget}
        icon={<Wallet className="mr-2" />}
        title="Estimated Budget"
        isLoading={isLoading}
      />

      <div className="ml-8 mt-3">
        {editMode ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">Minimum</label>
                <Input
                  type="number"
                  value={localBudget.min}
                  onChange={(e) =>
                    setLocalBudget((p) => ({
                      ...p,
                      min: Number(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">Maximum</label>
                <Input
                  type="number"
                  value={localBudget.max}
                  onChange={(e) =>
                    setLocalBudget((p) => ({
                      ...p,
                      max: Number(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium">Currency</label>
                <Input
                  type="text"
                  value={localBudget.currency}
                  onChange={(e) =>
                    setLocalBudget((p) => ({
                      ...p,
                      currency: e.target.value.toUpperCase(),
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>Save</Button>
              <Button
                variant="outline"
                onClick={handleToggleEditMode}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-gray-800 dark:text-gray-200">
            <p className="text-lg font-semibold">
              {estimatedBudget
                ? `${estimatedBudget.currency ?? "INR"} ${estimatedBudget.min.toLocaleString()} - ${estimatedBudget.currency ?? "INR"} ${estimatedBudget.max.toLocaleString()}`
                : "No budget set yet"}
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
