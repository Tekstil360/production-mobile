// e2e/pages/onBoardingPage.js

class OnBoardingPage {
  get onboardingButton() {
    return element(by.id('onboardingButton'));
  }

  async tapOnBoardingButton(step) {
    for (let i = 0; i < step; i++) {
      await this.onboardingButton.tap();
    }
  }
}

module.exports = new OnBoardingPage();
