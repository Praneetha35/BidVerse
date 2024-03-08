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

  const approve = await (
    await bidVerse.connect(user).approveOrRejectBid(0, 0)
  ).wait();

  console.log(approve);
  console.log("\n================== PROFILE UPDATED ==================");

  const userBids = await bidVerse.connect(user).getBidsByCandidate();
  const userProfile = await bidVerse.connect(user).getProfile(1);
  console.log(userBids);
  console.log(userProfile);
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
