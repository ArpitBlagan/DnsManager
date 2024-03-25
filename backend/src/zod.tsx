import * as z from "zod";
export const schema = z.object({
  subscriptionId: z.string(),
  resourceGroupName: z.string(),
  accessToken: z.string(),
  zoneName: z.string(),
});
export const getSchema = z.object({
  subscriptionId: z.string(),
  resourceGroupName: z.string(),
  accessToken: z.string(),
});
export const getSschema = z.object({
  subscriptionId: z.string(),
  resourceGroupName: z.string(),
  zoneName: z.string(),
  accessToken: z.string(),
});
export const otherSchame = z.object({
  subscriptionId: z.string(),
  resourceGroupName: z.string(),
  zoneName: z.string(),
  accessToken: z.string(),
  relativeRecordSetName: z.string(),
  recordType: z.string(),
});
