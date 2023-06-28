@api_test
Feature: Partner Creation API.

    @C4619
    Scenario: Create partner with ACH & SETTLE scopes
      Given I create an account with valid data
      When I should get response 200
      And I generate a valid admin token
      Then I create a partner relation in SETTLE scope
      Then I should get response 200

   @C4620
   Scenario: Create User w/partner relationship with ACH scope
    Given I create a user with partner relationship with ACH scope
    When I should get response 200
    Then I need to validate the ACH response


  @Ach_negative
  Scenario: Create partner with ACH and Settle w/partner already associated.
    Given I generate a valid admin token
    When I create a partner relation in SETTLE scope with AC_3GJ4C9QC2TL
    And I should get response 400
    Then I need to validate the Partner API response message Partner has already been associated

  @Ach_negative1
  Scenario: Create partner with ACH and Settle w/partner unauthorized.
    Given I create a partner AC_3GJ4C9QC2TL with partner unauthorized
    When I should get response 401
    Then I need to validate the Partner API response message Invalid Session
