import {
  Dialog as DD,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

const DelDialog = ({ handleDelete, data }: any) => {
  return (
    <DD>
      <DialogTrigger>
        <TrashIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action can't be undone!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={async (e) => {
              e.preventDefault();
              handleDelete(data);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </DD>
  );
};

export default DelDialog;
