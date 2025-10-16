"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ServingUnit,
  servingUnitDefaultValues,
  servingUnitSchema,
} from "../_types/servingUnitSchema";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServingUnitStore } from "../_libs/useServingUnitsStore";
import { useServingUnit } from "../_services/use-serving-unit-queries";
import {
  useCreateServingUnit,
  useUpdateServingUnit,
} from "../_services/use-serving-unit-mutations";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ControlledInput } from "@/components/ui/controlled-input";

type ServingUnitFormDialogProps = {
  smallTrigger?: boolean;
};

const ServingUnitFormDialog = ({ smallTrigger }: ServingUnitFormDialogProps) => {
  const form = useForm<ServingUnit>({
    defaultValues: servingUnitDefaultValues,
    resolver: zodResolver(servingUnitSchema),
  });

  const {
    selectedServingUnitId,
    updateSelectedServingUnitId,
    servingUnitDialogOpen,
    updateServingUnitDialogOpen,
  } = useServingUnitStore();

  const servingUnitQuery = useServingUnit();
  const createServingUnitMutation = useCreateServingUnit();
  const updateServingUnitMutation = useUpdateServingUnit();

  useEffect(() => {
    if (selectedServingUnitId && servingUnitQuery.data) {
      form.reset(servingUnitQuery.data);
    }
  }, [selectedServingUnitId, servingUnitQuery.data, form]);

  const handleDialgoOpenChange = (open: boolean) => {
    updateServingUnitDialogOpen(open);
    if (!open) {
      updateSelectedServingUnitId(null);
      form.reset(servingUnitDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialgoOpenChange(false);
  };

  const onSubmit: SubmitHandler<ServingUnit> = (data) => {
    if (data.action === "create") {
      createServingUnitMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateServingUnitMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    }
  };

  const isPending = createServingUnitMutation.isPending || updateServingUnitMutation.isPending;

  return (
    <Dialog open={servingUnitDialogOpen} onOpenChange={handleDialgoOpenChange}>
      <DialogTrigger asChild>
        {smallTrigger ? (
          <Button size="icon" variant="ghost" type="button">
            <Plus />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2" />
            New Serving Unit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedServingUnitId ? "Edit Serving Unit" : "Create a New Serving Unit"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormProvider {...form}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <ControlledInput<ServingUnit>
                  name="name"
                  label="Name"
                  placeholder="Enter serving unit name"
                />
              </div>
            </div>
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              {!!selectedServingUnitId ? "Update" : "Create"} Serving Unit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { ServingUnitFormDialog };
