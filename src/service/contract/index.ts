import config from "../../config";
import Abi from "./artifact.json";
require("dotenv").config();
import { ethers } from "ethers";
import { Console } from "console";

const rpcUrl = config.networks.localhost;
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
      .addProject(ethers.utils.formatBytes32String(id), ethers.utils.parseEther(targetFund), publicKey);
    return true;
  }
  return false;
};

const getFundedFilms = async () => {
  const res = await ramaContract.getAllProjectIds();
  return res.map((item: any) => {
    return ethers.utils.parseBytes32String(item)
  })
};

const getFunds = async () => {
  const res = await ramaContract.getFunds(ethers.utils.formatBytes32String("619fa5d53f9caa71d73d2795"));
  return res;
};

const verifyMessage = async (message: string, signature: string) => {
  const publicKey = await wallet.getAddress()
  return publicKey == ethers.utils.verifyMessage(message, signature)
}

export default {
  addFilm,
  verifyMessage,
  getFundedFilms,
  getFunds
};
