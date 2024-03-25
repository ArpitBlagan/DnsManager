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

const Dialog = ({ name, header, data, button }: any) => {
  return (
    <DD>
      <DialogTrigger>{name}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div>
            <label></label>
          </div>
          <div></div>
        </div>
        <DialogFooter>
          {button.map((ele: string, index: number) => {
            return (
              <Button variant={"outline"} key={index}>
                {ele}
              </Button>
            );
          })}
        </DialogFooter>
      </DialogContent>
    </DD>
  );
};

export default Dialog;
