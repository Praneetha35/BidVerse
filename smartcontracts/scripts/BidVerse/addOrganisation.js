const { ethers } = require("hardhat");

const contractAddresses = require("../../deployed.json");

async function main() {
  console.log(
    "================== ADDING NEW ORGANISATION TO BIDVERSE =================="
  );
  // We get the contract to deploy
  const BidVerse = await ethers.getContractFactory("BidVerse");

  const bidVerse = BidVerse.attach(contractAddresses.BIDVERSE);

  const [owner, org] = await ethers.getSigners();

  const orgData = await (
    await bidVerse
      .connect(org)
      .addOrganisation([
        "Mad Rocks Ltd",
        "19",
        "http:localhost:3000/user1",
        "0",
      ])
  ).wait();

  console.log(orgData);
  console.log("\n================== ORGANISATION ADDED ==================");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => {
    console.log(
      "\n================== ********************** =================="
    );
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
