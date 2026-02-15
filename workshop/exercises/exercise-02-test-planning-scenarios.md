# Exercise 2: Test Planning & Scenarios

**Time:** 20 minutes  
**Objective:** Write manual test cases for the Ticketyboo application

## What You Will Learn
- How to identify test scenarios
- How to write clear test cases
- How to think about edge cases and error conditions

## Instructions

### Step 1: Identify Happy Path Scenarios (10 minutes)
Think about what a typical user would do. Write test cases for:

1. **Basic Event Browsing**
   - Action: Open the website
   - Expected result: What should you see?

2. **Successful Ticket Booking**
   - Action: Book 1 ticket for an event
   - Expected result: What should happen?

3. **Event Filtering**
   - Action: Filter by event type
   - Expected result: What should be displayed?

### Step 2: Think About Problems (10 minutes)
What could go wrong? Write test cases for:

1. **Invalid Information**
   - What happens if you enter a bad email address?
   - What happens if you leave required fields empty?

2. **Unusual Quantities**
   - What if someone tries to buy 100 tickets?
   - What if someone tries to buy 0 tickets?

3. **Sold Out Events**
   - What should happen when all tickets are sold?

## Template for Test Cases
Use this format:

**Test Case:** [Give it a clear name]
**Steps:**
1. Step one
2. Step two  
3. Step three

**Expected Result:** What should happen

**Example:**
**Test Case:** Book a single concert ticket
**Steps:**
1. Open localhost:3000
2. Click on "Rock Legends Live"
3. Fill in name: "John Smith"
4. Fill in email: "john@example.com"
5. Fill in card details
6. Click "Complete Purchase"

**Expected Result:** 
- Booking confirmation appears
- Tickets available decreases by 1
- Confirmation shows correct details

## Expected Outcomes
- You have at least 5 test cases written
- You understand the difference between happy path and error testing
- You can explain your test cases to others

## Discussion Points
- Which test cases are most important?
- What did you find difficult to test?
- What questions do you have about expected behaviour?