import express from "express";
import { connectToDB } from "./service/db";
import { addRoutes } from "./service/routes";

const cors = require("cors");

export const app = express();

app.use(cors());

app.listen(8080, () => {
  console.log("Connected to server");
  connectToDB();
  addRoutes(app);
});
