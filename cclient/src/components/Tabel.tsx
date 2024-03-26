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
import UpdateDailog from "./UpdateDailog";
const Tabel = ({
  records,
  subscriptionId,
  zoneName,
  resouceGroupName,
  handleDelete,
  handleUpdate,
  match,
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
          <TableHead>TTL</TableHead>
          <TableHead>Subscription ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Delete</TableHead>
          <TableHead>Update</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((ele: any, index: number) => {
          const kk = ele.name.toLowerCase();
          const ff = match.toLowerCase();
          const type = ele.type.split("/").pop();
          const fff = type.toLowerCase();
          if (match == "" || kk.includes(ff) || fff.includes(ff)) {
            return (
              <TableRow key={index} className="cursor-pointer">
                <TableCell>{resouceGroupName}</TableCell>
                <TableCell>{zoneName}</TableCell>
                <TableCell>{ele.name}</TableCell>
                <TableCell>{ele.etag}</TableCell>
                <TableCell>{ele.properties.TTL}</TableCell>
                <TableCell>{subscriptionId}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>
                  <DelDialog
                    handleDelete={handleDelete}
                    data={{ name: ele.name, type }}
                  />
                </TableCell>
                <TableCell>
                  <UpdateDailog
                    handleUpdate={handleUpdate}
                    data={{ name: ele.name, type, ttl: ele.properties.TTL }}
                  />
                </TableCell>
              </TableRow>
            );
          } else {
            return;
          }
        })}
      </TableBody>
    </Table>
  );
};

export default Tabel;
