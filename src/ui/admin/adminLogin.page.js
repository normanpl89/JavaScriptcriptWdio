const BasePage = require('../page');
const config = require('../../core/helpers/envHelper');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AdminLogin extends BasePage {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $('#emailInput');
  }

  get inputPassword() {
    return $('#passwordInput');
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }
  async isLoginDisplayed() {
    return (
      (await this.inputUsername.isDisplayed()) &&
      (await this.btnSubmit.isDisplayed())
    );
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open(`${config.admin_url}/sign-in`);
  }
}

module.exports = new AdminLogin();
