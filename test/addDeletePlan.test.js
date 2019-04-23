// import puppeteer from "puppeteer"; // const puppeteer = require("puppeteer");

import {
  exp,
  br,
  pg,
  checkText,
  clearInputLine,
  checkURL,
  checkLength
} from "../helper/helper";

// jest.config.js
module.exports = {
  setupTestFrameworkScriptFile: "./jest.setup.js"
};
// jest.setup.js
jest.setTimeout(30000);

describe("Проверка ввода", () => {
  let page;
  let browser;

  beforeAll(async () => {
    browser = await br();
    page = await pg(browser);
    exp(page);
  });

  afterAll(async () => {
    browser.close();
  });

  const caseFirstTest = [
    {
      desc: "Вход и проверка переходов",
      urlHome: "http://localhost:3000/signin",
      enterE: "#email",
      enterP: "#password",
      log: '[data-e2e="btn-login"]',
      newPro: '[data-e2e="new-project"]',
      myPlan: "#root > div > nav > div > a",
      user: '[data-e2e="profile"]'
    },

    {
      desc: "Добавление планов",
      urlHome: "http://localhost:3000/signin",
      log: '[data-e2e="btn-login"]',
      newPro: "#root > div > nav > div > ul > li:nth-child(1) > a",
      myPlan: "#root > div > nav > div > a",
      user: '[data-e2e="profile"]',
      title: "#title",
      ProContent: "#content",
      btnCreate: '[data-e2e="btn-create"]'
    }
  ];
  const checkFirstTest = testCase => {
    it(testCase.desc, async () => {
      await page.goto(testCase.urlHome);
      await page.waitFor(2000);
      await page.type(testCase.enterE, "test@t.tt", { delay: 10 });
      await page.type(testCase.enterP, "123456", { delay: 10 });
      await page.waitFor(2000);
      await page.click(testCase.log);
      await page.waitFor(2000);
      await checkURL(page, "http://localhost:3000/");
      await page.waitFor(2000);
      await page.click(testCase.newPro);
      await page.waitFor(2000);
      await page.click(testCase.myPlan);
      await page.waitFor(2000);
      await page.click(testCase.newPro);
      await page.waitFor(2000);
      await page.click(testCase.user);
      await page.waitFor(2000);
    });
  };

  const checkSecondTest = testCase => {
    it(testCase.desc, async () => {
      await page.goto(testCase.urlHome);
      await page.waitFor(5000);
      await page.click(testCase.newPro);
      await checkText(page, '[data-e2e="title-form"]', "Create new project");
      await checkText(page, '[data-e2e="btn-create"]', "Create");
      await page.type(testCase.title, "Test", { delay: 10 });
      await page.type(testCase.ProContent, "Test", {
        delay: 10
      });
      await page.waitFor(2000);
      await page.click('[data-e2e="btn-create"] button'); //testCase.btnCreate);
      await page.waitFor(4000);
      await checkURL(page, "http://localhost:3000/");
    });
  };

  checkFirstTest(caseFirstTest[0]);
  checkSecondTest(caseFirstTest[1]);
});
