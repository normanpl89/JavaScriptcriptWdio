@WidgetCheckout

@WidgetCheckout
Feature: Widget checkout

  @C4435
  Scenario: Validate that user is able to navigate to widget checkout for a WOR
    Given I create a user with partner relationship with ACH scope
      Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    Then I need to validate the WOR response
    When I navigate to widget checkout for WOR
    Then I see widget checkout page

  @C4438 @C49
  Scenario: Validate that user is able to select ach as payment method on widget checkout
    Given I create a user with partner relationship with ACH scope
    Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    Then I need to validate the WOR response
    When I navigate to widget checkout for WOR
    Then I see widget checkout page
    When I click on select payment method
    Then I see select payment method page
    When I click on ach payment method Card
      And I click on back home button on setup back for ach
    Then I see "ACH Transfer" as payment method

  @C8248 @C82 @C87 @C88 @C89
  Scenario: Validate that user is able to proceed credit / debit as payment method on widget checkout
    Given I create a WOR for predefined account
    Then I need to validate the WOR response
    When I navigate to widget checkout for WOR
    Then I see widget checkout page
    When I click on select payment method
    Then I see select payment method page
    When I click on credit/debit payment method Card
    Then I see "Credit / Debit" as payment method
    When I set "n266KvRp5ZXLb8UsZQejzDDhYh6sLmQzcS" wallet on widget checkout page
      And I accept term on widget checkout page
      And I click on Next button on widget checkout page
    Then I see payment information page
    When I fill payment information data
      And I click on submit button
      And I wait for processing loader to disapear
    Then I see phone code verification page
    When I insert 000000 phone code
      And I click on authorize transaction on phone code verification page
    Then I see bank code verification page
    When I insert 000000 bank code
      And I click on authorize transaction on bank code verification page
      And I wait for processing loader to disapear
    Then I success wor transaction page

  @C85
  Scenario: Validate that user is able to proceed credit / debit as payment method on widget checkout for ETH
    Given I create a WOR for predefined account
    Then I need to validate the WOR response
    When I navigate to widget checkout for WOR
    Then I see widget checkout page
    When I click on select payment method
    Then I see select payment method page
    When I click on credit/debit payment method Card
    Then I see "Credit / Debit" as payment method
    When I select crypto currency ETH as destination source
    Then I should see ETH as a destination source
    When I set "0xd8c6f78e374e0489672e6550171b8299f3dd124b" wallet on widget checkout page
      And I accept term on widget checkout page
      And I click on Next button on widget checkout page
    Then I see payment information page
    When I fill payment information data
      And I click on submit button
      And I wait for processing loader to disapear
    Then I success wor transaction page

  @C40
  Scenario: Validate that user is able to set higher amount 
    Given I create a WOR for predefined account
      And I need to validate the WOR response
      And I navigate to widget checkout for WOR
      And I see widget checkout page
    When I set 25000 amount in amount field in widget checkout page
    Then I see 025000 amount in amount field in widget checkout page
      And I see error "Amount exceeds $1,000" message for invalid wallet on widget checkout page 

  @C48
  Scenario: Only valid wallet for chosen currency can be accepted
    Given I create a WOR for predefined account
      And I need to validate the WOR response
      And I navigate to widget checkout for WOR
      And I see widget checkout page
      And I select crypto currency ETH as destination source
      And I should see ETH as a destination source
    When I set "mvRmv2xVPNGRNoFp4WddH1BHBmZyHNfPv3" wallet on widget checkout page
      And I click on currency description on  widget checkout page
    Then I see error "Invalid wallet address" message for invalid wallet on widget checkout page
    When I set "0xd8c6f78e374e0489672e6550171b8299f3dd124b" wallet on widget checkout page
      And I click on currency description on  widget checkout page 
    Then I don't see error "Invalid wallet address" message for invalid wallet on widget checkout page 

  @C51 @C52 @C54
  Scenario: Validate that transaction fee is displayed and required fields can be selected
    Given I create a WOR for predefined account
      And I need to validate the WOR response
      And I navigate to widget checkout for WOR
      And I see widget checkout page
      And I click on select payment method
      And I see select payment method page
      And I click on credit/debit payment method Card
      And I see "Credit / Debit" as payment method
    When I set "mvRmv2xVPNGRNoFp4WddH1BHBmZyHNfPv3" wallet on widget checkout page
      And I click on currency description on  widget checkout page
    Then I validate fee summary in widget checkout page
      | BTC Exchange Rate | 519.17 USD |
      | Transaction fee   | 5.00 USD   |
      | Network fee       | 0.03 USD   |
      | Purchase Total    | 105.03 USD |
      And I see accept term checkbox is not selected
      And I see "I authorize Wyre to debit my account indicated for the amount above on today’s date, and I agree to Wyre's User Agreement" text in accept terms
      And I see next button is not enabled
    When I accept term on widget checkout page 
    Then I see next button is enabled
    # When I click on accept terms hyperlink
    # Then I see that accept terms tab is opened
  
  @C55 @C83
  Scenario: Close button should close page
    Given I create a WOR for predefined account
      And I need to validate the WOR response
      And I navigate to widget checkout for WOR
      And I see widget checkout page
    When I click on close button on widget checkout
    Then I should not see widget checkout page


  @C8249
  Scenario: Generate Payment Credit-Debit Card for a Predifined User
    Given I create a WOR for predefined account
    Then I need to validate the WOR response
    When I navigate to widget checkout for WOR
    Then I see widget checkout page
    When I click on select payment method
    Then I see select payment method page
    When I click on credit/debit payment method Card
    Then I see "Credit / Debit" as payment method
      And I accept term on widget checkout page
      And I click on Next button on widget checkout page
    Then I see payment information page
    When I fill payment information data for a Predifined User
      And I click on submit button
      And I wait for processing loader to disapear
    Then I success wor transaction page 


  @C111
  Scenario: Payment field is required
    Given I create a user with partner relationship with ACH scope
    Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    When I navigate to widget checkout for WOR
    When I set "mvRmv2xVPNGRNoFp4WddH1BHBmZyHNfPv3" wallet on widget checkout page
      And I accept term on widget checkout page
    Then I Validate Next Button is Disable

  @C132
  Scenario: Payment method can be chosen from dropdown
    Given I create a user with partner relationship with ACH scope
    Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    When I navigate to widget checkout for WOR
    When I click on select payment method
    Then I see select payment method page
    When I click on credit/debit payment method Card
    Then I see "Credit / Debit" as payment method
    When I click on select payment method
    Then I see select payment method page
    When I click on ach payment method Card
      And I click on back home button on setup back for ach
    Then I see "ACH Transfer" as payment method


  @C8251
  Scenario: Return (Arrow/Back) Button should return to previous window
    Given I create a user with partner relationship with ACH scope
    Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    When I navigate to widget checkout for WOR
    When I click on select payment method
    Then I see select payment method page
    When I click on ach payment method Card
      And I click on back home button on setup back for ach
    Then I see "ACH Transfer" as payment method


  @C8250
  Scenario: Only For Chrome: System display the label "This Browser does not support Apple Pay" when is using other browser different from Safari
    Given I create a user with partner relationship with ACH scope
    Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    When I navigate to widget checkout for WOR
    When I click on select payment method
    When I validate Alert "This browser does not support Apple Pay"


  @C133
   Scenario: Only For Safari: Apple pay method available on the Safari browser
    Given I create a user with partner relationship with ACH scope
    Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
    When I navigate to widget checkout for WOR
    When I click on select payment method
    When I validate Alert "Apple Pay"



  @C179 @C173 @C185 @C192 @C308 @C322 @C336 @C337 @C339
   Scenario: "Input Fields" is mandatory field
     Given I create a user with partner relationship with ACH scope
     Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
     When I navigate to widget checkout for WOR
     Then I see widget checkout page
     When I click on select payment method
     Then I see select payment method page
     When I click on credit/debit payment method Card
     Then I see "Credit / Debit" as payment method
     When I set "n266KvRp5ZXLb8UsZQejzDDhYh6sLmQzcS" wallet on widget checkout page
     And I accept term on widget checkout page
     And I click on Next button on widget checkout page
     Then I see payment information page
     When I fill payment information data with RandomData For Text Fields: FirstName:"" LastName: "" Credit Card Number "" CardExpirationDate: "" CardCCV: "" Country: "United States" State: "San Chepe" Adress:"" PostalCode:"" City:"" Email "" and Celphone ""
      Then I validate warning message "Enter first name"
      Then I validate warning message "Enter last name"
      Then I validate warning message "Enter a card number"
      Then I validate warning message "Enter an expiration "
      Then I validate warning message "Enter a  CVV"
      Then I validate warning message "Please select a  State"
      Then I validate warning message "Please enter an address"
      Then I validate warning message "Enter ZIP code"
      Then I validate warning message "Enter city"
      Then I validate warning message "Please enter email"
      Then I validate warning message "Please enter cell phone number"
     Then I Validate Next Button is Disable

    


  @C180 @C174 @C206 @C193 @C186
   Scenario: Enter letters to Payment Information field's
     Given I create a user with partner relationship with ACH scope
     Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
     When I navigate to widget checkout for WOR
     Then I see widget checkout page
     When I click on select payment method
     Then I see select payment method page
     When I click on credit/debit payment method Card
     Then I see "Credit / Debit" as payment method
     When I set "n266KvRp5ZXLb8UsZQejzDDhYh6sLmQzcS" wallet on widget checkout page
     And I accept term on widget checkout page
     And I click on Next button on widget checkout page
     Then I see payment information page
     When I fill payment information data with RandomData For Text Fields: FirstName:"Fernando" LastName: "Test" Credit Card Number "AAAAA" CardExpirationDate: "AAAA" CardCCV: "AAA" Country: "United States" State: "California" Adress:"Test City" PostalCode:"AAAA" City:"Test" Email "fernando@sendwyre.com" and Celphone "AAAAA"
      Then I validate warning message "Enter a card number"
      Then I validate warning message "Enter an expiration "
      Then I validate warning message "Enter a  CVV"
      Then I validate warning message "Please enter an address"
      Then I validate warning message "Enter ZIP code"
      Then I validate warning message "Enter city"
      Then I validate warning message "Please enter email"
      Then I validate warning message "Please enter cell phone number"
     Then I Validate Next Button is Disable

  
 @C177 @C181 @C187 @C195 @C207
   Scenario: Enter Symbols to Payment Information field's
     Given I create a user with partner relationship with ACH scope
     Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
     When I navigate to widget checkout for WOR
     Then I see widget checkout page
     When I click on select payment method
     Then I see select payment method page
     When I click on credit/debit payment method Card
     Then I see "Credit / Debit" as payment method
     When I set "n266KvRp5ZXLb8UsZQejzDDhYh6sLmQzcS" wallet on widget checkout page
     And I accept term on widget checkout page
     And I click on Next button on widget checkout page
     Then I see payment information page
     When I fill payment information data with RandomData For Text Fields: FirstName:"@@@@" LastName: "@@@@" Credit Card Number "@@@@@@@@@@@@@@" CardExpirationDate: "@@@@" CardCCV: "@@@" Country: "United States" State: "California" Adress:"@@@@" PostalCode:"@@@@" City:"@@@@" Email "@@@@@@" and Celphone "@@@@"
      Then I validate warning message "Enter a card number"
      Then I validate warning message "Enter an expiration "
      Then I validate warning message "Enter a  CVV"
      Then I validate warning message "Invalid email9"
      Then I validate warning message "Please enter cell phone number"
     Then I Validate Next Button is Disable
  

  @C178 @C189 @C196 @C217 @C182
   Scenario: Enter Numbers to Payment Information field's
     Given I create a user with partner relationship with ACH scope
     Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
     When I navigate to widget checkout for WOR
     Then I see widget checkout page
     When I click on select payment method
     Then I see select payment method page
     When I click on credit/debit payment method Card
     Then I see "Credit / Debit" as payment method
     When I set "n266KvRp5ZXLb8UsZQejzDDhYh6sLmQzcS" wallet on widget checkout page
     And I accept term on widget checkout page
     And I click on Next button on widget checkout page
     Then I see payment information page
     When I fill payment information data with RandomData For Text Fields: FirstName:"1234" LastName: "1234" Credit Card Number "4111111111111111" CardExpirationDate: "1224" CardCCV: "1234" Country: "United States" State: "California" Adress:"1234" PostalCode:"1234" City:"1234" Email "12345" and Celphone "3475597045"
      Then I validate warning message "Invalid email"
     Then I Validate Next Button is Disable

  @C190 @C191
   Scenario: "Card number" field can't contain over than 16 digits  / Error should display if card number is invalid
     Given I create a user with partner relationship with ACH scope
     Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
     When I navigate to widget checkout for WOR
     Then I see widget checkout page
     When I click on select payment method
     Then I see select payment method page
     When I click on credit/debit payment method Card
     Then I see "Credit / Debit" as payment method
     When I set "n266KvRp5ZXLb8UsZQejzDDhYh6sLmQzcS" wallet on widget checkout page
     And I accept term on widget checkout page
     And I click on Next button on widget checkout page
     Then I see payment information page
     When I fill payment information data with RandomData For Text Fields: FirstName:"1234" LastName: "1234" Credit Card Number "121212121212121212" CardExpirationDate: "1224" CardCCV: "1234" Country: "United States" State: "California" Adress:"1234" PostalCode:"1234" City:"1234" Email "12345" and Celphone "3475597045"
      Then I validate warning message "Card is invalid"
     Then I Validate Next Button is Disable


  @C197 @C201
   Scenario: "Expiration" field can't contain over than 4 digits / Error should display if expiration date is invalid / "Expiration" field should contain correct date (not expired) to be valid
     Given I create a user with partner relationship with ACH scope
     Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
     When I navigate to widget checkout for WOR
     Then I see widget checkout page
     When I click on select payment method
     Then I see select payment method page
     When I click on credit/debit payment method Card
     Then I see "Credit / Debit" as payment method
     When I set "n266KvRp5ZXLb8UsZQejzDDhYh6sLmQzcS" wallet on widget checkout page
     And I accept term on widget checkout page
     And I click on Next button on widget checkout page
     Then I see payment information page
     When I fill payment information data with RandomData For Text Fields: FirstName:"Fernando" LastName: "Test" Credit Card Number "4111111111111111" CardExpirationDate: "12211" CardCCV: "1234" Country: "United States" State: "California" Adress:"1234" PostalCode:"1234" City:"1234" Email "fernando@sendwyre.com" and Celphone "3475597045"
      Then I validate warning message "Expiry date is invalid"
     Then I Validate Next Button is Disable


  @C200
   Scenario: "Expiration" field should contain correct date (not expired) to be valid
     Given I create a user with partner relationship with ACH scope
     Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
     When I navigate to widget checkout for WOR
     Then I see widget checkout page
     When I click on select payment method
     Then I see select payment method page
     When I click on credit/debit payment method Card
     Then I see "Credit / Debit" as payment method
     When I set "n266KvRp5ZXLb8UsZQejzDDhYh6sLmQzcS" wallet on widget checkout page
     And I accept term on widget checkout page
     And I click on Next button on widget checkout page
     Then I see payment information page
     When I fill payment information data with RandomData For Text Fields: FirstName:"Fernando" LastName: "Test" Credit Card Number "4111111111111111" CardExpirationDate: "1225" CardCCV: "1234" Country: "United States" State: "California" Adress:"1234" PostalCode:"1234" City:"1234" Email "fernando@sendwyre.com" and Celphone "3475597045"
     Then I validate Submit Buttton Is clickable



 @C219 
   Scenario: "CVV" field should contain 3 or 4 digits to be valid
     Given I create a user with partner relationship with ACH scope
     Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
     When I navigate to widget checkout for WOR
     Then I see widget checkout page
     When I click on select payment method
     Then I see select payment method page
     When I click on credit/debit payment method Card
     Then I see "Credit / Debit" as payment method
     When I set "n266KvRp5ZXLb8UsZQejzDDhYh6sLmQzcS" wallet on widget checkout page
     And I accept term on widget checkout page
     And I click on Next button on widget checkout page
     Then I see payment information page
     When I fill payment information data with RandomData For Text Fields: FirstName:"Fernando" LastName: "Test" Credit Card Number "4111111111111111" CardExpirationDate: "1226" CardCCV: "1234" Country: "United States" State: "California" Adress:"1234" PostalCode:"1234" City:"1234" Email "fernando@sendwyre.com" and Celphone "3475597045"
     Then I validate Submit Buttton Is clickable



  @C220
   Scenario: Error should display if CVV is invalid
     Given I create a user with partner relationship with ACH scope
     Then I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
     When I navigate to widget checkout for WOR
     Then I see widget checkout page
     When I click on select payment method
     Then I see select payment method page
     When I click on credit/debit payment method Card
     Then I see "Credit / Debit" as payment method
     When I set "n266KvRp5ZXLb8UsZQejzDDhYh6sLmQzcS" wallet on widget checkout page
     And I accept term on widget checkout page
     And I click on Next button on widget checkout page
     Then I see payment information page
     When I fill payment information data with RandomData For Text Fields: FirstName:"Fernando" LastName: "Test" Credit Card Number "4111111111111111" CardExpirationDate: "1226" CardCCV: "12" Country: "United States" State: "California" Adress:"1234" PostalCode:"1234" City:"1234" Email "fernando@sendwyre.com" and Celphone "3475597045"
      Then I validate warning message "Enter a valid CVV"
     Then I Validate Next Button is Disable


  @C8242
  Scenario: Tab closes after click on the close button (X)
  Given I create a WOR for predefined account
      And I need to validate the WOR response
      And I navigate to widget checkout for WOR
      And I see widget checkout page
    When I click on select payment method
    Then I see select payment method page
    When I click on credit/debit payment method Card
    Then I see "Credit / Debit" as payment method
    When I select crypto currency ETH as destination source
    Then I should see ETH as a destination source
    When I set "0xd8c6f78e374e0489672e6550171b8299f3dd124b" wallet on widget checkout page
      And I accept term on widget checkout page
      And I click on Next button on widget checkout page
    Then I see payment information page
    When I fill payment information data
      And I click on submit button
    Then I success wor transaction page
    When I click on close button on widget checkou



  @C8243
  Scenario: After click on Close button (X) reservation Expires
  Given I create a WOR for predefined account
      And I need to validate the WOR response
      And I navigate to widget checkout for WOR
      And I see widget checkout page
    When I click on select payment method
    Then I see select payment method page
    When I click on credit/debit payment method Card
    Then I see "Credit / Debit" as payment method
    When I select crypto currency ETH as destination source
    Then I should see ETH as a destination source
    When I set "0xd8c6f78e374e0489672e6550171b8299f3dd124b" wallet on widget checkout page
      And I accept term on widget checkout page
      And I click on Next button on widget checkout page
    Then I see payment information page
    When I fill payment information data
      And I click on submit button
    Then I success wor transaction page
    When I click on close button on widget WidgetCheckout
    Then I validate warning message "reservation expire"


  @C394
  Scenario: The button "Track Transaction" opens dashboard page in new tab
  Given I create a WOR for predefined account
      And I need to validate the WOR response
      And I navigate to widget checkout for WOR
      And I see widget checkout page
    When I click on select payment method
    Then I see select payment method page
    When I click on credit/debit payment method Card
    Then I see "Credit / Debit" as payment method
    When I select crypto currency ETH as destination source
    Then I should see ETH as a destination source
    When I set "0xd8c6f78e374e0489672e6550171b8299f3dd124b" wallet on widget checkout page
      And I accept term on widget checkout page
      And I click on Next button on widget checkout page
    Then I see payment information page
    When I fill payment information data
      And I click on submit button
    Then I success wor transaction page
    Then I validate warning message "Track Transaction"

  @C397
  Scenario: The button "Return to home" redirects user to home page
  Given I create a WOR for predefined account
      And I need to validate the WOR response
      And I navigate to widget checkout for WOR
      And I see widget checkout page
    When I click on select payment method
    Then I see select payment method page
    When I click on credit/debit payment method Card
    Then I see "Credit / Debit" as payment method
    When I select crypto currency ETH as destination source
    Then I should see ETH as a destination source
    When I set "0xd8c6f78e374e0489672e6550171b8299f3dd124b" wallet on widget checkout page
      And I accept term on widget checkout page
      And I click on Next button on widget checkout page
    Then I see payment information page
    When I fill payment information data
      And I click on submit button
    Then I success wor transaction page
    Then I validate warning message "Return to home"
