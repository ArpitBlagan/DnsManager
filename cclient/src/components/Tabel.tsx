import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DelDialog from "./DelDialog";
const Tabel = ({
  records,
  subscriptionId,
  zoneName,
  resouceGroupName,
  handleDelete,
}: any) => {
  return (
    <Table className="border backdrop-blur-lg rounded-xl p-2">
      <TableCaption>A list of your recent records.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Resouce Name</TableHead>
          <TableHead>Dns zone</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>eTag</TableHead>
          <TableHead>Subscription ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Delete</TableHead>
          <TableHead>Update</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((ele: any, index: number) => {
          const type = ele.type.split("/").pop();
          return (
            <TableRow key={index} className="cursor-pointer">
              <TableCell>{resouceGroupName}</TableCell>
              <TableCell>{zoneName}</TableCell>
              <TableCell>{ele.name}</TableCell>
              <TableCell>{ele.etag}</TableCell>
              <TableCell>{subscriptionId}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell>
                <DelDialog
                  handleDelete={handleDelete}
                  data={{ name: ele.name, type }}
                />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Tabel;
