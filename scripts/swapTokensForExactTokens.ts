import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const main = async () => {
    
    const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
   
  
    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  
    const theAddressIFoundWithUSDCAndDAI = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";

  
    await helpers.impersonateAccount(theAddressIFoundWithUSDCAndDAI);
    const impersonatedSigner = await ethers.getSigner(theAddressIFoundWithUSDCAndDAI);

    let usdcContract = await ethers.getContractAt('IERC20', USDCAddress);
    let daiContract = await ethers.getContractAt('IERC20', DAIAddress);
    let uniswapContract = await ethers.getContractAt('IUniswapV2Router02', UNIRouter);

    const usdcBalBefore = await usdcContract.balanceOf(impersonatedSigner.address);
    const daiBalBefore = await daiContract.balanceOf(impersonatedSigner.address);
    console.log("USDC balance before swap:", ethers.formatUnits(usdcBalBefore, 6));
    console.log("DAI balance before swap:", ethers.formatUnits(daiBalBefore, 18));

  
  const amountOut = ethers.parseUnits("50000", 18);

  const amountInMax = ethers.parseUnits("55000", 6);
  let deadline = (await helpers.time.latest()) + 1500;
  

  console.log('--------------- Approving swap amt ---------------')


  await usdcContract.connect(impersonatedSigner).approve(UNIRouter, amountInMax);


  console.log('--------------- USDC approved ---------------');


  await uniswapContract.connect(impersonatedSigner).swapTokensForExactTokens(
      amountOut,
      amountInMax,
      [USDCAddress, DAIAddress],
      impersonatedSigner.address,
      deadline
    );
    console.log('--------------- swapped ---------------')

  const usdcBalAfter = await usdcContract.balanceOf(impersonatedSigner.address);
  const daiBalAfter = await daiContract.balanceOf(impersonatedSigner.address);

  console.log("USDC balance after swap:", ethers.formatUnits(usdcBalAfter, 6));


  console.log("DAI balance after swap:", ethers.formatUnits(daiBalAfter, 18));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});