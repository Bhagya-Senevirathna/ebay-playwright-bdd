class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.firstProductLink = 'a[href*="/itm/"]';
  }

  async clickTargetWallet() {
    const productLink = this.page.locator(this.firstProductLink).first();

    await productLink.waitFor({ state: 'visible', timeout: 30000 });

    // Handle NEW TAB or SAME TAB safely
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page').catch(() => null),
      productLink.click({ force: true })
    ]);

    if (newPage) {
      // New tab opened
      await newPage.waitForLoadState('domcontentloaded');
      this.page = newPage;
    } else {
      // Same tab navigation (JS-based)
      await this.page.waitForLoadState('domcontentloaded');
    }

    // Final safety check: product title must exist
    await this.page.locator('h1').first().waitFor({
      timeout: 30000
    });

    return this.page;
  }
}

module.exports = SearchResultsPage;
