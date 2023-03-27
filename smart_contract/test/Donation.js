const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Donation", function () {
    let donation;
    const nickname = "Alice";
    const projectId = 1;
    const subject = "Project A";
    const generation = 1;
    const date = "2022-01-01";
    const amount = ethers.utils.parseEther("10");

    beforeEach(async function () {
        const Donation = await ethers.getContractFactory("Donation");
        donation = await Donation.deploy();
        await donation.deployed();
    });

    it("should add a new donation history", async function () {
        await donation.addDonationHistory(nickname, projectId, subject, generation, date, amount);
        const length = await donation.getDonationHistoriesLength();
        expect(length).to.equal(1);

        const history = await donation.getDonationHistory(0);
        expect(history.nickname).to.equal(nickname);
        expect(history.projectId).to.equal(projectId);
        expect(history.subject).to.equal(subject);
        expect(history.generation).to.equal(generation);
        expect(history.date).to.equal(date);
        expect(history.amount).to.equal(amount);
    });

    it("should get donation histories with pagination", async function () {
        await donation.addDonationHistory(nickname, projectId, subject, generation, date, amount);
        await donation.addDonationHistory(nickname, projectId, subject, generation, date, amount);
        await donation.addDonationHistory(nickname, projectId, subject, generation, date, amount);
        await donation.addDonationHistory(nickname, projectId, subject, generation, date, amount);
        await donation.addDonationHistory(nickname, projectId, subject, generation, date, amount);
        const pageSize = 2;

        const page1 = await donation.getDonationHistories(1, pageSize);
        expect(page1.length).to.equal(pageSize);
        expect(page1[0].nickname).to.equal(nickname);
        expect(page1[1].nickname).to.equal(nickname);

        const page2 = await donation.getDonationHistories(2, pageSize);
        expect(page2.length).to.equal(pageSize);
        expect(page2[0].nickname).to.equal(nickname);
        expect(page2[1].nickname).to.equal(nickname);

        const page3 = await donation.getDonationHistories(3, pageSize);
        expect(page3.length).to.equal(1);
        expect(page3[0].nickname).to.equal(nickname);
    });
});
