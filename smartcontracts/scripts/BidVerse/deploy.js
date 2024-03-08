const { upgrades, ethers } = require("hardhat");
const fs = require("fs");

const contract_addresses = require("../../deployed.json");

async function main() {
  const address = contract_addresses;
  console.log("================== DEPLOYING BIDVERSE ==================");
  // We get the contract to deploy
  const BidVerse = await ethers.getContractFactory("BidVerse");

  const bidVerse = await upgrades.deployProxy(
    BidVerse,
    [address.BIDVERSE_PROFILE],
    {
      initializer: "initialize",
    }
  );

  await bidVerse.deployed();

  console.log("BidVerse deployed at:", bidVerse.address);
  address["BIDVERSE"] = bidVerse.address;
  fs.writeFileSync("./deployed.json", JSON.stringify(address, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => {
    console.log("\n================== DEPLOYMENT FINISHED ==================");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
