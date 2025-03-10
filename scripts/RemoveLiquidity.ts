import { ethers } from "hardhat"

const helpers = require ("@nomicfoundation/hardhat-network-helpers")

const main = async () => {

    const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    const theAddressIFoundWithUSDCAndDAI = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";

    await helpers.impersonateAccount(theAddressIFoundWithUSDCAndDAI);

    const impersonatedSigner = await ethers.getSigner(theAddressIFoundWithUSDCAndDAI);

    let usdcContract = await ethers.getContractAt("IERC20", USDCAddress);
    let daiContract = await ethers.getContractAt("IERC20", DAIAddress);
    let uniswapContract = await ethers.getContractAt("IUniswapV2Router02", UNIRouter);
    
    const usdcBal = await usdcContract.balanceOf(impersonatedSigner.address);
    const daiBal = await daiContract.balanceOf(impersonatedSigner.address);

    const getContractFactoryAddress = await uniswapContract.factory()

    const factoryContract = await ethers.getContractAt("IUniswapV2Factory",getContractFactoryAddress)

    console.log("................Balance Before Removing Liquidity..................")

    console.log("impersonated acc usdc bal BA:", ethers.formatUnits(usdcBal, 6))
    console.log("impersonated acc dai bal BA:", ethers.formatUnits(daiBal, 18))


    const poolAddress = await factoryContract.getPair(USDCAddress,DAIAddress);
    const poolContract = await ethers.getContractAt("IERC20", poolAddress);
    const decimalPoolAddress = await poolContract.decimals();
    const poolAddressBal = await poolContract.balanceOf(theAddressIFoundWithUSDCAndDAI);
    console.log(decimalPoolAddress);
    console.log("USDC/DAI" + ethers.formatUnits(poolAddressBal, decimalPoolAddress))

    const liquidity =  poolAddressBal;


    // let liquidity = ethers.parseUnits('1000', 18);

    let AmtAMin = ethers.parseUnits('99000', 6);
    let AmtBMin = ethers.parseUnits('99000', 18);

    let deadline = await helpers.time.latest() + 500;


  
    console.log('----------------------Removing liquidity-------------------')

    await uniswapContract.connect(impersonatedSigner).removeLiquidity(
        USDCAddress,
        DAIAddress,
        liquidity,
        AmtAMin,
        AmtBMin,
        impersonatedSigner.address,
        deadline
    )
    console.log('-------------------------- liquidity Removed -------------')


    console.log("................Balance After Removing Liquidity..................")
    console.log("impersonated acc usdc bal BA:", ethers.formatUnits(usdcBal, 6))
    console.log("impersonated acc dai bal BA:", ethers.formatUnits(daiBal, 18))



}

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });