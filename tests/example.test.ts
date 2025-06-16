import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.BASE_URL ?? ''


describe('Todo App Test', function () {
  this.timeout(20000);
  let driver: WebDriver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(URL);
  });

  after(async () => {
    await driver.quit();
  });

  it('should add a new todo item', async () => {
    // const input = await driver.findElement(By.id('sampletodotext'));
    // await input.sendKeys('Eigenes Projekt rockt!', Key.RETURN);
    // const lastItem = await driver.findElement(By.xpath('//li[last()]'));
    // const text = await lastItem.getText();
    // expect(text).to.equal('Eigenes Projekt rockt!');
  });
});
