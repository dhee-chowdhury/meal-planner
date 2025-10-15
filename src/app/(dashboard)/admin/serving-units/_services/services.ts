"use server";

import { ServingUnit } from "../_types/servingUnitSchema";

import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";

const createServingUnit = async (data: ServingUnit) => {
  await executeAction({
    actionFn: () =>
      db.servingUnit.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateServingUnit = async (data: ServingUnit) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        db.servingUnit.update({
          where: { id: data.id },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

const deleteServingUnit = async (id: number) => {
  await executeAction({
    actionFn: () => db.servingUnit.delete({ where: { id } }),
  });
};

const getServingUnits = async () => {
  return await db.servingUnit.findMany();
};

const getServingUnit = async (id: number): Promise<ServingUnit> => {
  const res = await db.servingUnit.findFirst({
    where: { id },
  });
  return {
    ...res,
    action: "update",
    name: res?.name ?? "",
    id,
  };
};

export { createServingUnit, getServingUnits, getServingUnit, deleteServingUnit, updateServingUnit };
