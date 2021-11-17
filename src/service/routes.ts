import { Application } from "express";
import express from "express";
import Film from "./film";
const bodyParser = require("body-parser");
const router = express.Router();
import STATUS from "./status";
import contract from "./contract";

export const addRoutes = (app: Application) => {
  router.post("/add/film", async (req, res) => {
    const result = await Film.add(req.body);
    if (result) {
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

  app.get("/approve-film", async (req, res) => {
    await contract.addFilm();
  });

  app.get("/", (req, res) => {
    res.send("Server running");
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/", router);
};
