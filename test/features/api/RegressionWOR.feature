@api_test
Feature: Wallet Order Regression Testing.

  @C4621
  Scenario: Crete WOR with user
    Given I create a user with partner relationship with ACH scope
    When I should get response 200
    Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    And I should get response 200
    Then I need to validate the WOR response


  @C5250
  Scenario: Create partner with Debit Card and ACH
    Given I create an account with valid data
    When I should get response 200
    Then I generate a valid admin token
    And I create a partner with Debit Card and ACH
    And I should get response 200
    Then I need to validate the Debit ACH response

