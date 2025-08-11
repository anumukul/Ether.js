require("dotenv").config()
const { ethers } = require("ethers")


const { promptForKey } = require("../helpers/prompt.js")


const URL = process.env.tenderly_rpc_url;
const provider = new ethers.JsonRpcProvider(URL)


const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)",
];


const ERC20_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" // USDC Contract
const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, provider)


const RECIEVER = "0x6AFdcc2ff48cbEdE371F35C2083E62E1fF812b90" ;


async function main() {
  const privateKey = await promptForKey()

  
  const wallet = new ethers.Wallet(privateKey, provider)

  
  const senderBalanceBefore = await contract.balanceOf(wallet.address)
  const recieverBalanceBefore = await contract.balanceOf(RECIEVER)

 
  console.log(`\nReading from ${ERC20_ADDRESS}\n`)
  console.log(`Sender balance before: ${senderBalanceBefore}\n`)
  console.log(`Reciever balance before: ${recieverBalanceBefore}\n`)

  // Setup amount to transfer

  const amount=ethers.parseUnits("1",6);
    


  // Create transaction

  const transaction=await contract.connect(wallet).transfer(RECIEVER,amount);
 


  

  // Wait transaction

     transaction.wait();

  // Log transaction

  console.log(transaction);


  // Get ERC20 balances
  const senderBalanceAfter = await contract.balanceOf(wallet.address)
  const recieverBalanceAfter = await contract.balanceOf(RECIEVER)

  console.log(`\nBalance of sender: ${senderBalanceAfter}`)
  console.log(`Balance of reciever: ${recieverBalanceAfter}\n`)
}

main()