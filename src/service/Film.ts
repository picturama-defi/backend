import Film from "../model/Film";

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

export default {
  getAll,
  add,
};
