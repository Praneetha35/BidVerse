const { upgrades } = require("hardhat");
const { ethers } = require("hardhat");

const contract_addresses = require("../../deployed.json");

async function main() {
  console.log(
    "================== PLAINCING A BID FOR A CANDIDATE =================="
  );
  // We get the contract to deploy
  const BidVerse = await ethers.getContractFactory("BidVerse");

  const [owner, org] = await ethers.getSigners();
  const bidVerse = BidVerse.attach(contract_addresses.BIDVERSE);
  
  const bid = await (
    await bidVerse
      .connect(org)
      .offerInterview(
        owner.address,
        "FRONT-END:Need a front end developer with basic skills"
      )
  ).wait();

  console.log(bid);
  console.log("\n================== BID PLACED B ==================");

  console.log("\n================== Getting Total Bids ==================");
  // const bids = await bidVerse.connect(org).getBids(0);
  // console.log(bids);

  // const bidsByOrg = await bidVerse.connect(org).getBidsByOrg();
  // console.log(bidsByOrg);

  const bidsByCan = await bidVerse.connect(owner).getBidsByCandidate();
  console.log(bidsByCan);
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
