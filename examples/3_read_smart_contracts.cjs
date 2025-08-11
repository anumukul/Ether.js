require("dotenv").config()
const { ethers } = require("ethers")


const URL = process.env.infura_rpc_url;

const provider = new ethers.JsonRpcProvider(URL)



const tokenABI=[

"function name() view returns(string)",
"function totalSupply() view returns (uint256)",

"function balanceOf(address) view returns(uint256)"


]






const tokenAddress="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";


async function main() {



  const tokenContract=await new ethers.Contract(tokenAddress,tokenABI,provider);

  


  // Log contract state
  console.log(tokenContract);


  console.log(await tokenContract.name());




  const  balance=await tokenContract.totalSupply();
  console.log(balance);

  const balanceOfAddress=await tokenContract.balanceOf("0x30Ba371305C693dbCFcC957d58397506041D8b2D");
  console.log(balanceOfAddress);



  // Log ERC20 balance
}

main()