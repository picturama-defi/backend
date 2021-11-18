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

const approve = async (id: string): Promise<any> => {
  try {
    const res = await findTargetFund(id);
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const findTargetFund = async (id: string) => {
  try {
    const res = await Film.findOne({ _id: id });
    return res;
  } catch (err) {
    return false;
  }
};

const updateFundingId = async (id: string, fundingId: Number) => {
  try {
    await Film.updateOne({ _id: id }, { fundingId });
    return true;
  } catch (err) {
    return false;
  }
};

export default {
  updateFundingId,
  add,
  getAll,
  approve,
  findTargetFund,
};
