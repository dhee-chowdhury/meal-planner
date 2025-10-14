import { CircleOff } from "lucide-react";
import { Button } from "./ui/button";

type NoItemsFoundProps = {
  name?: string;
  onClick: () => void;
};

const NoItemsFound = ({ name, onClick }: NoItemsFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <CircleOff className="text-primary mb-2" />
      <h3 className="text-lg font-medium">No {name ? name + "(s)" : "item(s)"} found</h3>
      <Button variant="outline" className="mt-4" onClick={onClick}>
        Add new {name ? name : "item"}
      </Button>
    </div>
  );
};

export { NoItemsFound };
