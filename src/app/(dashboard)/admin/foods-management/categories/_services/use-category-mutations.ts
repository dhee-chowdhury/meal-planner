import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "./categoryMutations";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await deleteCategory(id);
    },
    onSuccess: () => {
      // TODO: show a success toast
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export { useDeleteCategory };
