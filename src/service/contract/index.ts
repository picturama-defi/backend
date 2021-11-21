import config from "../../config";
import Abi from "./artifact.json";
require("dotenv").config();
import { ethers } from "ethers";

const rpcUrl = config.networks.ganache;
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const ownerPrivateKey = process.env.PRIVATE_KEY;

//@ts-ignore
// const contract = new web3.eth.Contract(Abi.abi, config.contract_address);

const ramaContract = new ethers.Contract(
  config.contract_address,
  Abi.abi,
  provider
);

//@ts-ignore
let wallet = new ethers.Wallet(ownerPrivateKey, provider);

const addFilm = async (publicKey: string, targetFund: string, id: string) => {
  if (ownerPrivateKey && publicKey && targetFund) {
    await ramaContract
      .connect(wallet)
      .addFilm(publicKey, 1000, ethers.utils.formatBytes32String(id));
    return true;
  }
  return false;
};

const getFundedFilms = async () => {
  const res = await ramaContract.getAllProjects();
  return res.map((item: any) =>
    ethers.utils.parseBytes32String(item.toString().split(",")[2])
  );
};

export default {
  addFilm,
  getFundedFilms,
};
