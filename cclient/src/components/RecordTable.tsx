import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Tabel from "./Tabel";
import CreateRecord from "./CreateRecord";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
interface props {
  accessToken: string;
  resourceGroupName: string;
  zoneName: string;
  subscriptionId: string;
}
function RecordTable({
  accessToken,
  resourceGroupName,
  zoneName,
  subscriptionId,
}: props) {
  const [records, setR] = useState<null | any>(null);
  const [change, setC] = useState(false);
  const [loading, setL] = useState(false);
  useEffect(() => {
    const getRecord = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4002/api/lucid/record?resourceGroupName=${resourceGroupName}&subscriptionId=${subscriptionId}&zoneName=${zoneName}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        console.log(res.data.value);
        setR(res.data.value);
        toast.success("successfully fetched the records");
      } catch (err) {
        console.log(err);
        //@ts-ignore
        if (err.message) {
          //@ts-ignore
          toast.error(err.message);
        } else {
          toast.error("something went wrong!");
        }
      }
    };
    getRecord();
  }, [change]);
  const handleDelete = async (ele: any) => {
    const { name, type } = ele;
    toast(`deleteing the record with name ${name} wait`);
    try {
      const res = await axios.delete(
        `http://localhost:4002/api/lucid/record?subscriptionId=${subscriptionId}&resourceGroupName=${resourceGroupName}&zoneName=${zoneName}&relativeRecordSetName=${name}&recordType=${type}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log(res);
      setC(!change);
      toast.success("successfully deleted");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
  const handleUpdate = async (ele: any) => {};
  const handleCreate = async (data: any) => {
    setL(true);
    toast("creating zone wait");
    try {
      const res = await axios.put(`http://localhost:4002/api/lucid/record`, {
        subscriptionId,
        resourceGroupName,
        zoneName,
        accessToken,
        relativeRecordSetName: data.name,
        recordType: data.type,
      });
      console.log(res.data);
      toast.success("created successfully");
      setC(!change);
      setL(false);
    } catch (err) {
      console.log(err);
      toast.error("some thing went wrong not able to create zone..");
      setL(false);
    }
  };
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">
        Record Set of zone {zoneName}
      </h1>
      {records && (
        <div>
          <div className="flex justify-end items-center my-2">
            {loading ? (
              <Button variant={"destructive"}>
                Creating
                <Skeleton className="h-12 w-12 rounded-full" />
              </Button>
            ) : (
              <CreateRecord handleCreate={handleCreate} />
            )}
          </div>
          <Tabel
            subscriptionId={subscriptionId}
            resouceGroupName={resourceGroupName}
            records={records}
            zoneName={zoneName}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </div>
      )}
      <h1>That's It</h1>
    </div>
  );
}

export default RecordTable;