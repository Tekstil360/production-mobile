const CreateProductionSection = require('../pages/createProductionSection');
const OnBoardingPage = require('../pages/onBoardingPage');
const LoginPage = require('../pages/loginPage');
const DrawerMenuPage = require('../pages/drawerMenuPage');
describe('Create Production Section Test Suite', () => {
  beforeAll(async () => {
    await device.launchApp();
    await OnBoardingPage.tapOnBoardingButton(4);
    await LoginPage.login('ozkankocakaplan@gmail.com', '123456');
    await DrawerMenuPage.openDrawerMenu();
    await DrawerMenuPage.navigateTo('Productions');
  });

  it('should enter production name and select an icon', async () => {
    const createProductionSection = new CreateProductionSection();
    await createProductionSection.tapCreateProductionButton();
    await createProductionSection.selectIcon(2);
    await createProductionSection.enterProductionName('Test Production');
    if (
      await expect(createProductionSection.recommendationText).toBeVisible()
    ) {
      await createProductionSection.tapRecommendation();
      await expect(createProductionSection.nameInput).toHaveText('Ceket');
    }
    await createProductionSection.tapNextButton();
  });
});
