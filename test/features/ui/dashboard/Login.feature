@Dashboard
Feature: Login to dashboard

    @DashLogin_01
    Scenario: Validate that user is able to login to dasboard
    Given I navigate to dashboard
      And I see login to dashboard page
    When I login with valid credentials to dashboard
    Then I should see dashboard page
    