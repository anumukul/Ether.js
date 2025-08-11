const {ethers}=require("ethers");

require("dotenv").config();



// Import private key helper
const {promptForKey}=require("../helpers/prompt.js")

// Setup connection

const provider=new ethers.JsonRpcProvider(process.env.tenderly_rpc_url);

const receiver="0xF00b3321E87d0CFABe761B18A84333537e97E055";



async function main() {
  const privateKey = await promptForKey()

  // Setup wallet

  const wallet =new ethers.Wallet(privateKey,provider);


  
  // Get balances

  const senderBalanceBefore=await provider.getBalance(wallet.address);

  const receiverBalanceBefore=await provider.getBalance(receiver);






  // Log balances

    console.log("Sender Balance before tx:", await ethers.formatEther(senderBalanceBefore));
        console.log("Receiver Balance before tx:", await ethers.formatEther(receiverBalanceBefore));

  // Create transaction

  const transaction=await wallet.sendTransaction({

    to:receiver,
    value:ethers.parseUnits("0.5",18),



  });
  





  // Wait transactionS
    const receipt=await transaction.wait();

    console.log(receipt);
    

  // Get balances

  const senderBalanceAfter=await provider.getBalance(wallet.address);

  const receiverBalanceAfter=await provider.getBalance(receiver);

  // Log balances

  console.log("Sender Balance before tx:", await ethers.formatEther(senderBalanceAfter));
        console.log(" Receiver Balance before tx:", await ethers.formatEther(receiverBalanceAfter));
}

main()