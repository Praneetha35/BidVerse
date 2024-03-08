const { ethers } = require("hardhat");

const contract_addresses = require("../../deployed.json");

async function main() {
  console.log(
    "================== PLAINCING A BID FOR A CANDIDATE =================="
  );
  // We get the contract to deploy
  const BidVerse = await ethers.getContractFactory("BidVerse");

  const [owner] = await ethers.getSigners();
  const bidVerse = BidVerse.attach(contract_addresses.BIDVERSE);

  const whoami = await bidVerse.connect(owner).whoAmI();

  console.log(whoami);
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
