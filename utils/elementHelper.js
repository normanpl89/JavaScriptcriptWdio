/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
class ElementHelper {
  /**
   * wait for the element to be displayed then click on it
   * @param webdriverio element.
   */
  async clickElement(elem) {
    await elem.waitForDisplayed({ timeout: 20000 });
    await elem.click();
  }
  /**
   * This method will clear input field by sending backspaces.
   *
   * @param {$("input.email")} webElement
   */
  async clearInputField(webElement) {
    const selectorValue = await webElement.getValue();
    const backSpaces = new Array(selectorValue.length).fill('Backspace');
    await webElement.setValue(backSpaces);
  }
}

module.exports = new ElementHelper();
