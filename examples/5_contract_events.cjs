require("dotenv").config()
const { ethers } = require("ethers")

// Setup connection
const URL = process.env.infura_rpc_url;
const provider = new ethers.JsonRpcProvider(URL)

// Define "Application Binary Interface"
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",

  "event Transfer(address indexed from, address indexed to, uint256 amount)",



];

// Setup contract
const ERC20_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // USDC Contract
const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, provider)

const main = async () => {
  // Get block number

  const blockNumber=await provider.getBlockNumber();


  // Query events

  const transferEvents=await contract.queryFilter("Transfer",blockNumber-1,blockNumber);


  console.log("Total events returned:", transferEvents.length);
  console.log(transferEvents[0]);


}

main()