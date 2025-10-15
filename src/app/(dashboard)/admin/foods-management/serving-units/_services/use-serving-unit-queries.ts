import { useServingUnitStore } from "../_libs/useServingUnitsStore";

import { getServingUnit, getServingUnits } from "./services";

import { useQuery } from "@tanstack/react-query";

const useServingUnits = () => {
  return useQuery({
    queryKey: ["servingUnits"],
    queryFn: getServingUnits,
  });
};

const useServingUnit = () => {
  const { selectedServingUnitId } = useServingUnitStore();

  return useQuery({
    queryKey: ["servingUnits", { selectedServingUnitId }],
    queryFn: () => getServingUnit(selectedServingUnitId!),
    enabled: !!selectedServingUnitId,
  });
};

export { useServingUnits, useServingUnit };
