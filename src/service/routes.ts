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

    console.log(req.body)

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
    try {
      //@ts-ignore
      const id: string = req.query.id;
      if (id) {
        const film = await Film.findOne(id);
        if (film) {
          res.send(film);
        } else {
          res.send(STATUS.FAILED);
        }
      }
    } catch (err) {
      console.log(err)
      res.send(STATUS.FAILED);
    }
  });

  router.post("/approve-film", async (req, res) => {
    const { message, signature } = req.body;

    //@ts-ignore
    const result = await contract.verifyMessage(message, signature)

    console.log(result)

    if (!result) {
      res.send(STATUS.FAILED);
      return;
    }

    const id = message.split(":")[1]

    const film = await Film.findOne(id);

    if (film) {
      console.log("Approving film " + id);
      await contract.addFilm(film.ownerPublicAddress, film.targetFund, id);
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

  app.get("/funds", async (req, res) => {
    const fundedFilms = await contract.getFunds();
    console.log(fundedFilms[0]['amount'].toString());
    res.send("ok")
  });

  app.get("/non-funded-films", async (req, res) => {
    const fundedFilms = await Film.getNonFundedFilms();
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
