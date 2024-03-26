import { Request, Response } from "express";
import { getSschema as getSchema, otherSchame } from "../zod";

export const getR = async (req: Request, res: Response) => {
  const { subscriptionId, resourceGroupName, zoneName } = req.query;
  const accessToken = req.headers.authorization;
  const pp = getSchema.safeParse({
    subscriptionId,
    resourceGroupName,
    zoneName,
    accessToken,
  });
  if (!pp.success) {
    return res
      .status(411)
      .json({ message: "invalide inputs please provide valid inputs" });
  }
  try {
    var headers = new Headers();
    var bearer = "Bearer " + accessToken;
    headers.append("Authorization", bearer);
    var options = {
      method: "GET",
      headers,
    };
    const ress = await fetch(
      ` https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/dnsZones/${zoneName}/all?api-version=2018-05-01`,
      options
    );
    res.status(200).json(await ress.json());
  } catch (err) {
    res
      .status(500)
      .json({ message: "something went wrong please try again later" });
  }
};

export const deleteR = async (req: Request, res: Response) => {
  const {
    subscriptionId,
    resourceGroupName,
    zoneName,
    relativeRecordSetName,
    recordType,
  } = req.query;
  const accessToken = req.headers.authorization;
  const body = {
    subscriptionId: subscriptionId,
    resourceGroupName: resourceGroupName,
    zoneName: zoneName,
    accessToken: accessToken,
    relativeRecordSetName: relativeRecordSetName,
    recordType: recordType,
  };
  console.log(body);
  const ff = otherSchame.safeParse(body);
  if (!ff.success) {
    return res.status(411).json({ message: "Invalid Inputs" });
  }
  try {
    var headers = new Headers();
    var bearer = "Bearer " + accessToken;
    headers.append("Authorization", bearer);
    var options = {
      method: "DELETE",
      headers,
    };
    const ress = await fetch(
      `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/dnsZones/${zoneName}/${recordType}/${relativeRecordSetName}?api-version=2018-05-01`,
      options
    );
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong!" });
  }
};

export const createR = async (req: Request, res: Response) => {
  const body = req.body;
  const ttl = parseInt(body.ttl) | 3600;
  delete body.ttl;
  const ff = otherSchame.safeParse(body);
  if (!ff.success) {
    return res.status(411).json({ message: "invalid inputs" });
  }
  try {
    var bearer = "Bearer " + body.accessToken;
    var options = {
      method: "PUT",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          TTL: ttl,
        },
      }),
    };
    const ress = await fetch(
      ` https://management.azure.com/subscriptions/${body.subscriptionId}/resourceGroups/${body.resourceGroupName}/providers/Microsoft.Network/dnsZones/${body.zoneName}/${body.recordType}/${body.relativeRecordSetName}?api-version=2018-05-01`,
      options
    );
    console.log(await ress.json());
    res.status(202).json({ message: "created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateR = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  const ttl = parseInt(body.ttl) | 0;
  delete body.ttl;
  const ff = otherSchame.safeParse(body);
  if (!ff.success) {
    return res.status(411).json({ message: "invalid inputs" });
  }
  try {
    var bearer = "Bearer " + body.accessToken;
    var options = {
      method: "PATCH",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          TTL: ttl,
        },
      }),
    };
    const ress = await fetch(
      ` https://management.azure.com/subscriptions/${body.subscriptionId}/resourceGroups/${body.resourceGroupName}/providers/Microsoft.Network/dnsZones/${body.zoneName}/${body.recordType}/${body.relativeRecordSetName}?api-version=2018-05-01`,
      options
    );
    res.status(202).json({ message: "created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
