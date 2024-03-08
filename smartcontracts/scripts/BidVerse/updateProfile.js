const { upgrades } = require("hardhat");
const { ethers } = require("hardhat");

const contract_addresses = require("../../deployed.json");

async function main() {
  console.log(
    "================== UPDATING PROFILE TO BIDVERSE =================="
  );
  // We get the contract to deploy
  const BidVerse = await ethers.getContractFactory("BidVerse");

  const bidVerse = BidVerse.attach(contract_addresses.BIDVERSE);

  const [owner, user, org] = await ethers.getSigners();

  const profile = await (
    await bidVerse.connect(user).updateProfile("http:localhost:3000/user1/v2")
  ).wait();

  console.log(profile);
  console.log("\n================== PROFILE UPDATED ==================");

  const createdProfile = await bidVerse.getProfile("1");
  console.log(createdProfile);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => {
    console.log("\n================== **************** ==================");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
