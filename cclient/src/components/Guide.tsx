import { Carousell } from "./Coursell";
import { Card, CardContent, CardHeader } from "./ui/card";
const Guide = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div>
        <Card>
          <CardHeader>About the App</CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-2">
            <span className="">
              The DNS Manager App is a powerful tool designed to simplify and
              streamline the management of Domain Name System (DNS)
              configurations in Azure. With a user-friendly interface and robust
              functionality, this application empowers users to efficiently
              oversee their DNS settings, ensuring optimal performance,
              reliability, and security for their Azure-based services.
            </span>
            <Carousell />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Guide;
