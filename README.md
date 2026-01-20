
Project Name
eBay Wallet Similar Products Automation

Project Description
This project automates the validation of similar best seller wallet products displayed on the eBay product detail page.
The automation is derived from manual test cases and validates category relevance, price range, and best seller identification.

Tech Stack

Playwright
JavaScript
Cucumber (BDD)
Node.js

Framework Design

Page Object Model (POM)
BDD using Gherkin
Modular and reusable structure

Pre-requisites

Node.js installed
Git installed
Internet connection


Test Coverage

Product search
Product selection
Product detail validation
Similar product relevance
Price range validation (±$10)
Handling of missing similar products


Assumptions

Similar products share at least two keywords with the main product
Products marked “Top Rated Plus” are treated as best sellers
Prices are validated in USD
Maximum of four similar products may be displayed

Reporting

Console logs
Screenshots captured for debugging