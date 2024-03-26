import {
  Dialog as DD,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
const CreateZone = ({ handleCreate, resources }: any) => {
  const [name, setName] = useState("");
  const [res, setRes] = useState("");
  console.log(resources);
  return (
    <DD>
      <DialogTrigger>
        <Button variant={"destructive"}>Add Zone</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add zone</DialogTitle>
          <DialogDescription>
            create zone with the selected subscription...
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex justify-start items-center gap-3">
            <label>DNS</label>
            <input
              placeholder="enter dns zone"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="px-1 py-2 rounded-xl border border-gray-400"
            />
          </div>
          <div className="border border-gray-200 rounded-lg px-3 py-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex  gap-3 items-center">
                  <h1>
                    <span className="underline">Resource</span> {res}{" "}
                  </h1>
                  <DropdownMenuIcon />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>select</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={res}
                  onValueChange={(e) => {
                    setRes(e);
                  }}
                >
                  {resources.map((ele: any, index: number) => {
                    return (
                      <DropdownMenuRadioItem key={index} value={ele.name}>
                        {ele.name}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DialogClose>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleCreate(name, res);
            }}
          >
            Create
          </Button>
        </DialogClose>
      </DialogContent>
    </DD>
  );
};

export default CreateZone;
