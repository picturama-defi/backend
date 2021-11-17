import express from "express";
import { connectToDB } from "./service/db";
import { addRoutes } from "./service/routes";
import contract from "./service/contract";

export const app = express();

app.listen(8080, () => {
  console.log("Connected to server");
  connectToDB();
  addRoutes(app);
});
