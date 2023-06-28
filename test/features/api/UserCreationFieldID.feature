@api_test @user_creation @id_field
Feature: User Creation ID Field

    @id_field_001 @C3617
    Scenario: Create user where "fields" field contain all available fields
        Given I create an account with valid data
            And I should get response 200
            And The response should contain a valid user ID
            And I generate a valid admin token
            And I active as Individual account
            And I create a partner with Debit Card and ACH
            And I generate api key for the new account
        When I create user for partner account with All field id
        Then I should get response 200


    @id_field_002 @C3625 @C3618 @C3619 @C3621 @C3622 @C3623 @C3624
    Scenario Outline: Create user where "field id" field contain random or bad data
        Given I create an account with valid data
            And I should get response 200
            And The response should contain a valid user ID
            And I generate a valid admin token
            And I active as Individual account
            And I create a partner with Debit Card and ACH
            And I generate api key for the new account
        When I create user for partner account with <fields> field id
        Then I should get response <status>
        Examples:
            | fields        | status |
            | Random        | 400    |
            | digits        | 400    |
            | special_chars | 400    |
            | true          | 400    |
            | false         | 400    |
            | empty         | 400    |
            | absent        | 200    |
