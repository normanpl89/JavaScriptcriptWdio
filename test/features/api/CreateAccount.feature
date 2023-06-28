@api_test
Feature: Create Account.

  @C4618
  Scenario: Create Account
    When I create an account with valid data
    Then I should get response 200
    And The response should contain a valid user ID

  @Invalid_data
  Scenario: Create Account with Invalid data
     When I create an account with invalid data
    Then I should get response 400

  @individual @testCI
  Scenario: Create Individual Account
    When I create an account with valid data
    Then I should get response 200
    And The response should contain a valid user ID
    And I generate a valid admin token
    Then I active as Individual account
    Then I should get response 200


  @business
  Scenario: Create Business Account
    When I create an account with valid data
    Then I should get response 200
    And The response should contain a valid user ID
    And I generate a valid admin token
    Then I active as Business account
    Then I should get response 200
