@WC_SelectCurrency
Feature: Widget Checkout Select Currency

  @C851 @C36
  Scenario: Validate that user is able to select different currencies
    Given I create a user with partner relationship with ACH scope
    And I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    Then I need to validate the WOR response
    When I navigate to widget checkout for WOR
    Then I see widget checkout page
    And I select the currency "Pay With" and select the following currencies
      | value |
      | USD   |
      | EUR   |
      | GBP   |
      | AUD   |
      | CAD   |
    And I validate all the valid currencies on the pay from
      | value |
      | USD   |
      | EUR   |
      | GBP   |
      | AUD   |
      | CAD   |
      | NZD   |
      | ARS   |
      | BRL   |
      | CHF   |
      | CLP   |
      | COP   |
      | CZK   |
      | DKK   |
      | HKD   |
      | ILS   |
      | INR   |
      | ISK   |
      | JPY   |
      | KRW   |
      | MYR   |
      | MXN   |
      | NOK   |
      | PHP   |
      | PLN   |
      | SEK   |
      | SGD   |
      | THB   |
      | VND   |
      | ZAR   |
      
  @C37
  Scenario: Validate that user is able to search currency on Pay With form
    Given I create a user with partner relationship with ACH scope
    And I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    And I need to validate the WOR response
    And I navigate to widget checkout for WOR
    And I see widget checkout page
    When I search for BRL currency in pay with form
    Then I validate that BRL is displayed in pay with form
          

  @C38
  Scenario: Validate that user is able to select different currencies for Destination Currency
    Given I create a user with partner relationship with ACH scope
    And I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    Then I need to validate the WOR response
    When I navigate to widget checkout for WOR
    Then I see widget checkout page
    And I select the currency "Destination" and select the following currencies
      | value |
      | BTC   |
      | ETH   |
      | DAI   |
      | PAX   |
      | RAI   |
    And I validate all the valid currencies on the destination form
      | value        |
      | BTC          |
      | ETH          |
      | USDC         |
      | DAI          |
      | AAVE         |
      | BAT          |
      | BUSD         |
      | COMP         |
      | CRV          |
      | GUSD         |
      | LINK         |
      | MKR          |
      | PAX          |
      | SNX          |
      | UMA          |
      | UNI          |
      | USDS         |
      | USDT         |
      | ZUSD         |
      | WBTC         |
      | WETH         |
      | YFI          |
      | XLM          |
      | AVAX X-Chain |
      | AVAX C-Chain |
      | MATIC        |
      | MUSDC        |
      | SUSDC        |
      | RAI          |
      | LETH         |
      | LUSDC        |
      | ALGO         |
      | AUSDC        |
      | AUSDT        |
      | EBTCQ        |
      | EGBTC        |
      | EDI          |
      | SYF          |
      | AVAXCUSDC    |
      | EFLUX        |
      | stETH        |

  @C39
  Scenario: Validate that user is able to search currency on Destination form
    Given I create a user with partner relationship with ACH scope
    And I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    And I need to validate the WOR response
    And I navigate to widget checkout for WOR
    And I see widget checkout page
    When I search for RAI currency in destination form
    Then I validate that RAI is displayed in destination form