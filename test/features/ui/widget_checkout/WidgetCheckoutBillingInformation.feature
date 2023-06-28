@BillingInformation
Feature: Widget Checkout Billing Information

    Background: Proceed with Currency page
        Given I create a WOR for predefined account
            And I need to validate the WOR response
            And I navigate to widget checkout for WOR
            And I see widget checkout page
            And I click on select payment method
            And I see select payment method page
            And I click on credit/debit payment method Card
            And I see "Credit / Debit" as payment method
            And I set "mvRmv2xVPNGRNoFp4WddH1BHBmZyHNfPv3" wallet on widget checkout page
            And I click on currency description on  widget checkout page
            # And I validate fee summary in widget checkout page
            #     | BTC Exchange Rate | 519.17 USD |
            #     | Transaction fee   | 5.00 USD   |
            #     | Network fee       | 0.00 USD   |
            #     | Purchase Total    | 105.00 USD |
            And I see accept term checkbox is not selected
            And I see "I authorize Wyre to debit my account indicated for the amount above on today’s date, and I agree to Wyre's User Agreement" text in accept terms
            And I see next button is not enabled
            And I accept term on widget checkout page
            And I see next button is enabled
            And I click on Next button on widget checkout page

    @BillingInformation_001 @C61 @62 @C71
    Scenario: Validate User is able to select a country and to search a country
        Given I see payment information page
        When I select United States in country of payment information in widget checkout
        Then I see United States in country of payment information in widget checkout
          And I see US flag in phone flag of payment informatio in widget checkout
        When I search Brazil in country of payment information in widget checkout
        Then I see Brazil in country of payment information in widget checkout

    @BillingInformation_002 @C63 @C65 @C66 @C68 @C69 @C72 @C73 @C74 @C77
    Scenario: Validate that user is able to add required fields when country is USA
    Given I see payment information page
      And I fill credit card info on payment information of widget checkout
      And I select United States in country of payment information in widget checkout
    When I select California State of payment information in widget checkout
    Then I see California in state field of payment information in widget checkout
    When I set "142 Beach Blvd" in address field of payment information in widget checkout
    Then I see "142 Beach Blvd" in address field of payment information in widget checkout
    When I set "93309" in zip code of payment informatin in widget checkout
    Then I see "93309" in zip code of payment informatin in widget checkout
    When I set "Cocha" in city of payment informatin in widget checkout
    Then I see "Cocha" in city of payment informatin in widget checkout
    When I set "+591 123" in phone of payment information in widget checkout
    # Then I see "Please enter cell phone number" error message in phone of payment information in widget checkout
    When I set "+17046663025" in phone of payment information in widget checkout
    When I set change US phone flag to be Bolivia in payment information in widget checkout
    Then I see BO flag in phone flag of payment informatio in widget checkout
    Then I see that Next button is clickable in payment information of widget checkout

    @BillingInformation_002 @C75 @C76 @C79 @C80
    Scenario: Validate that user data persist when user navigates
    Given I see payment information page
      And I fill credit card info on payment information of widget checkout
      And I select United States in country of payment information in widget checkout
    And I set "Test City" in address field of payment information in widget checkout
    And I see "Test City" in address field of payment information in widget checkout
    And I set "+17046663025" in phone of payment information in widget checkout
    And I see US flag in phone flag of payment informatio in widget checkout
    When I click on back button of payment information in widget checkout
    Then I see "Credit / Debit" as payment method
    When I accept term on widget checkout page
    And I click on Next button on widget checkout page
    Then I see payment information page
      And I see "Test City" in address field of payment information in widget checkout
    # When I click on close button of payment information in widget checkout
    # Then I see "Credit / Debit" as payment method
    #     And  I accept term on widget checkout page
    # When I click on Next button on widget checkout page
    # Then I see payment information page
    #   And I see "Test City" in address field of payment information in widget checkout

  @BillingInformation_003 @C86
  Scenario: Validate that user is able to add valid card code
    Given I fill payment information data for a Predifined User
      And I click on submit button
      And I wait for processing loader to disapear
       Then I see phone code verification page
    When I insert 000000 phone code
      And I click on authorize transaction on phone code verification page
    Then I see bank code verification page
    When I insert 000001 bank code
      And I click on authorize transaction on bank code verification page
      When I insert 000001 bank code
      And I click on authorize transaction on bank code verification page  
      When I insert 000001 bank code
      And I click on authorize transaction on bank code verification page  
      When I insert 000001 bank code
      And I click on authorize transaction on bank code verification page  
      When I insert 000000 bank code
      And I click on authorize transaction on bank code verification page
      And I wait for processing loader to disapear
    Then I success wor transaction page
      

