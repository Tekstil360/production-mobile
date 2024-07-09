import {by, element, device, expect} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('Should type "Özkan" into TextInput', async () => {
    const textInput = element(by.id('textInputId'));
    await textInput.tap();
    await textInput.typeText('Özkan');

    await expect(textInput).toHaveText('Özkan');
  });
});
