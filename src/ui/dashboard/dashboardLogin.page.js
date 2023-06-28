const BasePage = require('../page');
const timeUtils = require('../../../src/core/helpers/TimeUtils');
const config = require('../../core/helpers/envHelper');

class DashboardLoginPage extends BasePage {
  /**
   * define selectors using getter methods
   */
  get loginTitle() {
    return $("//h2[text()='Welcome!']");
  }

  get emailInput() {
    return $('input#emailInput');
  }

  get passwordInput() {
    return $('input#passwordInput');
  }

  get captchaCheckbox() {
    return $('div.recaptcha-checkbox-border');
  }

  get recaptchaIframe() {
    return $('//*[@title="reCAPTCHA"]');
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  get recaptchaBtn() {
    return $('div.recaptcha-checkbox-border');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(username, password) {
    await this.emailInput.setValue(username);
    await this.passwordInput.addValue(password);
    await this.btnSubmit.click();
    await timeUtils.sleep(5000);
  }

  async openNewWindow() {
    await browser.newWindow(`${config.dashboard_url}/sign-in`);
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    await timeUtils.sleep(10000);
  }

  async changeMainWindow() {
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[0]);
    await timeUtils.sleep(3000);
  }

  async open() {
    await browser.newWindow(`${config.dashboard_url}/sign-in`);
  }

  async isLoginPageDisplayed() {
    return this.emailInput.isDisplayed() && this.passwordInput.isDisplayed();
  }
}

module.exports = new DashboardLoginPage();
