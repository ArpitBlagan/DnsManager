import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuIcon } from "@radix-ui/react-icons";
export function Dropdown({ data, val, setVal, type }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-3">
          <p>{type}</p>
          <DropdownMenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          Select Azure account's Subscription
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={val} onValueChange={setVal}>
          {data.map((ele: any, index: number) => {
            return (
              <DropdownMenuRadioItem key={index} value={ele.subscriptionId}>
                {ele?.displayName} {ele?.name}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
