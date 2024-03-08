const { ethers } = require("hardhat");

const deployedContracts = require("../../deployed.json");

async function main() {
  console.log(
    "================== ADDING NEW PROFILE TO BIDVERSE =================="
  );
  const [owner, user] = await ethers.getSigners();

  console.log(owner.address);

  // We get the contract to deploy
  const BidVerse = await ethers.getContractFactory("BidVerse");

  const bidVerse = BidVerse.attach(deployedContracts.BIDVERSE);

  const profile = await (
    await bidVerse
      .connect(owner)
      .addProfile([
        "BugBusters",
        "0.15",
        "http:localhost:3000/user1",
        "http:localhost:3000/user1",
        "full-stack",
        "full-stack | blockchain",
        ["nodejs", "reactjs", "javascript"],
        "0",
        15,
      ])
  ).wait();

  console.log(profile);
  console.log("\n================== PROFILE CREATED ==================");

  const createdProfile = await bidVerse.connect(owner).getProfile("1");
  console.log(createdProfile);
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
