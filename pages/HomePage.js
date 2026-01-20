class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = '#gh-ac';
    this.searchButton = '//*[@id="gh-search-btn"]';
  }

  async open() {
    await this.page.goto('https://www.ebay.com/', {
      waitUntil: 'domcontentloaded'
    });
  }

  async searchFor(product) {
    await this.page.fill(this.searchInput, product);
    await this.page.locator(`xpath=${this.searchButton}`).click();
  }
}

module.exports = HomePage;
