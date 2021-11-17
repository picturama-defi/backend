import Web3 from "web3";
import config from "../../config";
import Abi from "./artifact.json";
require("dotenv").config();

const provider = config.networks.ganache;

const web3Provider = new Web3.providers.HttpProvider(provider);

var web3 = new Web3(web3Provider);

//@ts-ignore
const contract = new web3.eth.Contract(Abi.abi, config.contract_address);

const addFilm = async () => {
  if (!process.env.PRIVATE_KEY) {
    return;
  }

  const tx = contract.methods.addFilm(
    "0xA914d2c24F57EdA15f51398dfC6A60fD5fFE2477",
    1000
  );

  const gas = await tx.estimateGas({
    from: "0xA914d2c24F57EdA15f51398dfC6A60fD5fFE2477",
  });

  const gasPrice = await web3.eth.getGasPrice();

  const data = tx.encodeABI();

  const nonce = await web3.eth.getTransactionCount(
    "0xA914d2c24F57EdA15f51398dfC6A60fD5fFE2477"
  );

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: config.chain_id,
    },
    process.env.PRIVATE_KEY
  );

  //@ts-ignore
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  return receipt;
};

export default {
  addFilm,
};
