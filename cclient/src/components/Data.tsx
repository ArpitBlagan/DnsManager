import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import DelDialog from "./DelDialog";
import axios from "axios";
import CreateZone from "./CreateZone";

const Data = ({ accessToken, val, data, setData }: any) => {
  const navigate = useNavigate();
  const [change, setC] = useState(false);
  const [resources, setR] = useState<any[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      var headers = new Headers();
      var bearer = "Bearer " + accessToken;
      headers.append("Authorization", bearer);
      var options = {
        method: "GET",
        headers,
      };
      try {
        const res1 = await fetch(
          `https://management.azure.com/subscriptions/${val}/resourceGroups?api-version=2016-06-01`,
          options
        );
        const ff = await res1.json();
        setR(ff.value);
        console.log(val);
        const kk = await Promise.all(
          ff.value.map(async (ele: any) => {
            const dnszone = await fetch(
              `https://management.azure.com/subscriptions/${val}/resourceGroups/${ele.name}/providers/Microsoft.Network/dnsZones?api-version=2018-05-01`,
              options
            );
            const dnss = await dnszone.json();
            console.log(dnss);
            return dnss.value.map((el: any) => {
              console.log(el);
              return {
                resouceName: ele.name,
                subscriptionId: val,
                dnszone: el.name,
                location: el.location,
              };
            });
          })
        );
        console.log(kk);
        toast.success("successfully fetched the resources dns zones");
        setData(kk);
      } catch (err) {
        console.log(err);
        toast.error("something went wrong...");
      }
    };
    getData();
  }, [change]);
  const handleCreate = async (name: string, resource: string) => {
    toast("creating zone wait");
    try {
      const res = await axios.put(
        `https://dnsmanager-bfc3.onrender.com/api/lucid/zones?subscriptionId=${val}&resourceGroupName=${resource}&zoneName=${name}`,
        { accessToken },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      toast.success("created successfully");
      setC(!change);
    } catch (err) {
      console.log(err);
      toast.error("some thing went wrong not able to create zone..");
    }
  };
  const handleDeletee = async (ele: any) => {
    try {
      const res = await axios.delete(
        `https://dnsmanager-bfc3.onrender.com/api/lucid/zones?subscriptionId=${ele.subscriptionId}&resourceGroupName=${ele.resouceName}&zoneName=${ele.dnszone}`,
        {
          headers: {
            Authorization: accessToken,
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status == 202) {
        setC(!change);
        toast.success("successfully deleted");
      } else {
        toast.error(
          "something went wrong make sure to add .com etc in the end..."
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
  return (
    <div className="my-3">
      <div className="flex justify-end my-2">
        {resources && (
          <CreateZone handleCreate={handleCreate} resources={resources} />
        )}
      </div>
      <Table className="border backdrop-blur-lg rounded-xl p-2">
        <TableCaption>A list of your recent zones.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Resouce Name</TableHead>
            <TableHead>Subscription ID</TableHead>
            <TableHead>Dns zone</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Delete</TableHead>
            <TableHead className="text-right">Records</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((elee: any) => {
            console.log("cool", elee);
            return elee.map((ele: any, index: number) => {
              console.log(ele);
              return (
                <TableRow key={index} className="cursor-pointer">
                  <TableCell className="font-medium">
                    {ele.resouceName}
                  </TableCell>
                  <TableCell>{ele.subscriptionId}</TableCell>
                  <TableCell>{ele.dnszone}</TableCell>
                  <TableCell>{ele.location}</TableCell>
                  <TableCell>
                    <DelDialog handleDelete={handleDeletee} data={ele} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={"destructive"}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(val);
                        navigate("/subscription/resrouceGroup/dnszone", {
                          state: {
                            subscriptionId: val,
                            resourceGroupName: ele.resouceName,
                            zoneName: ele.dnszone,
                            accessToken,
                          },
                        });
                      }}
                    >
                      See Record Set
                    </Button>
                  </TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
      <h1>That's It</h1>
    </div>
  );
};

export default Data;
