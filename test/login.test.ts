import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import dotenv from "dotenv";
import { LoginPage } from '../pages/account/LoginPage';
import { UserHelper } from "../utils/UserHelper";

dotenv.config();

const URL = process.env.BASE_URL ?? ''
const user = UserHelper.load();


describe('TC-01-Login', function () {
  this.timeout(20000);
  let driver: WebDriver;
  let loginPage: LoginPage;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(driver)
    await driver.get(`${URL}/login`);
  });

  after(async () => {
    await driver.quit();
  });

  it('Login should succeed', async () => {
    const messageLocator = By.css("h2.text-myspa-blue.text-4xl")

    await loginPage.acceptCookiesIfVisible()
    await loginPage.login(user.email, user.password)
    const element = await driver.wait(until.elementLocated(messageLocator), 5000);
    const text = await element.getText();

    expect(text).to.include('CHOOSE YOUR LOCATION');

  });
});
