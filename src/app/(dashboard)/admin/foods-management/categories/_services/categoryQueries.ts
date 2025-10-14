"use server";

import db from "@/lib/db";
import { Category } from "../_types/categorySchema";

const getCategories = async () => {
  return await db.category.findMany();
};

const getCategory = async (id: number): Promise<Category> => {
  const response = await db.category.findFirst({
    where: {
      id: id,
    },
  });
  return {
    action: "update",
    name: response?.name ?? "",
    id,
  };
};

export { getCategories, getCategory };
