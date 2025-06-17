import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { expect } from 'chai';
import dotenv from "dotenv";
import { LoginPage } from '../src/pages/account/LoginPage';
import { UserHelper } from "../src/utils/UserHelper";

dotenv.config();

const URL = process.env.BASE_URL ?? ''
const user = UserHelper.load();


describe('TC-01-Login', function () {
  let driver: WebDriver;
  let loginPage: LoginPage;

  const options = new chrome.Options();
  options.addArguments('--ignore-certificate-errors');

  const capabilities = {
    browserName: 'chrome',
    acceptInsecureCerts: true
  };

  beforeEach(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .usingServer('http://localhost:4444/wd/hub')
      .withCapabilities(capabilities)
      .build();

    loginPage = new LoginPage(driver)
    await driver.get(`${URL}/login`);
  });

  afterEach(async () => {
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

  it('Login should fail with wrong password', async () => {
    const errorToastMessage = By.css("div.bg-myspa-error.flex")

    await loginPage.acceptCookiesIfVisible()
    await loginPage.login("user@test.de", "_")
    const element = await driver.wait(until.elementLocated(errorToastMessage), 5000);
    const text = await element.getText();

    expect(text).to.equal('Login failed. User not found.');

  });
});
