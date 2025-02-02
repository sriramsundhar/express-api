Feature: Sum
  Add two numbers

  Scenario: Add two integers
    Given a number <A>
    And another number <B>
    When sum is called
    Then it should return <SumAB>

    Examples:
      | A | B | SumAB |
      | 1 | 2 |     3 |
      | 4 | 4 |     8 |
