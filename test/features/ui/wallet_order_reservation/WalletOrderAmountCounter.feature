@WOR
Feature: Wallet Order Reservation Amount Counter

@WOR_01 @C42 @C43 @C44 @C45 @C46 @C47 @C59 @C64 @C67 @C78
Scenario: Validate that user is able to select ach as payment method on widget checkout
  Given I create a user with partner relationship with ACH scope
  And I create a WOR with account AC_X23ELUBMZC9 and US_B6VJN6JCFMR
  Then I need to validate the WOR response
  When I navigate to widget checkout for WOR
  Then I see widget checkout page
  And I validate the field amount entering the two following numbers 55
  And I validate the field amount entering the two following numbers 333
  And I validate the field amount entering the two following numbers 1000000
  Then Validate the red error message Amount exceeds $1,000
  And If I enter the amount of 001 should be replaced by 1
  Then I validate that the amount field does not allow special characters like (!@#$%^&*(){}<>?:;"'=_/\|[],) just .
  And I validate that the amount does not allow to enter abcdefghijklmnopqrstuvxyz or ABCDEFGHIJKLMNOPQRSTUVWXYZ
  Then I validate the error message Please enter an amount from the amount field when is empty
