import { patterns } from "@/lib/constants";
import { regexSchema, requiredStringSchema } from "@/lib/zodSchemas";
import { z } from "zod";

const foodSchema = z.intersection(
  z.object({
    name: requiredStringSchema,
    calories: regexSchema(patterns.zeroTo9999),
    protein: regexSchema(patterns.zeroTo9999),
    fat: regexSchema(patterns.zeroTo9999),
    carbohydrates: regexSchema(patterns.zeroTo9999),
    fiber: regexSchema(patterns.zeroTo9999),
    sugar: regexSchema(patterns.zeroTo9999),
    categoryId: requiredStringSchema,
    foodServingUnits: z.array(z.object({})),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update") }),
  ])
);

type Food = z.infer<typeof foodSchema>;

const foodDefaultValues: Food = {
  action: "create",
  foodServingUnits: [],
  name: "",
  categoryId: "",
  calories: "",
  carbohydrates: "",
  fat: "",
  protein: "",
  fiber: "",
  sugar: "",
};

export { foodSchema, type Food, foodDefaultValues };
