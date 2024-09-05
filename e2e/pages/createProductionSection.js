class CreateProductionSection {
  get nameInput() {
    return element(by.id('productionNameInput'));
  }
  get recommendationText() {
    return element(by.id('recommendationText'));
  }
  get createProductionButton() {
    return element(by.id('createProductionButton'));
  }
  get iconsShow() {
    return element(by.id('productionIconButton'));
  }
  get nextButton() {
    return element(by.id('nextButton'));
  }
  get addTransactionButton() {
    return element(by.id('addTransactionButton'));
  }
  async tapCreateProductionButton() {
    await this.createProductionButton.tap();
  }
  async iconButton(index) {
    return element(by.id(`icon-${index}`));
  }
  async enterProductionName(name) {
    await this.nameInput.tap();
    await this.nameInput.typeText(name);
    await this.nameInput.tapReturnKey();
  }
  async selectIcon(iconIndexNumber) {
    await this.iconsShow.tap();
    const icon = await this.iconButton(iconIndexNumber);
    await expect(icon).toBeVisible();
    await icon.tap();
  }
  async tapNextButton() {
    await this.nextButton.tap();
  }

  async tapRecommendation() {
    const recommendation = await this.recommendationText;
    await expect(recommendation).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await recommendation.tap();
  }
}

module.exports = CreateProductionSection;
