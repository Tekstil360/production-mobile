class LoginPage {
  get emailInput() {
    return element(by.id('emailInput'));
  }
  get passwordInput() {
    return element(by.id('passwordInput'));
  }
  get loginButton() {
    return element(by.id('loginButton'));
  }
  async login(email, password) {
    await this.emailInput.replaceText(email);
    await this.passwordInput.replaceText(password);
    await this.loginButton.tap();
  }
}
module.exports = new LoginPage();
