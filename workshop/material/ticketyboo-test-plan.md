# Ticketyboo Event Booking Application Test Plan

## Application Overview

Ticketyboo is an event ticket booking application that allows users to browse and purchase tickets for various entertainment events including concerts, films, and comedy shows. The application features event filtering, detailed event information, and a complete booking flow with payment processing.

## Test Scenarios

### 1. Event Browsing and Filtering

**Seed:** `tests/seed.spec.ts`

#### 1.1. Browse All Events

**File:** `tests/events/browse-all-events.spec.ts`

**Steps:**
  1. Navigate to localhost:3000
    - expect: The page should load with the title 'Ticketyboo - Event Tickets'
    - expect: The header should display '🎫 Ticketyboo' and tagline 'Your ticket to amazing events!'
    - expect: All available events should be displayed in the main section
    - expect: Each event should show event type, title, performer/content, venue, date/time, price, and availability
  2. Verify event information display
    - expect: Multiple events should be visible (concerts, films, comedy)
    - expect: Event cards should display consistent formatting
    - expect: Ticket availability should be shown for each event

#### 1.2. Filter Events by Category

**File:** `tests/events/filter-by-category.spec.ts`

**Steps:**
  1. Click the 'Concerts' filter button
    - expect: Only concert events should be displayed
    - expect: The 'Concerts' button should appear active/selected
    - expect: Other event types (films, comedy) should be hidden
  2. Click the 'Films' filter button
    - expect: Only film events should be displayed
    - expect: The 'Films' button should appear active/selected
    - expect: Previous concert filter should be deactivated
  3. Click the 'Comedy' filter button
    - expect: Only comedy events should be displayed
    - expect: The 'Comedy' button should appear active/selected
  4. Click the 'All Events' button
    - expect: All events should be displayed again
    - expect: The 'All Events' button should appear active/selected
    - expect: All event types should be visible

### 2. Event Booking Happy Path

**Seed:** `tests/seed.spec.ts`

#### 2.1. Successful Single Ticket Purchase

**File:** `tests/booking/single-ticket-purchase.spec.ts`

**Steps:**
  1. Click on an available event (e.g., 'Rock Legends Live')
    - expect: A booking modal should open
    - expect: Event details should be displayed including venue, date, time, price, and availability
    - expect: A description of the event should be shown
    - expect: The booking form should be visible with all required fields
  2. Fill in customer information: Name 'John Smith', Email 'john.smith@example.com'
    - expect: Form fields should accept the input
    - expect: No validation errors should appear for valid data
  3. Fill in payment information: Card Number '1234 5678 9012 3456', Expiry '12/28', CVV '123', Cardholder 'JOHN SMITH'
    - expect: Payment fields should accept the input
    - expect: Total should display the correct amount for 1 ticket
  4. Click 'Complete Purchase'
    - expect: A success confirmation should appear
    - expect: Confirmation details should include: Confirmation ID, Event name, Number of tickets, Total paid, Customer name, Email, Masked card number, Cardholder name
    - expect: The event inventory should decrease by 1 ticket
    - expect: A 'Close' button should be available

#### 2.2. Multiple Ticket Purchase

**File:** `tests/booking/multiple-ticket-purchase.spec.ts`

**Steps:**
  1. Open an event booking modal and change ticket quantity to 3
    - expect: The quantity field should accept the value 3
    - expect: The total price should update to reflect 3 tickets (price × 3)
  2. Complete the booking form with valid information
    - expect: Form should accept all valid data
  3. Submit the purchase
    - expect: Purchase should complete successfully
    - expect: Confirmation should show quantity as 3 tickets
    - expect: Total should be calculated correctly (3 × ticket price)
    - expect: Event inventory should decrease by 3 tickets

#### 2.3. Cross-Event Type Booking Consistency

**File:** `tests/booking/cross-event-booking.spec.ts`

**Steps:**
  1. Book a ticket for a concert event
    - expect: Concert booking should complete successfully
  2. Book a ticket for a film event
    - expect: Film booking should use identical form structure
    - expect: Booking process should behave consistently
    - expect: Price calculation should work correctly
  3. Book a ticket for a comedy event
    - expect: Comedy booking should use identical form structure
    - expect: All booking functionality should work identically

### 3. Booking Edge Cases and Validation

**Seed:** `tests/seed.spec.ts`

#### 3.1. Maximum Ticket Purchase Limit

**File:** `tests/booking/ticket-limit-validation.spec.ts`

**Steps:**
  1. Select 60 tickets for an event with sufficient availability
    - expect: The form should accept 60 tickets
    - expect: Total price should calculate correctly (60 × ticket price)
  2. Fill out all required fields and complete purchase
    - expect: Purchase should complete successfully
    - expect: Confirmation should show 60 tickets purchased
    - expect: Inventory should decrease by 60 tickets
  3. Attempt to purchase 61 or more tickets
    - expect: Purchase should be rejected or prevented
    - expect: User should not be able to exceed 60 ticket limit

#### 3.2. Insufficient Inventory Handling

**File:** `tests/booking/inventory-validation.spec.ts`

**Steps:**
  1. Find an event with low ticket availability (e.g., 10 remaining)
    - expect: Event should show correct remaining ticket count
  2. Attempt to purchase more tickets than available (e.g., 15 when only 10 remain)
    - expect: System should prevent or handle the over-purchase appropriately
    - expect: User should receive appropriate feedback about insufficient inventory

#### 3.3. Form Validation Scenarios

**File:** `tests/booking/form-validation.spec.ts`

**Steps:**
  1. Submit booking form with empty Name field
    - expect: Form should not submit
    - expect: Validation error should be displayed for required Name field
  2. Submit booking form with invalid email format (e.g., 'invalid-email')
    - expect: Form should validate email format
    - expect: Error message should guide user to correct format
  3. Submit booking form with incomplete card number
    - expect: Payment validation should prevent submission
    - expect: User should be prompted to complete payment information
  4. Submit booking form with invalid expiry date format
    - expect: Expiry date validation should trigger
    - expect: User should receive guidance on correct MM/YY format

### 4. User Interface and Experience

**Seed:** `tests/seed.spec.ts`

#### 4.1. Modal Interaction

**File:** `tests/ui/modal-behavior.spec.ts`

**Steps:**
  1. Open an event booking modal
    - expect: Modal should open over the main content
    - expect: Background should be dimmed or overlaid
    - expect: Close button (×) should be visible
  2. Click the close button (×)
    - expect: Modal should close
    - expect: User should return to main events page
    - expect: Form data should be cleared
  3. Open modal again and click outside the modal area
    - expect: Modal should close when clicking outside (if implemented)
    - expect: Or should remain open if click-outside-to-close is not implemented

#### 4.2. Real-time Updates

**File:** `tests/ui/real-time-updates.spec.ts`

**Steps:**
  1. Note the initial ticket availability for an event
    - expect: Availability count should be visible and accurate
  2. Complete a purchase for that event
    - expect: After purchase confirmation, return to main page
    - expect: Event should show updated (reduced) ticket availability
    - expect: Inventory should reflect the tickets purchased
  3. Purchase remaining tickets for an event until sold out
    - expect: Event should show '0 tickets available' when fully sold
    - expect: Event should still be visible but clearly marked as sold out

#### 4.3. Price Calculation Display

**File:** `tests/ui/price-calculation.spec.ts`

**Steps:**
  1. Open event booking and verify initial total (1 ticket)
    - expect: Total should match the per-ticket price
  2. Change quantity to various numbers (2, 5, 10) and observe total
    - expect: Total should update dynamically as quantity changes
    - expect: Calculation should be accurate (quantity × unit price)
    - expect: No rounding errors should occur
