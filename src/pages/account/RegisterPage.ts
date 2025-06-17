import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from '../BasePage';

export interface RegisterData {
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  zip: string;
  city: string;
  countryNumber: number;
  email: string;
  repeatEmail: string;
  birthdayDay: number;
  birthdayMonth: number;
  birthdayYear: number;
  password: string;
  repeatPassword: string;
}

export class RegisterPage extends BasePage {
  constructor(driver: WebDriver) {
    super(driver);
  }

  private goBackToLoginButton = By.css("a.text-myspa-blue.underline");
  private salutation = By.id('salutation');
  private firstName = By.id('firstName');
  private lastName = By.id('lastName');
  private street = By.id('street');
  private houseNumber = By.id('houseNumber');
  private zipCode = By.id('zip');
  private city = By.id('city');
  private country = By.id('country');
  private emailField = By.id('email');
  private confirmEmail = By.id('emailRepeat');
  private birthdayDay = By.id('birthdayDay');
  private birthdayMonth = By.id('birthdayMonth');
  private birthdayYear = By.id('birthdayYear');
  private passwordField = By.id('password');
  private confirmPassword = By.id('passwordRepeat');
  private policyCheckBox = By.id('dataProtectionConfirmation');
  private registerButton = By.xpath("//button[contains(.,'Register')]");

  async register(data: RegisterData) {
    await this.selectByValue(this.salutation, '0');
    await this.type(this.firstName, data.firstName);
    await this.type(this.lastName, data.lastName);
    await this.type(this.street, data.street);
    await this.type(this.houseNumber, data.houseNumber);
    await this.type(this.zipCode, data.zip);
    await this.type(this.city, data.city);
    await this.selectByValue(this.country, `${data.countryNumber}`);
    await this.type(this.emailField, data.email);
    await this.type(this.confirmEmail, data.repeatEmail);
    await this.selectByValue(this.birthdayDay, `${data.birthdayDay}`);
    await this.selectByValue(this.birthdayMonth, `${data.birthdayMonth}`);
    await this.selectByValue(this.birthdayYear, `${data.birthdayYear}`);
    await this.type(this.passwordField, data.password);
    await this.type(this.confirmPassword, data.repeatPassword);
    await this.click(this.policyCheckBox);
    await this.click(this.registerButton);
  }

  async goBackToLogin() {
    await this.click(this.goBackToLoginButton);
  }

  private async selectByValue(selectLocator: By, value: string) {
    const element = await this.find(selectLocator);
    await this.driver.executeScript(
      'arguments[0].value = arguments[1]; arguments[0].dispatchEvent(new Event("change"));',
      element,
      value
    );
  }
}
