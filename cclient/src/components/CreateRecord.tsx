import {
  Dialog as DD,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuIcon } from "@radix-ui/react-icons";
import { DialogClose } from "@radix-ui/react-dialog";
const types = [
  "A",
  "AAAA",
  "CNAME",
  "MX",
  "NS",
  "PTR",
  "SOA",
  "SRV",
  "TXT",
  "DNSSEC",
];
const CreateRecord = ({ handleCreate }: any) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
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
        <div className="flex flex-col gap-3 justify-center items-center ">
          <div className="flex gap-3">
            <label>Record Name</label>
            <input
              placeholder="enter record name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="px-1 flex-1 py-2 rounded-xl border border-gray-400"
            />
          </div>
          <div className="border border-gray-200 rounded-lg px-3 py-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex  gap-3 items-center">
                  <h1>
                    <span className="underline">Type</span> {type}
                  </h1>
                  <DropdownMenuIcon />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>select</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  className="bg-white p-2"
                  value={type}
                  onValueChange={(e) => {
                    setType(e);
                  }}
                >
                  {types.map((ele: any, index: number) => {
                    return (
                      <DropdownMenuRadioItem
                        key={index}
                        value={ele}
                        className="cursor-pointer"
                      >
                        {ele}
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
              handleCreate({ name, type });
            }}
          >
            Create
          </Button>
        </DialogClose>
      </DialogContent>
    </DD>
  );
};

export default CreateRecord;
