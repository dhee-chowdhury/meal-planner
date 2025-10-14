"use client";
import { useCategories } from "@/app/(dashboard)/admin/foods-management/categories/_services/use-category-queries";
import { useDeleteCategory } from "@/app/(dashboard)/admin/foods-management/categories/_services/use-category-mutations";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { alert } from "@/lib/use-global-store";
import { useCategoriesStore } from "../_libs/use-category-store";
import { CategoryCardsSkeleton } from "./category-cards-skeleton";

const CategoryCards = () => {
  const categoriesQuery = useCategories();
  const deleteCategoryMutation = useDeleteCategory();

  const { updateSelectedCategoryId, updateCategoryDialogOpen } = useCategoriesStore();

  return (
    <div className="grid grid-cols-4 gap-2">
      {!!categoriesQuery.isLoading && <CategoryCardsSkeleton />}
      {categoriesQuery.data?.map((item) => (
        <div
          key={item.id}
          className="bg-accent flex flex-col justify-between gap-3 rounded-lg p-6 shadow-md"
        >
          <p className="truncate">{item.name}</p>
          <div className="flex gap-1">
            <Button
              className="size-6"
              variant="ghost"
              size="icon"
              onClick={() => {
                updateSelectedCategoryId(item.id);
                updateCategoryDialogOpen(true);
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
                  onConfirm: () => deleteCategoryMutation.mutate(item.id),
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

export { CategoryCards };
