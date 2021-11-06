import { Application } from "express";
import express from "express";
const bodyParser = require("body-parser");
const router = express.Router();
import { addPublicKey } from "./publicKey";

export const addRoutes = (app: Application) => {
  router.post("/add/publicKey", (req, res) => {
    addPublicKey(req.body.publicKey);
    res.send(req.body);
  });

  app.get("/", (req, res) => {
    res.send("Server running");
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/", router);
};
