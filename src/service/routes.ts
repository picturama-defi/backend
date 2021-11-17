import { Application } from "express";
import express from "express";
import Film from "./film";
const bodyParser = require("body-parser");
const router = express.Router();
import STATUS from "./status";

export const addRoutes = (app: Application) => {
  router.post("/add/film", async (req, res) => {
    const didSucceed = await Film.add(req.body);
    if (didSucceed) {
      res.send(STATUS.OK);
    } else {
      res.send(STATUS.FAILED);
    }
  });

  app.get("/films", async (req, res) => {
    const allFilms = await Film.getAll();
    if (allFilms) {
      res.send(allFilms);
    } else {
      res.send(STATUS.FAILED);
    }
  });

  app.get("/", (req, res) => {
    res.send("Server running");
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/", router);
};
