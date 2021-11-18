import { create } from "domain";
import Web3 from "web3";
import config from "../../config";
import Abi from "./artifact.json";
require("dotenv").config();

const provider = config.networks.ganache;

const web3Provider = new Web3.providers.HttpProvider(provider);

var web3 = new Web3(web3Provider);

//@ts-ignore
const contract = new web3.eth.Contract(Abi.abi, config.contract_address);

const addFilm = async (publicKey: string, targetFund: number) => {
  console.log(publicKey, targetFund, process.env.PRIVATE_KEY);

  if (
    !(
      process.env.PRIVATE_KEY &&
      publicKey &&
      targetFund &&
      process.env.PUBLIC_KEY
    )
  ) {
    return false;
  }

  const signedTxn = await createTransaction(publicKey, targetFund);

  await web3.eth.sendSignedTransaction(
    //@ts-ignore
    signedTxn.rawTransaction
  );

  const res = await contract.getPastEvents("AddFilm");

  return res[0].returnValues["id"];
};

const getFundedFilms = async () => {
  const res = await contract.methods.getAllProjects().call();
  const fundedFilmIds = res.map((item: any) => Number(item["id"]));
  return fundedFilmIds;
};

const createTransaction = async function (
  publicKey: string,
  targetFund: number
) {
  const tx = contract.methods.addFilm(publicKey, targetFund);

  console.log(publicKey, targetFund);

  const gas = await tx.estimateGas({
    from: process.env.PUBLIC_KEY,
  });

  const gasPrice = await web3.eth.getGasPrice();

  const data = tx.encodeABI();

  //@ts-ignore
  const nonce = await web3.eth.getTransactionCount(process.env.PUBLIC_KEY);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: config.chain_id,
    },

    //@ts-ignore
    process.env.PRIVATE_KEY
  );

  return signedTx;
};

export default {
  addFilm,
  getFundedFilms,
};
