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
  const [ttl, setTtl] = useState("");
  return (
    <DD>
      <DialogTrigger>
        <Button variant={"destructive"}>Add Zone</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add record</DialogTitle>
          <DialogDescription>
            create record with the selected subscription and dns zone...
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 justify-center items-center ">
          <div className="grid md:grid-cols-2 gap-3 items-center">
            <div className="flex flex-col items-start">
              <label>Record Name</label>
              <input
                placeholder="enter record name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="pl-1 flex-1 py-1 rounded-xl border border-gray-400"
              />
            </div>
            <div className="flex flex-col items-start">
              <label>TTL</label>
              <input
                type="number"
                placeholder="enter TTL"
                value={ttl}
                onChange={(e) => {
                  setTtl(e.target.value);
                }}
                className="pl-1 flex-1 py-1 rounded-xl border border-gray-400"
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
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleCreate({ name, type, ttl });
              }}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DD>
  );
};

export default CreateRecord;
