@api_test @user_creation @inmediate_field
Feature: User Creation Inmediate Field

    @inmediate_field_001 @C3626 @C3627 @C3628 @C3629 @C3630 @C3631 @C3632
    Scenario Outline: Create user where "inmediate" field contain random or bad data
        Given I create an account with valid data
            And I should get response 200
            And The response should contain a valid user ID
            And I generate a valid admin token
            And I active as Individual account
            And I create a partner with Debit Card and ACH
            And I generate api key for the new account
        When I create user for partner account with <inmediate> inmediate field
        Then I should get response <status>
        Examples:
            | inmediate | status |
            | Random    | 400    |
            | 54656     | 400    |
            | $%^&      | 400    |
            | true      | 200    |
            | false     | 200    |
            |           | 200    |
            | absent    | 200    |