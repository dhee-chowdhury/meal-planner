"use server";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";

const deleteCategory = async (id: number) => {
  return executeAction({
    actionFn: () => db.category.delete({ where: { id } }),
  });
};

export { deleteCategory };
