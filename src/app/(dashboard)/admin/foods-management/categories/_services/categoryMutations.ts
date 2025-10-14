"use server";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { Category } from "../_types/categorySchema";

const deleteCategory = async (id: number) => {
  return executeAction({
    actionFn: () => db.category.delete({ where: { id } }),
  });
};

const createCategory = async (data: Category) => {
  await executeAction({
    actionFn: () =>
      db.category.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateCategory = async (data: Category) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        db.category.update({
          where: {
            id: data.id,
          },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

export { deleteCategory, createCategory, updateCategory };
