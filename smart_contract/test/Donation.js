const { expect } = require("chai");

describe("Donation contract", function () {
  let donationContract;
  const nickname = "Alice";
  const projectId = 1;
  const subject = "Support local farmers";
  const generation = 2;
  const date = "2022-03-27";
  const amount = 100;

  beforeEach(async function () {
    const Donation = await ethers.getContractFactory("Donation");
    donationContract = await Donation.deploy();
    await donationContract.deployed();
  });

  it("should add a new donation history", async function () {
    await donationContract.addDonationHistory(
      nickname,
      projectId,
      subject,
      generation,
      date,
      amount
    );
    const donationHistory = await donationContract.getDonationHistory(0);
    expect(donationHistory.nickname).to.equal(nickname);
    expect(donationHistory.projectId).to.equal(projectId);
    expect(donationHistory.subject).to.equal(subject);
    expect(donationHistory.generation).to.equal(generation);
    expect(donationHistory.date).to.equal(date);
    expect(donationHistory.amount).to.equal(amount);
  });

  it("should get the length of the donation histories array", async function () {
    const donationHistoriesLength =
      await donationContract.getDonationHistoriesLength();
    expect(donationHistoriesLength).to.equal(0);
  });

  it("should get all donation histories", async function () {
    await donationContract.addDonationHistory(
      nickname,
      projectId,
      subject,
      generation,
      date,
      amount
    );
    const donationHistories = await donationContract.getDonationHistories();
    expect(donationHistories.length).to.equal(1);
    const donationHistory = donationHistories[0];
    expect(donationHistory.nickname).to.equal(nickname);
    expect(donationHistory.projectId).to.equal(projectId);
    expect(donationHistory.subject).to.equal(subject);
    expect(donationHistory.generation).to.equal(generation);
    expect(donationHistory.date).to.equal(date);
    expect(donationHistory.amount).to.equal(amount);
  });

  it("should get donation histories with pagination", async function () {
    await donationContract.addDonationHistory(
      nickname,
      projectId,
      subject,
      generation,
      date,
      amount
    );
    await donationContract.addDonationHistory(
      nickname,
      projectId + 1,
      subject,
      generation,
      date,
      amount
    );
    await donationContract.addDonationHistory(
      nickname,
      projectId + 2,
      subject,
      generation,
      date,
      amount
    );
    const pageSize = 2;
    let page = 1;
    let donationHistories = await donationContract.getDonationHistories(
      page,
      pageSize
    );
    expect(donationHistories.length).to.equal(pageSize);
    expect(donationHistories[0].projectId).to.equal(projectId);
    expect(donationHistories[1].projectId).to.equal(projectId + 1);
    page = 2;
    donationHistories = await donationContract.getDonationHistories(
      page,
      pageSize
    );
    expect(donationHistories.length).to.equal(1);
    expect(donationHistories[0].projectId).to.equal(projectId + 2);
    page = 3;
    donationHistories = await donationContract.getDonationHistories(
      page,
      pageSize
    );
    expect(donationHistories.length).to.equal(0);
  });
});
