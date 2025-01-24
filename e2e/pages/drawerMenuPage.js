class DrawerMenuPage {
  get drawerMenuButton() {
    return element(by.id('drawerMenuButton'));
  }

  async drawerMenuItem(routeName) {
    return element(by.id(`drawerMenuItem-${routeName}`));
  }

  async openDrawerMenu() {
    await this.drawerMenuButton.tap();
  }

  async navigateTo(routeName) {
    const menuItem = await this.drawerMenuItem(routeName);
    await expect(menuItem).toBeVisible(); 
    await menuItem.tap(); 
  }
}

module.exports = new DrawerMenuPage();
