// import puppeteer from "puppeteer"; // const puppeteer = require("puppeteer");

import {
  exp,
  br,
  pg,
  checkText,
  clearInputLine,
  checkURL
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
      desc: "Sign In проверка поля ввода Email",
      urlHome: "http://localhost:3000/signin",
      enter: "#email",
      errorTxt: '[data-e2e="error-text"]',
      log: '[data-e2e="btn-login"]'
    },

    {
      desc: "Sign In проверка поля ввода Password",
      urlHome: "http://localhost:3000/signin",
      enter: "#password",
      errorTxt: '[data-e2e="error-text"]',
      log: '[data-e2e="btn-login"]'
    },
    {
      desc: "Sign In проверка входа",
      urlHome: "http://localhost:3000/signin",
      enterP: "#password",
      enterE: "#email",
      errorTxt: '[data-e2e="error-text"]',
      log: '[data-e2e="btn-login"]',
      logOut: "#root > div > nav > div > ul > li:nth-child(2)"
    },
    {
      desc: "Sign Up проверка поля ввода Email",
      urlHome: "http://localhost:3000/signin",
      enterEmail: "#email",
      errorTxt: '[data-e2e="error-text"]',
      log: '[data-e2e="btn-signup"]',
      sigUp: "#root > div > nav > div > ul > li:nth-child(1) > a",
      btnSigUp: "#root > div > div > form > div:nth-child(6) > button"
    },
    {
      desc: "Проверка поля Password",
      urlHome: "http://localhost:3000/signin",
      enterPassword: "#password",
      errorTxt: '[data-e2e="error-text"]',
      log: '[data-e2e="btn-signup"]',
      sigUp: "#root > div > nav > div > ul > li:nth-child(1) > a",
      btnSigUp: "#root > div > div > form > div:nth-child(6) > button"
    },
    {
      desc: "Sign Up проверка поля First Name",
      urlHome: "http://localhost:3000/signin",
      enterFirstName: "#firstName",
      errorTxt: '[data-e2e="error-text"]',
      log: '[data-e2e="btn-signup"]',
      sigUp: "#root > div > nav > div > ul > li:nth-child(1) > a",
      btnSigUp: "#root > div > div > form > div:nth-child(6) > button"
    },
    {
      desc: "Проверка поля ввода Last Name",
      urlHome: "http://localhost:3000/signin",
      enterLastName: "#lastName",
      errorTxt: '[data-e2e="error-text"]',
      log: '[data-e2e="btn-signup"]',
      sigUp: "#root > div > nav > div > ul > li:nth-child(1) > a",
      btnSigUp: "#root > div > div > form > div:nth-child(6) > button"
    },
    {
      desc: "Проверка поля ввода Email и Password",
      urlHome: "http://localhost:3000/signin",
      enterEmail: "#email",
      enterPassword: "#password",
      errorTxt: '[data-e2e="error-text"]',
      log: '[data-e2e="btn-signup"]',
      sigUp: "#root > div > nav > div > ul > li:nth-child(1) > a",
      btnSigUp: "#root > div > div > form > div:nth-child(6) > button"
    }
  ];
  ///Проверка SIGN IN
  const checkFirstTest = testCase => {
    it(testCase.desc, async () => {
      await page.goto(testCase.urlHome);
      await page.waitFor(2000);
      //Bалидный Email
      await page.type(testCase.enter, "test@t.tt", { delay: 50 });
      await page.click(testCase.log);
      await page.waitFor(2000);
      await checkText(page, testCase.errorTxt, "Login failed");
      await page.click(testCase.enter);
      await page.waitFor(2000);
      await clearInputLine(page);
      //Email без @
      await page.type(testCase.enter, "testt.tt", { delay: 50 });
      await page.click(testCase.enter);
      await page.waitFor(2000);
      await checkText(page, testCase.errorTxt, "Login failed");
      await page.waitFor(2000);
      await page.click(testCase.log);
      await clearInputLine(page);
      //Email из цифр
      await page.type(testCase.enter, "1234566", { delay: 50 });
      await page.click(testCase.log);
      await page.waitFor(2000);
      await checkText(page, testCase.errorTxt, "Login failed");
    });
  };

  const checkSecondTest = testCase => {
    it(testCase.desc, async () => {
      await page.goto(testCase.urlHome);
      await page.waitFor(2000);
      //Bалидный Password с пустым полем для Email
      await page.type(testCase.enter, "123456", { delay: 10 });
      await page.click(testCase.log);
      await page.waitFor(2000);
      await checkText(page, testCase.errorTxt, "Login failed");
      await page.click(testCase.enter);
      await page.waitFor(2000);
      await clearInputLine(page);
      //Password меньше 6 значений
      await page.type(testCase.enter, "test", { delay: 10 });
      await page.click(testCase.enter);
      await page.waitFor(2000);
      await checkText(page, testCase.errorTxt, "Login failed");
      await page.waitFor(2000);
      await page.click(testCase.log);
      await clearInputLine(page);
      //Password из цифр
      await page.type(testCase.enter, "1234566899999999", { delay: 10 });
      await page.click(testCase.log);
      await page.waitFor(2000);
      await checkText(page, testCase.errorTxt, "Login failed");
    });
  };

  const checkThirdTest = testCase => {
    it(testCase.desc, async () => {
      await page.goto(testCase.urlHome);
      await page.waitFor(2000);
      //Bалидный Email с невалидным Password
      await page.type(testCase.enterE, "test@t.tt", { delay: 10 });
      await page.type(testCase.enterP, "1241qw", { delay: 10 });
      await page.click(testCase.log);
      await page.waitFor(2000);
      await checkText(page, testCase.errorTxt, "Login failed");
      await page.click(testCase.enterE);
      await page.waitFor(2000);
      await clearInputLine(page);
      ///Bалидный Password с невалидным Email
      await page.type(testCase.enterE, "testt.tt", { delay: 10 });
      await page.click(testCase.enterP);
      await page.waitFor(2000);
      await clearInputLine(page);
      await page.type(testCase.enterP, "123456", { delay: 10 });
      ///Валидные Password и Email
      await page.click(testCase.enterE);
      await page.waitFor(2000);
      await clearInputLine(page);
      await page.type(testCase.enterE, "test@t.tt", { delay: 10 });
      await page.waitFor(2000);
      await page.click(testCase.log);
      await page.waitFor(2000);
      await checkURL(page, "http://localhost:3000/");
      await page.waitFor(2000);
      await page.click(testCase.logOut);
    });
  };

  /////////Signup
  const checkFourthTest = testCase => {
    it(testCase.desc, async () => {
      await page.goto(testCase.urlHome);
      await page.waitFor(2000);
      await page.click(testCase.sigUp);
      await page.waitFor(2000);
      //Пустой Email
      await page.type(testCase.enterEmail, "", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is badly formatted."
      );
      await page.click(testCase.enterEmail);
      //Bалидный Email без заполнения остальных полей
      await page.type(testCase.enterEmail, "test@t.tt", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The password must be 6 characters long or more."
      );
      await page.click(testCase.enterEmail);
      await clearInputLine(page);
      /////Невалидный Email
      await page.type(testCase.enterEmail, "test@t.ttvg", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The password must be 6 characters long or more."
      );
    });
  };

  const checkFifthTest = testCase => {
    it(testCase.desc, async () => {
      await page.goto(testCase.urlHome);
      await page.waitFor(2000);
      await page.click(testCase.sigUp);
      await page.waitFor(2000);
      //Пустые поля
      await page.type(testCase.enterPassword, "", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is badly formatted."
      );
      await page.click(testCase.enterPassword);
      //Bалидный Password
      await page.type(testCase.enterPassword, "123456", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is badly formatted."
      );
      await page.click(testCase.enterPassword);
      await clearInputLine(page);
      /////Невалидный Password без заполнения остальных полей
      await page.type(testCase.enterPassword, "tezzz", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is badly formatted."
      );
    });
  };
  const checkSixthTest = testCase => {
    it(testCase.desc, async () => {
      await page.goto(testCase.urlHome);
      await page.waitFor(2000);
      await page.click(testCase.sigUp);
      await page.waitFor(2000);
      //Пустые поля
      await page.type(testCase.enterFirstName, "", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is badly formatted."
      );
      await page.click(testCase.enterFirstName);
      //Bалидный First Name без заполнения остальных полей
      await page.type(testCase.enterFirstName, "Elena", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is badly formatted."
      );
      await page.click(testCase.enterFirstName);
      await clearInputLine(page);
      /////Невалидный First Name без заполнения остальных полей
      await page.type(testCase.enterFirstName, "2424152", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is badly formatted."
      );
    });
  };
  const checkSeventhTest = testCase => {
    it(testCase.desc, async () => {
      await page.goto(testCase.urlHome);
      await page.waitFor(2000);
      await page.click(testCase.sigUp);
      await page.waitFor(2000);
      //Пустые поля
      await page.type(testCase.enterLastName, "", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is badly formatted."
      );
      await page.click(testCase.enterLastName);
      //Bалидный First Name без заполнения остальных полей
      await page.type(testCase.enterLastName, "Petrova", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is badly formatted."
      );
      await page.click(testCase.enterLastName);
      await clearInputLine(page);
      /////Невалидный First Name без заполнения остальных полей
      await page.type(testCase.enterLastName, "2424152", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is badly formatted."
      );
    });
  };
  const checkEighthTest = testCase => {
    it(testCase.desc, async () => {
      await page.goto(testCase.urlHome);
      await page.waitFor(2000);
      await page.click(testCase.sigUp);
      await page.waitFor(2000);
      //Валидный Email, но Password меньше 6
      await page.type(testCase.enterEmail, "tt@t.tt", { delay: 50 });
      await page.type(testCase.enterPassword, "123", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "Password should be at least 6 characters"
      );
      //Невалидный Email,валидный Password
      await page.click(testCase.enterEmail);
      await clearInputLine(page);
      await page.type(testCase.enterEmail, "tttt", { delay: 50 });
      await page.click(testCase.enterPassword);
      await clearInputLine(page);

      await page.type(testCase.enterPassword, "123456", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "Password should be at least 6 characters"
      );
      ///Дублирующие данные
      await page.click(testCase.enterEmail);
      await clearInputLine(page);
      await page.type(testCase.enterEmail, "test@t.tt", { delay: 50 });
      await page.click(testCase.enterPassword);
      await clearInputLine(page);

      await page.type(testCase.enterPassword, "123456", { delay: 50 });
      await page.click(testCase.btnSigUp);
      await page.waitFor(2000);
      await checkText(
        page,
        testCase.errorTxt,
        "The email address is already in use by another account."
      );
      ///Валидные данные
      // await page.click(testCase.enterEmail);
      // await clearInputLine(page);
      // await page.type(testCase.enterEmail, "le@t.tt", { delay: 50 });
      // await page.click(testCase.enterPassword);
      // await clearInputLine(page);

      // await page.type(testCase.enterPassword, "098765", { delay: 50 });
      // await page.click(testCase.btnSigUp);
      // await page.waitFor(4000);
      // await checkURL(page, "http://localhost:3000/");
    });
  };
  checkFirstTest(caseFirstTest[0]);
  checkSecondTest(caseFirstTest[1]);
  checkThirdTest(caseFirstTest[2]);
  checkFourthTest(caseFirstTest[3]);
  checkFifthTest(caseFirstTest[4]);
  checkSixthTest(caseFirstTest[5]);
  checkSeventhTest(caseFirstTest[6]);
  checkEighthTest(caseFirstTest[7]);
});
