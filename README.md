# eBay Wallet Similar Products Automation

📋 Project Overview

This project automates the validation of similar best-seller wallet products displayed on the eBay product detail page. Built using the **Page Object Model (POM)** with **Behavior-Driven Development (BDD)** principles, it provides a robust and maintainable automation framework for testing eBay's product recommendations.

The automation validates:
- Category relevance of similar products
- Price range consistency (±$10 from main product)
- Best-seller identification ("Top Rated Plus" status)
- Proper handling of missing similar products

---

🛠 Tech Stack

Technology	          Version	Purpose
Playwright	          Latest	End-to-end testing framework
JavaScript/Node.js	  v14+	    Programming language
Cucumber	          BDD	    Behavior-driven development
Gherkin	               -	    Test specification language


📁 Project Structure

```
ebay-playwright-bdd/
├── features/
│   └── wallet.feature          # BDD test scenarios
├── pages/
│   ├── HomePage.js             # Home page object
│   ├── ProductPage.js          # Product detail page object
│   └── SearchResultsPage.js    # Search results page object
├── steps/
│   ├── hooks.js                # Cucumber hooks (setup)
│   └── wallet.steps.js         # Step definitions
├── tests/
│   └── example.spec.js         # Sample test specs
├── reports/
│   └── cucumber-report.html    # HTML test reports
├── cucumber.js                 # Cucumber configuration
├── playwright.config.js        # Playwright configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

---

**Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) 
- **npm** (comes with Node.js)
- **Git** - [Download]


**Installation & Setup**

1. Clone the Repository
```bash
git clone <repository-url>
cd ebay-playwright-bdd
```

2. Install Dependencies
bash
npm install


This will install:
- Playwright
- Cucumber
- Associated dependencies

3. Install Playwright Browsers
bash
npx playwright install



**Configuration**

Playwright Configuration
Edit `playwright.config.js` to customize:
- Browser type (Chromium, Firefox, WebKit)
- Headless mode settings
- Viewport dimensions
- Timeout values

Cucumber Configuration
Edit `cucumber.js` to configure:
- Feature file paths
- Step definitions locations
- Report output format
- Parallel execution settings




Run All Tests
npm test

--- run it few time so diffrenet product will capture---


**Test Coverage**

Product search on eBay 
Product selection from results 
Product detail page validation 
Similar product relevance check 
Price range validation (±$10) 
Best-seller identification 
Missing similar products handling 



**Key Assumptions**

- Similar products share at least two keywords with the main product
- Products marked as "Top Rated Plus" are treated as best-sellers
- All prices are validated in USD
- Maximum of four similar products may be displayed
- eBay website structure remains consistent



**Reporting**

Console Logs
Test execution logs are displayed in the console with detailed information about each step.

Screenshots
Screenshots are automatically captured:
- On test failure
- After key interactions
- Stored in `reports/` directory for debugging

HTML Reports

npm test
Report generated at: reports/cucumber-report.html


---

**Page Objects**

HomePage.js
Handles interactions on the eBay home page:
- Search functionality
- Navigation

SearchResultsPage.js
Manages search results page operations:
- Product listing
- Product selection
- Filtering

ProductPage.js
Handles product detail page:
- Product information retrieval
- Similar products validation
- Price extraction
- Best-seller status verification

---


