import { By, WebDriver, Locator } from 'selenium-webdriver';
import dotenv from "dotenv";
dotenv.config();

const DEBUG = process.env.DEBUG === 'true';

export class BasePage {
  constructor(protected readonly driver: WebDriver) { }

  async waitForTitle(title: string | RegExp) {
    await this.driver.wait(async () => {
      const pageTitle = await this.driver.getTitle();
      return typeof title === 'string'
        ? pageTitle === title
        : title.test(pageTitle);
    }, 5000);
  }

  async expectUrl(partialUrl: string) {
    await this.driver.wait(async () => {
      const currentUrl = await this.driver.getCurrentUrl();
      return currentUrl.includes(partialUrl);
    }, 5000);
  }

  async isVisible(by: By) {
    const element = await this.driver.findElement(by);
    return await element.isDisplayed();
  }

  async scrollToElement(by: By) {
    const element = await this.driver.findElement(by);
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', element);
  }

  async acceptCookiesIfVisible() {
    try {
      const cookieButton = await this.driver.findElement(
        By.xpath("//button[contains(., 'Nur Notwendige')]")
      );
      if (await cookieButton.isDisplayed()) {
        await cookieButton.click();
      }
    } catch (e) {

    }
  }

  async subscribeToNewsletter(email: string) {
    const banner = await this.driver.findElement(
      By.css(".bg-white > div:nth-child(2) > div > .border-myspa-blue")
    );
    await banner.click();

    const input = await this.driver.findElement(By.css("input[type='email']"));
    await input.sendKeys(email);

    const button = await this.driver.findElement(By.css("form button"));
    await button.click();
  }

  async type(locator: Locator, inputText: string) {
    return await this.find(locator).sendKeys(inputText);
  }

  async click(locator: Locator) {
    return await this.find(locator).click();
  }

  find(locator: Locator) {
    return this.driver.findElement(locator);
  }

  async findFirst(locator: By) {
    const elements = await this.driver.findElements(locator);
    if (!elements.length) throw new Error(`No element found for: ${locator}`);
    return elements[0];
  }

  async pause(ms = 10000) {
    if (DEBUG) {
      await this.driver.sleep(ms);
    }
  }
}
