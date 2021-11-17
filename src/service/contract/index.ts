import Web3 from "web3";
import config from "../../config";
import Abi from "./artifact.json";

const provider = config.networks.ganache;

const web3Provider = new Web3.providers.HttpProvider(provider);

var web3 = new Web3(web3Provider);

//@ts-ignore
const contract = new web3.eth.Contract(Abi.abi, config.contract_address);

export const approveFilm = () => {
  web3.eth.getBlockNumber().then(async (result) => {
    const res = await contract.methods.getAllProjects().call();
    console.log(res);
    console.log("Connected to eth network...");
    console.log("Latest Ethereum Block is ", result);
  });
};
