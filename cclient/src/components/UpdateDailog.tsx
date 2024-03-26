import {
  Dialog as DD,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { UpdateIcon } from "@radix-ui/react-icons";

const UpdateDailog = ({ handleUpdate, data }: any) => {
  const [ttl, setTtl] = useState(data.ttl);
  return (
    <DD>
      <DialogTrigger>
        <UpdateIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update record</DialogTitle>
          <DialogDescription>
            update zone with the selected subscription...
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 justify-center items-center ">
          <div className="grid md:grid-cols-2 gap-3 items-center">
            <div className="flex flex-col items-start">
              <label>TTL</label>
              <input
                placeholder="enter record name"
                value={ttl}
                onChange={(e) => {
                  setTtl(e.target.value);
                }}
                className="pl-1 flex-1 py-1 rounded-xl border border-gray-400"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleUpdate({ name: data.name, ttl, type: data.type });
              }}
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DD>
  );
};

export default UpdateDailog;
