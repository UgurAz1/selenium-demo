import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from '../BasePage';
import { RegisterPage } from './RegisterPage';

export class LoginPage extends BasePage {
  constructor(driver: WebDriver) {
    super(driver);
  }

  private emailField = By.id('email');
  private passwordField = By.id('password');
  private loginButton = By.css("button.w-full.bg-myspa-blue-alt");
  private registerButton = By.css("a.text-myspa-blue.underline");
  private goBackToLoginButton = By.xpath("//span[normalize-space(text())='Back to login']");
  private forgotPasswordButton = By.css("span.text-myspa-blue.underline");
  private resetEmailInput = By.css("(//input[@id='email'])[1]");
  private sendResetLinkButton = By.xpath("(//button[@aria-labelledby='button-content']//div)[1]");
  private resetModalClose = By.xpath("//div[@class='flex flex-col']/following-sibling::img[1]");

  async login(email: string, password: string) {
    const emailInput = await this.findFirst(this.emailField);
    await emailInput.sendKeys(email);
    await this.type(this.passwordField, password);
    await this.click(this.loginButton);
  }

  async goToRegister() {
    await this.click(this.registerButton);
    return new RegisterPage(this.driver);
  }

  async goToResetPassword() {
    await this.click(this.forgotPasswordButton);
  }

  async goBackToLogin() {
    await this.click(this.goBackToLoginButton);
  }

  async enterEmailToResetPassword(email: string) {
    await this.type(this.resetEmailInput, email);
  }

  async sendEmailToResetPassword() {
    await this.click(this.sendResetLinkButton);
  }

  async closeModal() {
    await this.click(this.resetModalClose);
  }
}
