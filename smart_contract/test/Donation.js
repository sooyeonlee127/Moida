const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Donation Contract", function () {
  let donationContract;

  beforeEach(async () => {
    const Donation = await ethers.getContractFactory("Donation");
    donationContract = await Donation.deploy();
    await donationContract.deployed();
  });

  it("should add and get donation history", async function () {
    // Add donation history
    await donationContract.addDonationHistory(
      "John",
      1,
      "Project A",
      1,
      "2022-03-27",
      100
    );

    // Get donation history
    const donationHistory = await donationContract.getDonationHistory(0);

    // Check values
    expect(donationHistory.nickname).to.equal("John");
    expect(donationHistory.projectId).to.equal(1);
    expect(donationHistory.subject).to.equal("Project A");
    expect(donationHistory.generation).to.equal(1);
    expect(donationHistory.date).to.equal("2022-03-27");
    expect(donationHistory.amount).to.equal(100);
  });

  it("should get donation histories", async function () {
    // Add donation histories
    await donationContract.addDonationHistory(
      "John",
      1,
      "Project A",
      1,
      "2022-03-27",
      100
    );
    await donationContract.addDonationHistory(
      "Mike",
      2,
      "Project B",
      2,
      "2022-03-28",
      200
    );
    await donationContract.addDonationHistory(
      "Sarah",
      3,
      "Project C",
      3,
      "2022-03-29",
      300
    );

    // Get donation histories
    const donationHistories = await donationContract.getDonationHistories();

    // Check length and values
    expect(donationHistories.length).to.equal(3);
    expect(donationHistories[0].nickname).to.equal("John");
    expect(donationHistories[1].projectId).to.equal(2);
    expect(donationHistories[2].subject).to.equal("Project C");
  });

  it("should throw error when getting invalid index donation history", async function () {
    // Add donation history
    await donationContract.addDonationHistory(
      "John",
      1,
      "Project A",
      1,
      "2022-03-27",
      100
    );

    // Try to get invalid index donation history and check for error
    await expect(donationContract.getDonationHistory(1)).to.be.revertedWith(
      "Invalid index"
    );
  });
});
