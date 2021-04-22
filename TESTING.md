# Criteria justification
## coverage       (look at all different use cases and edge cases)
* used snapshot testing in all of my component test files. This adds some credibility to my tests, and makes sure they aren't just following broken code.
* Each of my component test's changes the values of props and checks if a reasonable componenet is produced.
    * Eg tests if fallback image text provided when no src given in GameInfo.test.jsx
## clarity        (well commented and code isn't overly complex)
* Meaningful variable names help the reader understand what is being rendered. (eg Button, ButtonData)
* Most tests are simple through their shortness as well (only ~5 lines)
* Names of each test property help add meaning eg. it('uses custom title')
## designed well  (logical ordering of tests, avoid any tests that aren't necessary or don't add any meaningful value)
* Tests are ordered methodically, no property is tested twice unncessarily
* Each test file is ordered as:
    * Interacting with elements (ie check button click triggers function) 
    * Check that variation of props entered produces our desired component.
    * Snapshot testing 
