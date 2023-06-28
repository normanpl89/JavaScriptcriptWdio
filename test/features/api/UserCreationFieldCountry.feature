@api_test @user_creation
Feature: User Creation Country Field

    @country_field_001
    Scenario: Create user where "country" field contain random text data
        Given I create an account with valid data
            And I should get response 200
            And The response should contain a valid user ID
            And I generate a valid admin token
            And I active as Individual account
            And I create a partner with Debit Card and ACH
        When I create user for partner account with US country
        Then I should get response 200


    @country_field_002 @C3586 @C3587 @C3588 @C3589 @C3597 @C3590 @C3591 @C3592 @C3593 @C3594 @C3595 @C3596
    Scenario Outline: Create user where "country" field contain random text data
        Given I create an account with valid data
            And I should get response 200
            And The response should contain a valid user ID
            And I generate a valid admin token
            And I active as Individual account
            And I create a partner with Debit Card and ACH
        When I create user for partner account with <country> country
        Then I should get response <status>
        Examples:
            | country       | status |
            | Random        | 400    |
            | US            | 200    |
            | US2           | 400    |
            | BR!           | 400    |
            | United states | 400    |
            | BO            | 200    |
            | us            | 200    |
            | KK            | 400    |
            | UA            | 400    |
            | true          | 400    |
            | false         | 400    |
            |               | 400    |

