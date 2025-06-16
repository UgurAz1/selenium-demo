import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from '../BasePage';
import { LoginPage } from './LoginPage';
import { Profile } from '../profile/Profile';

export class AccountManager extends BasePage {
  private readonly loginPage: LoginPage;

  constructor(driver: WebDriver) {
    super(driver);
    this.loginPage = new LoginPage(driver);
  }

  async openAccountEntryPoint() {
    const profileMenuElements = await this.driver.findElements(By.css('#profileMenu'));
    if (!profileMenuElements.length) throw new Error('No #profileMenu found');
    await profileMenuElements[0].click();
  }

  async goToProfile(): Promise<Profile> {
    const profileLink = await this.driver.findElement(
      By.xpath("//div[@id='profileMenu']//a[normalize-space()='Profile']")
    );
    await profileLink.click();
    return new Profile(this.driver);
  }

  async goToLogin(): Promise<LoginPage> {
    await this.openAccountEntryPoint();
    return this.login;
  }

  async logout() {
    const logoutLink = await this.driver.findElement(
      By.xpath("//div[@id='profileMenu']//a[normalize-space()='Logout']")
    );
    await logoutLink.click();
  }

  get login() {
    return this.loginPage;
  }

  get profile() {
    return new Profile(this.driver);
  }
}
