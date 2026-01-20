const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../pages/HomePage');
const SearchResultsPage = require('../pages/SearchResultsPage');
const ProductPage = require('../pages/ProductPage');

Given('user opens eBay website', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.open();
});

When('user searches for wallets', async function () {
  await this.homePage.searchFor('Wallets');
});

When('user selects a specific wallet product', async function () {
  this.searchResultsPage = new SearchResultsPage(this.page);

  // ✅ This method MUST handle tab switching internally
  this.page = await this.searchResultsPage.clickTargetWallet();
});

Then('wallet product details are visible', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.captureMainProductDetails();
});

Then('similar wallet products are displayed', async function () {
  await this.productPage.validateSimilarItems();
});
