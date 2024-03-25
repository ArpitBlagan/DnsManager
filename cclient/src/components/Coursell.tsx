import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const constant: any[] = [
  "Login using you microsoft accoutn (Azure) and give permission while logging In",
  "After user logged In app will fetch the subscription plan of your azure account",
  "Than based on those subscription data it fetch the resources group Name and dnszones in it and display them",
  "To see the record set of dnszone click the row in the table",
];
export function Carousell() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {constant.map((ele, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className=" text-black bg-gradient-to-r from-gray-400 to-gray-200 ">
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  <h1 className="text-xl font-semibold">{index + 1}</h1>
                  <span className="text-xl font-semibold">{ele}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
