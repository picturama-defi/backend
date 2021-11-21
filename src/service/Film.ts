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

const getFundedFilms = async () => {
  try {
    const fundingIds = await contract.getFundedFilms();
    const allFilms = await Film.find({ _id: { $in: fundingIds } });
    return allFilms;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const findOne = async (id: string) => {
  try {
    const res = await Film.findOne({ _id: id });
    return res;
  } catch (err) {
    return false;
  }
};

const setIsFunded = async (id: string, fundingStatus: Boolean) => {
  try {
    await Film.updateOne({ _id: id }, { isFunded: fundingStatus });
    return true;
  } catch (err) {
    return false;
  }
};

export default {
  setIsFunded,
  add,
  getAll,
  getFundedFilms,
  findOne,
};
