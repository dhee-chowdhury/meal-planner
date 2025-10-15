"use client";

import { Button } from "@/components/ui/button";
import { useServingUnitStore } from "../_libs/useServingUnitsStore";
import { useServingUnits } from "../_services/use-serving-unit-queries";
import { Edit, Trash } from "lucide-react";
import { alert } from "@/lib/use-global-store";
import { useDeleteServingUnit } from "../_services/use-serving-unit-mutations";

const ServingUnitCards = () => {
  const { updateSelctedServingUnitId, updateServingUnitDialogOpen } = useServingUnitStore();

  const servingUnitsQuery = useServingUnits();
  const deleteServingUnitMutation = useDeleteServingUnit();

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {servingUnitsQuery.data?.map((item) => (
        <div key={item.id} className="flex flex-col justify-between gap-3 rounded-lg border p-6">
          <p className="truncate">{item.name}</p>
          <div className="flex gap-1">
            <Button
              className="size-6"
              variant="ghost"
              size="icon"
              onClick={() => {
                updateSelctedServingUnitId(item.id);
                updateServingUnitDialogOpen(true);
              }}
            >
              <Edit />
            </Button>
            <Button
              className="size-6"
              variant="ghost"
              size="icon"
              onClick={() => {
                alert({
                  onConfirm: () => deleteServingUnitMutation.mutate(item.id),
                });
              }}
            >
              <Trash />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { ServingUnitCards };
