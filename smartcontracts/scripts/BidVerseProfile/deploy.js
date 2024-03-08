const { ethers, upgrades } = require("hardhat");
const fs = require("fs");

const contract_addresses = require("../../deployed.json");

async function main() {
  const address = contract_addresses;
  console.log(
    "================== DEPLOYING BIDVERSE PROFILE =================="
  );
  // We get the contract to deploy
  const BidVerseProfile = await ethers.getContractFactory("BidVerseProfile");
  const bidVerseProfile = await upgrades.deployProxy(BidVerseProfile, [], {
    initializer: "initialize",
  });
  await bidVerseProfile.deployed();

  console.log("BidVerseProfile deployed at:", bidVerseProfile.address);
  address["BIDVERSE_PROFILE"] = bidVerseProfile.address;
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
