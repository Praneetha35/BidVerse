const { upgrades, ethers } = require("hardhat");
const fs = require("fs");

const deployedContracts = require("../../deployed.json");

async function main() {
  const address = deployedContracts;
  console.log(
    "================== UPGRADING BIDVERSE PROFILE =================="
  );
  // We get the contract to deploy
  const BidVerseProfile = await ethers.getContractFactory("BidVerseProfile");

  const bidVerseProfile = await upgrades.upgradeProxy(
    address.BIDVERSE_PROFILE,
    BidVerseProfile,
    {
      unsafeAllowCustomTypes: true,
    }
  );

  await bidVerseProfile.deployed();

  console.log("BidVerse deployed at:", bidVerseProfile.address);
  address["BIDVERSE"] = BidVerseProfile.address;
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
