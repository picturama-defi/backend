import { Application } from "express";
import express from "express";
import Film from "./film";
const bodyParser = require("body-parser");
const router = express.Router();
import STATUS from "./status";
import contract from "./contract";
require("dotenv").config();

const PASS_PHRASE = process.env.PASS_PHRASE;

export const addRoutes = (app: Application) => {
  router.post("/add/film", async (req, res) => {
    if (req.body.passPhrase !== PASS_PHRASE) {
      res.send(STATUS.FAILED);
      return;
    }
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

  app.get("/film", async (req, res) => {
    const {
      query: { id },
    } = req.body;
    const film = await Film.findOne(id);

    if (film) {
      res.send(film);
    } else {
      res.send(STATUS.FAILED);
    }

    res.send("Hello");
  });

  router.post("/approve-film", async (req, res) => {
    const { id, publicKey } = req.body;
    const film = await Film.findOne(id);
    if (film) {
      console.log("Approving film " + id);
      //@ts-ignore
      await contract.addFilm(publicKey, film.targetFund, id);
      await Film.setIsFunded(id, true);
      res.send(STATUS.OK);
    } else {
      res.send(STATUS.FAILED);
    }
  });

  app.get("/", (req, res) => {
    res.send("Server running");
  });

  app.get("/funded-films", async (req, res) => {
    const fundedFilms = await Film.getFundedFilms();
    if (fundedFilms) {
      res.send(fundedFilms);
    } else {
      res.send(STATUS.FAILED);
    }
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/", router);
};
