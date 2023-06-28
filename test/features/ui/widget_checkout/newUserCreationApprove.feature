@UI_Test
Feature: Add new User and Approve All Compliance Trainings.

  Background: User is Logged In
    Given I create an account with valid data
    When I should get response 200
    Then I generate a valid admin token
    And I active as Individual account
    Then I should get response 200
  
  @new_user_01
  Scenario: Approve a new account created.
    And I navigate to the admin dashboard
    And I login with valid credentials
    And I search for the new account created on the Dashboard
    And I click on the result Account from the search
    Then I click on approve Email
    Then I click on Manage Button
    And I activate manually all the compliance requirements
    Then I login with the account on the Dashboard to Enter valid Bank information
    And I fill all the information to add a bank account
    And I need to see the success message Payment method successfully added!
    Then I close the Dashboard
    And I approve the bank account
    Then I validate the compliance Status is APPROVED

  @new_user_02
    Scenario: Verify new user Widget Checkout functionality
      Given I generate a valid admin token for the new user created
      And I generate a valid secret token
      Then I generate a valid admin token
      Then I create a partner for a new user relationship with ACH scope
      Then I navigate to the admin dashboard
      And I login with valid credentials
      And I search for the new account created on the Dashboard
      And I click on the result Account from the search
      Then I click on approve Email
      Then I click on Manage Button
      And I activate manually all the compliance requirements
      Then I login with the account on the Dashboard to Enter valid Bank information
      And I fill all the information to add a bank account
      And I need to see the success message Payment method successfully added!
      Then I close the Dashboard
      And I approve the bank account
      Then I validate the compliance Status is APPROVED
      And I create a WOR for the new user created
      Then I need to validate the WOR response
      When I navigate to widget checkout for WOR




