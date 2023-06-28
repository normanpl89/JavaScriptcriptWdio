@api_test @user_scopes
Feature: User Account Creation All Scopes.

  @C3581 @C3582 @C3583 @C3584 @C3585
  Scenario Outline: Create User Account All Scopes
    Given I create an account with valid data
    When I should get response 200
    And The response should contain a valid user ID
    And I generate a valid admin token
    And I active as Individual account
    And I create a partner relation in SETTLE scope
    And I should get response 200
    And I generate a valid admin token for the new user created
    And I generate a valid secret token
    And I create a new User with Custom field scope with <scope> and response <code>
    Examples:
      |scope         |code |
      |DEBIT_CARD_L2 | 200 |
      |ACH           | 200 |
      |TRANSFER      | 200 |
      |SETTLE        | 200 |
      |MY_SCOPE      | 400 |


  @C3598 @C3599 @C3600 @C3601 @C3602 @C3603 @C3604 @C3605
  Scenario Outline: User Account Field Scope validation
    Given I create an account with valid data
    When I should get response 200
    And The response should contain a valid user ID
    And I generate a valid admin token
    And I active as Individual account
    And I create a partner relation in SETTLE scope
    And I should get response 200
    And I generate a valid admin token for the new user created
    And I generate a valid secret token
    And I create a new User with Custom field scope with <scopes> and response <code>
    Examples:
      |scopes         |code |
      |JBHJH         | 400 |
      |53534         | 400 |
      |%^&^%         | 400 |
      |debit_card_l2"| 400 |
      |true          | 400 |
      |false         | 400 |

  @C3606 @C3607 @C3608 @C3609 @C3610  @C3611 @C3612 @C3613 @C3614 @C3615 @C3616
  Scenario Outline: User Account Field Scope validation
    Given I create an account with valid data
    When I should get response 200
    And The response should contain a valid user ID
    And I generate a valid admin token
    And I active as Individual account
    And I create a partner relation in SETTLE scope
    And I should get response 200
    And I generate a valid admin token for the new user created
    And I generate a valid secret token
    And I validate all the negative scenarios for <Blockchain> field and response <code>
    Examples:
      |Blockchain   |code |
      |Dsdss        | 400 |
      |1313         | 400 |
      |£$^%         | 400 |
      |eth          | 200 |
      |DOGE         | 400 |
      |USD          | 200 |
      |bitcoin      | 400 |
      |true         | 400 |
      |false        | 400 |
      |""           | 400 |


