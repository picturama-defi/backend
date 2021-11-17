import express from "express";
import { connectToDB } from "./service/db";
import { addRoutes } from "./service/routes";
import { approveFilm } from "./service/contract";

export const app = express();

app.listen(8080, () => {
  console.log("Connected to server");
  connectToDB();
  approveFilm();
  addRoutes(app);
});
