import { Request, Response } from "express";
import { schema, getSchema } from "../zod";

export const createZ = async (req: Request, res: Response) => {
  const { resourceGroupName, zoneName, subscriptionId } = req.query;
  const { accessToken } = req.body;
  console.log(req.query);
  const body = {
    subscriptionId,
    accessToken,
    resourceGroupName,
    zoneName,
  };
  console.log(body);
  const ff = schema.safeParse(body);
  if (!ff.success) {
    return res.status(411).json({ message: "invalid inputs" });
  }
  try {
    var headers = new Headers();
    var bearer = "Bearer " + accessToken;
    headers.append("Authorization", bearer);
    var options = {
      method: "PUT",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        location: "Global",
        tags: {
          key1: "value1",
        },
      }),
    };
    const ress = await fetch(
      `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/dnsZones/${zoneName}?api-version=2018-05-01`,
      //@ts-ignore
      options
    );
    console.log(await ress.json());
    res.status(202).json({ message: "created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const deleteZ = async (req: Request, res: Response) => {
  const { subscriptionId, resourceGroupName, zoneName } = req.query;
  const accessToken = req.headers.authorization;
  const body = {
    accessToken,
    subscriptionId,
    resourceGroupName,
    zoneName,
  };
  console.log(body);
  const ff = schema.safeParse(body);
  if (!ff.success) {
    return res.status(411).json({ message: "invalid inputs" });
  }
  try {
    var headers = new Headers();
    var bearer = "Bearer " + body.accessToken;
    headers.append("Authorization", bearer);
    var options = {
      method: "DELETE",
      headers,
    };
    const ress = await fetch(
      `https://management.azure.com/subscriptions/${body.subscriptionId}/resourceGroups/${body.resourceGroupName}/providers/Microsoft.Network/dnsZones/${body.zoneName}?api-version=2018-05-01`,
      options
    );
    res.status(202).json({ message: "deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateZ = async (req: Request, res: Response) => {
  const body = req.body;
  const ff = schema.safeParse(body);
  if (!ff.success) {
    return res.status(411).json({ message: "invalid inputs" });
  }
  try {
    var headers = new Headers();
    var bearer = "Bearer " + body.accessToken;
    headers.append("Authorization", bearer);
    var options = {
      method: "PATCH",
      headers,
    };
    const ress = await fetch(
      `https://management.azure.com/subscriptions/${body.subscriptionId}/resourceGroups/${body.resourceGroupName}/providers/Microsoft.Network/dnsZones/${body.zoneName}?api-version=2018-05-01`,
      options
    );
    console.log(await ress.json());
    res.status(202).json({ message: "updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getZ = async (req: Request, res: Response) => {
  const body = req.body;
  const ff = getSchema.safeParse(body);
  if (!ff.success) {
    return res.status(411).json({ message: "invalid inputs" });
  }
  try {
    var headers = new Headers();
    var bearer = "Bearer " + body.accessToken;
    headers.append("Authorization", bearer);
    var options = {
      method: "PUT",
      headers,
    };
    const ress = await fetch(
      `https://management.azure.com/subscriptions/${body.subscriptionId}/resourceGroups/${body.resourceGroupName}/providers/Microsoft.Network/dnsZones?api-version=2018-05-01`,
      options
    );
    console.log(await ress.json());
    res.status(202).json(await ress.json());
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
