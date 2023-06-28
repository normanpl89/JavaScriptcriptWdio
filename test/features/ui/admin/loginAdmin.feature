@LoginAdmin
Feature: Login Admin

  @LoginAdmin_001 @C5535
  Scenario: Login to the admin dashboard
    Given I navigate to the admin dashboard
    When I login with valid credentials
    Then I should see account list


  @LoginAdmin_002
  Scenario: Logout from admin dashboard panel
    Given I navigate to the admin dashboard
      And I login with valid credentials
      And I should see account list
    When I logout from admin panel
    Then I should see login page
