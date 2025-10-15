import { createStore } from "@/lib/createStore";

type State = {
  selectedServingUnitId: number | null;
  servingUnitDialogOpen: boolean;
};

type Actions = {
  updateSelctedServingUnitId: (id: State["selectedServingUnitId"]) => void;
  updateServingUnitDialogOpen: (is: State["servingUnitDialogOpen"]) => void;
};

type Store = State & Actions;

const useSrvingUnitStore = createStore<Store>(
  (set) => ({
    selectedServingUnitId: null,
    updateSelctedServingUnitId: (id) =>
      set((state) => {
        state.selectedServingUnitId = id;
      }),
    servingUnitDialogOpen: false,
    updateServingUnitDialogOpen: (is) =>
      set((state) => {
        state.servingUnitDialogOpen = is;
      }),
  }),
  {
    name: "serving-units-store",
  }
);
