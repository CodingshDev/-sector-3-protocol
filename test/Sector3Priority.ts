import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Sector3DAOPriority", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployWeeklyFixture() {
    console.log('deployWeeklyFixture')

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    console.log('owner.address:', owner.address);
    console.log('otherAccount.address:', otherAccount.address);
    
    const Sector3DAOPriority = await ethers.getContractFactory("Sector3DAOPriority");
    const dao = "0x96Bf89193E2A07720e42bA3AD736128a45537e63";  // Sector#3
    const title = "Priority Title";
    const rewardToken = "0x942d6e75465C3c248Eb8775472c853d2b56139fE";  // Sector#3
    const epochDuration = 0;  // EpochDuration.Weekly
    const epochBudget = (2.049 * 1e18).toString();  // 2.049
    const sector3DAOPriority = await Sector3DAOPriority.deploy(dao, title, rewardToken, epochDuration, epochBudget);

    return { sector3DAOPriority, owner, otherAccount };
  }

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBiweeklyFixture() {
    console.log('deployBiweeklyFixture')

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Sector3DAOPriority = await ethers.getContractFactory("Sector3DAOPriority");
    const dao = "0x96Bf89193E2A07720e42bA3AD736128a45537e63";  // Sector#3
    const title = "Priority Title";
    const rewardToken = "0x942d6e75465C3c248Eb8775472c853d2b56139fE";  // Sector#3
    const epochDuration = 1;  // EpochDuration.Biweekly
    const epochBudget = (2.049 * 1e18).toString();  // 2.049
    const sector3DAOPriority = await Sector3DAOPriority.deploy(dao, title, rewardToken, epochDuration, epochBudget);

    return { sector3DAOPriority, owner, otherAccount };
  }

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMonthlyFixture() {
    console.log('deployMonthlyFixture')

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Sector3DAOPriority = await ethers.getContractFactory("Sector3DAOPriority");
    const dao = "0x96Bf89193E2A07720e42bA3AD736128a45537e63";  // Sector#3
    const title = "Priority Title";
    const rewardToken = "0x942d6e75465C3c248Eb8775472c853d2b56139fE";  // Sector#3
    const epochDuration = 2;  // EpochDuration.Monthly
    const epochBudget = (2.049 * 1e18).toString();  // 2.049
    const sector3DAOPriority = await Sector3DAOPriority.deploy(dao, title, rewardToken, epochDuration, epochBudget);

    return { sector3DAOPriority, owner, otherAccount };
  }

  describe("Deployment", function() {
    it("Should set the right DAO address", async function() {
      const { sector3DAOPriority } = await loadFixture(deployWeeklyFixture);

      expect(await sector3DAOPriority.dao()).to.equal("0x96Bf89193E2A07720e42bA3AD736128a45537e63");
    });

    it("Should set the right title", async function() {
      const { sector3DAOPriority } = await loadFixture(deployWeeklyFixture);

      expect(await sector3DAOPriority.title()).to.equal("Priority Title");
    });

    it("Should set the right reward token address", async function() {
      const { sector3DAOPriority } = await loadFixture(deployWeeklyFixture);

      expect(await sector3DAOPriority.rewardToken()).to.equal("0x942d6e75465C3c248Eb8775472c853d2b56139fE");
    });

    it("Should set the right epoch duration", async function() {
      const { sector3DAOPriority } = await loadFixture(deployWeeklyFixture);

      expect(await sector3DAOPriority.epochDuration()).to.equal(0);
    });

    it("Should set the right epoch budget", async function() {
      const { sector3DAOPriority } = await loadFixture(deployWeeklyFixture);

      expect(await sector3DAOPriority.epochBudget()).to.equal(ethers.utils.parseUnits("2.049"));
    });
  });

  describe("getEpochIndex - EpochDuration.Weekly", async function() {
    it("Should return 0 immediately after deployment", async function() {
      const { sector3DAOPriority } = await loadFixture(deployWeeklyFixture);

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(0);
    });

    it("Should return 1 after 1 week", async function() {
      const { sector3DAOPriority } = await loadFixture(deployWeeklyFixture);

      // Increase the time by 1 week
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 1 week later:", await time.latest());

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(1);
    });
  });

  describe("getEpochIndex - EpochDuration.Biweekly", async function() {
    it("Should return 0 immediately after deployment", async function() {
      const { sector3DAOPriority } = await loadFixture(deployBiweeklyFixture);

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(0);
    });

    it("Should return 0 after 1 week", async function() {
      const { sector3DAOPriority } = await loadFixture(deployBiweeklyFixture);

      // Increase the time by 1 week
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 1 week later:", await time.latest());

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(0);
    });

    it("Should return 1 after 2 weeks", async function() {
      const { sector3DAOPriority } = await loadFixture(deployBiweeklyFixture);

      // Increase the time by 2 weeks
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 2 * 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 2 weeks later:", await time.latest());

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(1);
    });

    it("Should return 1 after 3 weeks", async function() {
      const { sector3DAOPriority } = await loadFixture(deployBiweeklyFixture);

      // Increase the time by 3 weeks
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 3 * 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 3 weeks later:", await time.latest());

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(1);
    });

    it("Should return 2 after 4 weeks", async function() {
      const { sector3DAOPriority } = await loadFixture(deployBiweeklyFixture);

      // Increase the time by 4 weeks
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 4 * 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 4 weeks later:", await time.latest());

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(2);
    });
  });

  describe("getEpochIndex - EpochDuration.Monthly", async function() {
    it("Should return 0 immediately after deployment", async function() {
      const { sector3DAOPriority } = await loadFixture(deployMonthlyFixture);

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(0);
    });

    it("Should return 0 after 1 week", async function() {
      const { sector3DAOPriority } = await loadFixture(deployMonthlyFixture);

      // Increase the time by 1 week
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 1 week later:", await time.latest());

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(0);
    });

    it("Should return 0 after 2 weeks", async function() {
      const { sector3DAOPriority } = await loadFixture(deployMonthlyFixture);

      // Increase the time by 2 weeks
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 2 * 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 2 weeks later:", await time.latest());

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(0);
    });

    it("Should return 0 after 3 weeks", async function() {
      const { sector3DAOPriority } = await loadFixture(deployMonthlyFixture);

      // Increase the time by 3 weeks
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 3 * 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 3 weeks later:", await time.latest());

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(0);
    });

    it("Should return 1 after 4 weeks", async function() {
      const { sector3DAOPriority } = await loadFixture(deployMonthlyFixture);

      // Increase the time by 4 weeks
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 4 * 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 4 weeks later:", await time.latest());

      expect(await sector3DAOPriority.getEpochIndex()).to.equal(1);
    });
  });

  describe("addContribution", async function() {
    it("getContributionCount - should be zero immediately after deployment", async function() {
      const { sector3DAOPriority } = await loadFixture(deployWeeklyFixture);

      expect(await sector3DAOPriority.getContributionCount()).to.equal(0);
    });

    it("getContributionCount - should be 1 after first addition", async function() {
      const { sector3DAOPriority, owner } = await loadFixture(deployWeeklyFixture);

      const tx = await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Description (test)",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 10
      });
      console.log("tx:", tx);

      expect(await sector3DAOPriority.getContributionCount()).to.equal(1);
    });

    it("getContributionCount - should be 2 after second addition", async function() {
      const { sector3DAOPriority, owner } = await loadFixture(deployWeeklyFixture);

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Description (test)",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 10
      });

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Description (test)",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 10
      });

      expect(await sector3DAOPriority.getContributionCount()).to.equal(2);
    });

    it("addContribution", async function() {
      const { sector3DAOPriority, owner } = await loadFixture(deployWeeklyFixture);

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Description (test)",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 10
      });

      const contribution = await sector3DAOPriority.getContribution(0);
      console.log("contribution:", contribution)

      expect(contribution.epochIndex).to.equal(0);
      expect(contribution.contributor).to.equal(owner.address);
      expect(contribution.description).to.equal("Description (test)");
      expect(contribution.alignment).to.equal(2);
      expect(contribution.hoursSpent).to.equal(10);
    });

    it("addContribution - 2nd epoch", async function() {
      const { sector3DAOPriority, owner } = await loadFixture(deployWeeklyFixture);

      // Increase the time by 1 week
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 1 week later:", await time.latest());

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Description (test)",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 10
      });

      const contribution = await sector3DAOPriority.getContribution(0);
      console.log("contribution:", contribution)

      expect(contribution.epochIndex).to.equal(1);
      expect(contribution.contributor).to.equal(owner.address);
      expect(contribution.description).to.equal("Description (test)");
      expect(contribution.alignment).to.equal(2);
      expect(contribution.hoursSpent).to.equal(10);
    });

    it("addContribution - 2nd epoch, 2nd contribution", async function() {
      const { sector3DAOPriority, owner } = await loadFixture(deployWeeklyFixture);

      // Increase the time by 1 week
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 1 week later:", await time.latest());

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Description (test)",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 10
      });

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Description 2 (test)",
        alignment: 3,  // Alignment.Perfectly
        hoursSpent: 12
      });

      const contribution1 = await sector3DAOPriority.getContribution(0);
      console.log("contribution1:", contribution1)

      expect(contribution1.epochIndex).to.equal(1);
      expect(contribution1.contributor).to.equal(owner.address);
      expect(contribution1.description).to.equal("Description (test)");
      expect(contribution1.alignment).to.equal(2);
      expect(contribution1.hoursSpent).to.equal(10);

      const contribution2 = await sector3DAOPriority.getContribution(1);
      console.log("contribution2:", contribution2)

      expect(contribution2.epochIndex).to.equal(1);
      expect(contribution2.contributor).to.equal(owner.address);
      expect(contribution2.description).to.equal("Description 2 (test)");
      expect(contribution2.alignment).to.equal(3);
      expect(contribution2.hoursSpent).to.equal(12);
    });
  });

  describe("getAllocationPercentage", async function() {
    it("Should be 100% if one contributor", async function() {
      const { sector3DAOPriority, owner } = await loadFixture(deployWeeklyFixture);

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Contribution #1",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 5
      });

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Contribution #2",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 5
      });

      // Increase the time by 1 week
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 1 week later:", await time.latest());

      const allocationPercentage = await sector3DAOPriority.getAllocationPercentage(0);
      console.log("allocationPercentage:", allocationPercentage);
      
      expect(allocationPercentage).to.equal(100);
    });

    it("Should be 50% if two contributors", async function() {
      const { sector3DAOPriority, owner, otherAccount } = await loadFixture(deployWeeklyFixture);

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Contribution #1",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 5
      });

      await sector3DAOPriority.connect(otherAccount).addContribution({
        epochIndex: 2_049,
        contributor: otherAccount.address,
        description: "Contribution #2",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 5
      });

      // Increase the time by 1 week
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 1 week later:", await time.latest());

      const allocationPercentage = await sector3DAOPriority.getAllocationPercentage(0);
      console.log("allocationPercentage:", allocationPercentage);
      
      expect(allocationPercentage).to.equal(50);
    });
  });

  describe("getEpochReward", async function() {
    it("Should be 2.049 if one contributor", async function() {
      const { sector3DAOPriority, owner } = await loadFixture(deployWeeklyFixture);

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Contribution #1",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 5
      });

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Contribution #2",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 5
      });

      // Increase the time by 1 week
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 1 week later:", await time.latest());

      const epochReward = await sector3DAOPriority.getEpochReward(0);
      console.log("epochReward:", epochReward);
      
      expect(epochReward).to.equal(ethers.utils.parseUnits("2.049"));
    });

    it("Should be 1.0245 if two contributors", async function() {
      const { sector3DAOPriority, owner, otherAccount } = await loadFixture(deployWeeklyFixture);

      await sector3DAOPriority.addContribution({
        epochIndex: 2_049,
        contributor: owner.address,
        description: "Contribution #1",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 5
      });

      await sector3DAOPriority.connect(otherAccount).addContribution({
        epochIndex: 2_049,
        contributor: otherAccount.address,
        description: "Contribution #2",
        alignment: 2,  // Alignment.Mostly
        hoursSpent: 5
      });

      // Increase the time by 1 week
      console.log("Current time:", await time.latest());
      const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
      await time.increase(ONE_WEEK_IN_SECONDS);
      console.log("Time 1 week later:", await time.latest());

      const epochReward = await sector3DAOPriority.getEpochReward(0);
      console.log("epochReward:", epochReward);
      
      expect(epochReward).to.equal(ethers.utils.parseUnits("1.0245"));
    });
  });
});
