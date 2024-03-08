const { upgrades } = require("hardhat");
const { ethers } = require("hardhat");

const contract_addresses = require("../../deployed.json");

async function main() {
  console.log(
    "================== ADDING MINTER_ROLE TO BIDVERSE =================="
  );
  // We get the contract to deploy
  const BidVerse = await ethers.getContractFactory("BidVerseProfile");

  const bidVerse = BidVerse.attach(contract_addresses.BIDVERSE_PROFILE);

  const MINTER_ROLE = await bidVerse.MINTER_ROLE();
  const grantRole = await (
    await bidVerse.grantRole(MINTER_ROLE, contract_addresses.BIDVERSE)
  ).wait();

  console.log(grantRole);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => {
    console.log("\n================== ROLE GRANTED ==================");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
