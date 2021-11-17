import Film from "../model/Film";
import contract from "./contract";

const add = async (filmData: any) => {
  try {
    const newFilm = new Film(filmData);
    await newFilm.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAll = async () => {
  try {
    const allFilms = await Film.find({});
    return allFilms;
  } catch (err) {
    return false;
  }
};

const approve = async () => {
  try {
    await contract.addFilm();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default {
  add,
  getAll,
  approve,
};
