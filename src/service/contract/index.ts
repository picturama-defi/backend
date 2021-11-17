import Web3 from "web3";

const provider = "http://127.0.0.1:8545";

const web3Provider = new Web3.providers.HttpProvider(provider);

var web3 = new Web3(web3Provider);

export const approveFilm = () => {
  web3.eth.getBlockNumber().then((result) => {
    console.log("Connected to eth network...");
    console.log("Latest Ethereum Block is ", result);
  });
};
