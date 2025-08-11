

const {ethers}=require("ethers");




require("dotenv").config();



const url=process.env.infura_rpc_url;

const provider=new ethers.JsonRpcProvider(url);

const address="0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97";



async function main() {

  



  const balance=await provider.getBalance(address);

  balanceInEther=await ethers.formatEther(balance);


  console.log("Balance:",balanceInEther);


  
}

main()