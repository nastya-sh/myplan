import puppeteer from "puppeteer";
// import { todoList, url, all } from "../page/todo.po";

/* export const div = () => {
  return 10 / 5;
};
 */

/**
 * Задаем разрешение браузера
 * @param page
 */
export const exp = page => {
  return page.emulate({
    viewport: {
      width: 1000,
      height: 2400
    },
    userAgent: ""
  });
};

/**
 * Браузер
 */
export const br = () => {
  return puppeteer.launch({
    headless: false
  });
};

/**
 * Создает страницу в браузере
 * @param browser
 */
export const pg = browser => {
  return browser.newPage();
};

/**
 * Очищает поле ввода
 * @param page
 */

export const clearInputLine = async page => {
  await page.keyboard.down("ControlLeft");
  await page.keyboard.down("A");
  await page.keyboard.up("ControlLeft");
  await page.keyboard.up("A");
  await page.keyboard.down("Backspace");
};

/**
 * Очищает поле ввода вариант 2
 * @param page
 */

export const clearInputLine2 = async page => {
  await page.click(".search-input");
  await page.click(".search-input");
  await page.keyboard.down("Backspace");
};

/**
 * Клик на Enter
 * @param page
 */

export const clickEnter = async page => {
  await page.keyboard.down("Enter");
  await page.keyboard.up("Enter");
};

/**
 * Проверка длины
 * @param page, count, selector
 */

export const checkLength = async (page, selector, count) => {
  let currentLength = await page.$$eval(selector, elem => elem.length);
  await expect(currentLength).toEqual(count);
};

/**
 * Проверка цвета
 * @param page, selector, color
 */

export const checkColor1 = async (page, selector, color) => {
  let currentColor = await page.$eval(
    selector,
    elem => window.getComputedStyle(elem).backgroundColor //color
  );
  await expect(currentColor).toEqual(color);
};

/**
 * Проверка текста
 * @param page, selector
 */

export const checkText = async (page, selector, content) => {
  let currentResul1t9 = await page.$eval(selector, elem => elem.textContent);
  await expect(currentResul1t9).toEqual(content);
};

/**
 * Проверка инпут
 * @param page, selector, color
 */

export const checkTextContent = async (page, selector, content) => {
  let currentResult1 = await page.$eval(selector, elem => elem.textContent);
  await expect(currentResult1).toEqual(content);
};

export const checkTextInput = async (page, selector, content) => {
  let currentResult1 = await page.$eval(selector, elem => elem.value);
  await expect(currentResult1).toEqual(content);
};

/**
 * Проверка стиля
 * @param page, selector, color
 */

export const checkStyle = async (page, selector) => {
  const currentColor91 = await page.$eval(selector, elem =>
    window.getComputedStyle(elem).getPropertyValue("text-decoration-line")
  );
  console.log(currentColor91);
  await expect(currentColor91).toEqual("line-through");
};

/**
 * Проверка URL
 * @param page, url
 */

export const checkURL = async (page, url) => {
  let urlLogin = await page.evaluate(() => location.href);
  await expect(urlLogin).toEqual(url);
};
