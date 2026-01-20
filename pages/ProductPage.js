const assert = require('assert');

class ProductPage {
  constructor(page) {
    this.page = page;

    // Main product selectors
    this.mainTitle = 'h1 span.ux-textspans';
    this.mainPrice = 'div[data-testid="x-price-primary"] span.ux-textspans';

    // Similar items
    this.similarHeader = 'h2:has-text("Similar items")';
    this.similarCards = 'div.KVUG.wxTY.o2ze section';
  }

  /* -------------------------
     Helper: extract meaningful words
  -------------------------- */
  extractWords(text) {
    const stopWords = [
      'for', 'with', 'and', 'the', 'a', 'an', 'of',
      'rfid', 'blocking', 'mens', "men's", 'men',
      'new', 'black', 'brown', 'one', 'size'
    ];

    return text
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word));
  }

  /* -------------------------
     Capture main product
  -------------------------- */
  async captureMainProductDetails() {
    await this.page.waitForLoadState('domcontentloaded');

    // Debug screenshot
    await this.page.screenshot({
      path: 'debug-product-page.png',
      fullPage: true
    });

    await this.page.locator(this.mainTitle).first().waitFor({
      timeout: 60000
    });

    const titleText = await this.page.locator(this.mainTitle).first().textContent();
    const priceText = await this.page.locator(this.mainPrice).first().textContent();

    this.mainName = titleText.trim();
    this.mainPriceValue = parseFloat(priceText.replace(/[^0-9.]/g, ''));

    console.log('\n🟢 MAIN PRODUCT');
    console.log('Title:', this.mainName);
    console.log('Price:', this.mainPriceValue);

    // Safety check
    assert.ok(
      !this.mainName.toLowerCase().includes('results for'),
      '❌ Still on search results page'
    );

    assert.ok(this.mainPriceValue > 0, 'Invalid main product price');

    // 🔥 Capture dynamic keywords from main title
    this.mainWords = this.extractWords(this.mainName);
    console.log('Main product words:', this.mainWords);
  }

  /* -------------------------
     Validate similar items
  -------------------------- */
  async validateSimilarItems() {
    const headerVisible = await this.page
      .locator(this.similarHeader)
      .isVisible()
      .catch(() => false);

    if (!headerVisible) {
      console.log('\n⚠️ Similar items section NOT found on this product');
      console.log('ℹ️ Skipping similar items validation');
      return;
    }

    const cards = this.page.locator(this.similarCards);
    const count = await cards.count();

    console.log(`\n🔵 Similar items found: ${count}`);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);

      const title = await card.locator('h3').textContent();
      const priceText = await card.locator('span:has-text("$")').first().textContent();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

      // 🔥 Extract words from similar item title
      const similarWords = this.extractWords(title);

      // Match at least TWO words
      const matchedWords = this.mainWords.filter(word =>
        similarWords.includes(word)
      );

      const categoryMatch = matchedWords.length >= 2;

      const priceMatch =
        price >= this.mainPriceValue - 10 &&
        price <= this.mainPriceValue + 10;

      const topRatedPlus =
        (await card.locator('text=Top Rated Plus').count()) > 0;

      console.log(`\n🟡 Similar Item ${i + 1}`);
      console.log('Title:', title.trim());
      console.log('Price:', price);
      console.log('Matched words:', matchedWords);
      console.log('Same category (≥2 words):', categoryMatch ? 'YES' : 'NO');
      console.log('Price ±10:', priceMatch ? 'YES' : 'NO');
      console.log('Top Rated Plus:', topRatedPlus ? 'YES' : 'NO');

      const isSimilar = categoryMatch && priceMatch && topRatedPlus;
      console.log('RESULT:', isSimilar ? '✅ SIMILAR' : '❌ NOT SIMILAR');
    }
  }
}

module.exports = ProductPage;
