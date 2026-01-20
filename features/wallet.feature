Feature: Wallet similar product validation

  Scenario: Validate similar wallets on product page
    Given user opens eBay website
    When user searches for wallets
    And user selects a specific wallet product
    And wallet product details are visible
    And similar wallet products are displayed
