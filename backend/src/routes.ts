import { Router } from "express";
import { createR, deleteR, getR, updateR } from "./controllers/record";
import { createZ, deleteZ, getZ, updateZ } from "./controllers/zone";

const Route = Router();
Route.route("/record").get(getR).delete(deleteR).put(createR).patch(updateR);
Route.route("/zones").get(getZ).delete(deleteZ).put(createZ).patch(updateZ);
export default Route;
