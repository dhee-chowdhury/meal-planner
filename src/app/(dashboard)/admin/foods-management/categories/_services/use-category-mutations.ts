import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "./categoryMutations";

const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      await deleteCategory(id);
    },
    onSuccess: () => {
      // TODO: show a success toast
    },
  });
};

export { useDeleteCategory };
