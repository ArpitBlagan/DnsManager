import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import CookieParser from "cookie-parser";
import Route from "./routes";
const app = express();
app.use(express.json());
app.use(CookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "*", "dns-manager-sand.vercel.app"],
    credentials: true,
  })
);

app.use("/api/lucid", Route);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
