import { Application } from "express";
import express from "express";
const bodyParser = require("body-parser");
const router = express.Router();

export const addRoutes = (app: Application) => {
  router.post("/add/publicKey", (req, res) => {
    console.log(req.body);
    res.send("got it");
  });

  app.get("/", (req, res) => {
    res.send("Hello");
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/", router);
};
