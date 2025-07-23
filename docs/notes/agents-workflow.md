
[⬅️ Back to Main - Test Case Generator](Test%20Case%20Generator.md)


1. **Input Stage:**

   * User provides a user story, feature title, or a brief requirement description.
   * Example Input: "User can log in using email and password."

2. **User Story Analysis (Analysis Agent):**

   * The agent analyzes the input and identifies scenarios.
   * Example Output:

     * "User logs in successfully."
     * "User fails to log in with incorrect password."
     * "User attempts login without email."

3. **Title Generation (Title Agent):**

   * For each identified scenario, the agent generates test case titles.
   * Example Output:

     * "Test Case 1: Successful Login with Valid Credentials."
     * "Test Case 2: Login Attempt with Invalid Password."
     * "Test Case 3: Login Attempt without Email."

4. **Step Expansion (Step Agent):**

   * For each title, the agent generates detailed test steps.
   * Example Output:

     * **Test Case 1:**

       * Step 1: Navigate to login page.
       * Step 2: Enter valid email and password.
       * Step 3: Click 'Login'.
       * Expected Result: User is redirected to the dashboard.

5. **Validation (Validation Agent):**

   * The agent validates each test case for clarity, completeness, and accuracy.
   * Example Output:

     * "Test Case 1 is valid. Test Case 2 is missing a clear expected result."

6. **Optimization (Optimization Agent):**

   * The agent optimizes the test case set by removing redundant cases.
   * Example Output:

     * "Test Case 1 and Test Case 3 can be combined for simplicity."

7. **Final Output:**

   * The final, validated, and optimized test cases are presented to the user.
