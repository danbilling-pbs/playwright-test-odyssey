# Ticketyboo Event Booking Application - Comprehensive Test Plan

## Application Overview

Ticketyboo is an event ticket booking application located at http://localhost:3000/ that allows users to browse events by category (All Events, Concerts, Films, Comedy), view event details, and purchase tickets through a booking modal with customer information and payment forms. The application displays 6 test events across different categories with varying prices and availability.

## Test Scenarios

### 1. Event Browsing and Filtering

**Seed:** `tests/seed.spec.ts`

#### 1.1. Default Event Display

**File:** `tests/event-browsing/default-display.spec.ts`

**Steps:**
  1. Navigate to http://localhost:3000/
    - expect: Page loads successfully
    - expect: Page title shows 'Ticketyboo - Event Tickets'
    - expect: Header displays '🎫 Ticketyboo' with tagline
    - expect: All 6 events are displayed by default
    - expect: Filter buttons are visible: All Events, Concerts, Films, Comedy
    - expect: 'All Events' button is active/selected by default
  2. Verify event card information displays correctly
    - expect: Each event card shows event type icon
    - expect: Event title, performer/content, venue, date/time, price, and ticket availability are displayed
    - expect: All event cards are clickable

#### 1.2. Concert Filter Functionality

**File:** `tests/event-browsing/concert-filter.spec.ts`

**Steps:**
  1. Click on the 'Concerts' filter button
    - expect: Only concert events are displayed (Rock Legends Live, Jazz Night)
    - expect: 'Concerts' button becomes active/selected
    - expect: Film and comedy events are hidden
    - expect: Event count shows only 2 events
  2. Verify concert event details are correct
    - expect: Rock Legends Live shows £65.00, O2 Arena, London, 150 tickets
    - expect: Jazz Night shows £42.00, Jam Café, Nottingham, 100 tickets

#### 1.3. Film Filter Functionality

**File:** `tests/event-browsing/film-filter.spec.ts`

**Steps:**
  1. Click on the 'Films' filter button
    - expect: Only film events are displayed (Classic Cinema Night, Sci-Fi Marathon)
    - expect: 'Films' button becomes active/selected
    - expect: Concert and comedy events are hidden
    - expect: Event count shows only 2 events
  2. Verify film event details are correct
    - expect: Classic Cinema Night shows £12.50, Broadway Cinema, Nottingham, 200 tickets
    - expect: Sci-Fi Marathon shows £16.50, Showcase Cinema, Bristol, 120 tickets

#### 1.4. Comedy Filter Functionality

**File:** `tests/event-browsing/comedy-filter.spec.ts`

**Steps:**
  1. Click on the 'Comedy' filter button
    - expect: Only comedy events are displayed (Stand-Up Spectacular, Improv Night)
    - expect: 'Comedy' button becomes active/selected
    - expect: Concert and film events are hidden
    - expect: Event count shows only 2 events
  2. Verify comedy event details are correct
    - expect: Stand-Up Spectacular shows £28.00, The Comedy Store, Manchester, 80 tickets
    - expect: Improv Night shows £20.00, Komedia, Bath, 60 tickets

#### 1.5. All Events Filter Reset

**File:** `tests/event-browsing/all-events-reset.spec.ts`

**Steps:**
  1. Apply a filter (e.g., Concerts), then click 'All Events'
    - expect: All 6 events are displayed again
    - expect: 'All Events' button becomes active/selected
    - expect: Previously active filter button becomes inactive
    - expect: Events from all categories (concerts, films, comedy) are visible

### 2. Event Selection and Detail Modal

**Seed:** `tests/seed.spec.ts`

#### 2.1. Concert Event Modal Display

**File:** `tests/event-details/concert-modal.spec.ts`

**Steps:**
  1. Click on the 'Rock Legends Live' concert event card
    - expect: Event detail modal opens
    - expect: Modal displays event type as 'concert'
    - expect: Event title shows 'Rock Legends Live'
    - expect: Performer shows 'The Thunder Band'
    - expect: Venue shows 'O2 Arena, London'
    - expect: Date shows 'Sun, Mar 15, 2026'
    - expect: Time shows '19:00'
    - expect: Price shows '£65.00 per ticket'
    - expect: Availability shows '150 tickets'
    - expect: Event description is displayed
    - expect: Close button (×) is visible
  2. Verify booking form is present in modal
    - expect: 'Purchase Tickets' section is displayed
    - expect: Number of tickets spinner is present with default value '1'
    - expect: Customer information fields are present (Full Name, Email)
    - expect: Payment information section is present
    - expect: Card Number, Expiry Date, CVV, Cardholder Name fields are visible
    - expect: Total shows '£65.00'
    - expect: 'Complete Purchase' button is visible

#### 2.2. Film Event Modal Display

**File:** `tests/event-details/film-modal.spec.ts`

**Steps:**
  1. Click on the 'Classic Cinema Night' film event card
    - expect: Event detail modal opens
    - expect: Modal displays event type as 'film'
    - expect: Event title shows 'Classic Cinema Night'
    - expect: Content shows 'The Godfather'
    - expect: Venue shows 'Broadway Cinema, Nottingham'
    - expect: Date shows 'Fri, Mar 20, 2026'
    - expect: Time shows '20:00'
    - expect: Price shows '£12.50 per ticket'
    - expect: Availability shows '200 tickets'
    - expect: Film-specific description is displayed
  2. Verify booking form shows correct pricing
    - expect: Total shows '£12.50' (different from concert pricing)
    - expect: All form fields are present and consistent with concert modal
    - expect: Form structure is identical across event types

#### 2.3. Comedy Event Modal Display

**File:** `tests/event-details/comedy-modal.spec.ts`

**Steps:**
  1. Click on the 'Stand-Up Spectacular' comedy event card
    - expect: Event detail modal opens
    - expect: Modal displays event type as 'comedy'
    - expect: Event title shows 'Stand-Up Spectacular'
    - expect: Performer shows 'Sarah Johnson'
    - expect: Venue shows 'The Comedy Store, Manchester'
    - expect: Date shows 'Wed, Mar 25, 2026'
    - expect: Time shows '21:00'
    - expect: Price shows '£28.00 per ticket'
    - expect: Availability shows '80 tickets'
    - expect: Comedy-specific description is displayed
  2. Verify booking form shows correct pricing
    - expect: Total shows '£28.00'
    - expect: All form fields are present and function correctly
    - expect: Modal layout is consistent across all event types

#### 2.4. Modal Close Functionality

**File:** `tests/event-details/modal-close.spec.ts`

**Steps:**
  1. Open any event modal and click the close button (×)
    - expect: Modal closes completely
    - expect: User returns to main event listing page
    - expect: No modal content remains visible
    - expect: Previously applied filters remain active
  2. Open modal and click outside the modal area
    - expect: Test if modal can be closed by clicking backdrop
    - expect: Verify expected behavior (close or remain open)

### 3. Booking Process and Form Interaction

**Seed:** `tests/seed.spec.ts`

#### 3.1. Ticket Quantity Selection

**File:** `tests/booking/quantity-selection.spec.ts`

**Steps:**
  1. Open Rock Legends Live event modal and change ticket quantity from 1 to 3
    - expect: Quantity field accepts the new value
    - expect: Total price updates to £195.00 (3 × £65.00)
    - expect: Form remains functional with new quantity
  2. Test quantity spinner with different values (0, 1, 5, 10)
    - expect: Spinner accepts valid positive integers
    - expect: Total price calculates correctly for each quantity
    - expect: Invalid values (negative, zero, non-numeric) are handled appropriately
  3. Test quantity limits based on availability
    - expect: User cannot select more tickets than available
    - expect: Appropriate validation message displays for over-limit quantities
    - expect: Maximum selectable quantity matches event availability

#### 3.2. Customer Information Form

**File:** `tests/booking/customer-info.spec.ts`

**Steps:**
  1. Fill in the Full Name field with valid data
    - expect: Field accepts alphabetic characters and spaces
    - expect: Field retains entered value
    - expect: No validation errors appear for valid names
  2. Fill in the Email field with valid email address
    - expect: Field accepts valid email format (user@domain.com)
    - expect: Field shows no validation errors for valid emails
    - expect: Email format validation works correctly
  3. Test form fields with invalid data
    - expect: Invalid email formats show appropriate error messages
    - expect: Empty required fields are flagged
    - expect: Special characters in name field are handled appropriately

#### 3.3. Payment Information Form

**File:** `tests/booking/payment-info.spec.ts`

**Steps:**
  1. Fill in Card Number field with valid card number
    - expect: Field accepts 16-digit card numbers
    - expect: Card number formatting is applied if present
    - expect: Field validation accepts valid card number patterns
  2. Fill in Expiry Date with valid future date (MM/YY format)
    - expect: Field accepts MM/YY format
    - expect: Field validates future dates
    - expect: Current or past dates show appropriate validation
  3. Fill in CVV with valid 3-digit code
    - expect: Field accepts 3-digit numeric values
    - expect: Field masks or protects CVV input
    - expect: Invalid CVV formats are rejected
  4. Fill in Cardholder Name with valid name
    - expect: Field accepts alphabetic characters and spaces
    - expect: Field accepts uppercase formatting
    - expect: Name matches expected format

#### 3.4. Complete Booking Process

**File:** `tests/booking/complete-booking.spec.ts`

**Steps:**
  1. Complete entire booking form with valid data and click Complete Purchase
    - expect: Form validation passes
    - expect: Purchase process initiates
    - expect: Success confirmation displays
    - expect: User receives booking confirmation
    - expect: Session handles purchase completion appropriately
  2. Verify ticket availability updates after purchase
    - expect: Available ticket count decreases by purchased quantity
    - expect: Event still displays if tickets remain
    - expect: Event shows 'Sold Out' if no tickets remain

### 4. Form Validation and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 4.1. Required Field Validation

**File:** `tests/validation/required-fields.spec.ts`

**Steps:**
  1. Click Complete Purchase without filling any fields
    - expect: Form does not submit
    - expect: Focus moves to first required field (Full Name)
    - expect: Appropriate validation messages display
    - expect: User is prompted to complete required fields
  2. Fill only some required fields and attempt submission
    - expect: Form focuses on first incomplete required field
    - expect: Partially completed form retains entered data
    - expect: Clear indication of which fields need completion

#### 4.2. Email Format Validation

**File:** `tests/validation/email-validation.spec.ts`

**Steps:**
  1. Enter invalid email formats (e.g., 'invalid-email', 'test@', '@domain.com')
    - expect: Clear error message displays for invalid email format
    - expect: Field is highlighted or styled to show error state
    - expect: Form prevents submission with invalid email
  2. Enter valid email formats (e.g., 'user@domain.com', 'test.email@example.co.uk')
    - expect: No validation errors display
    - expect: Field accepts valid email formats
    - expect: Form allows progression with valid email

#### 4.3. Payment Field Validation

**File:** `tests/validation/payment-validation.spec.ts`

**Steps:**
  1. Test card number validation with various formats
    - expect: Invalid card numbers are rejected
    - expect: Card number format validation works
    - expect: Appropriate error messages display for invalid cards
  2. Test expiry date validation with past dates
    - expect: Past dates are rejected with clear error message
    - expect: Future dates are accepted
    - expect: Invalid date formats are handled appropriately
  3. Test CVV validation with invalid formats
    - expect: Non-numeric CVV values are rejected
    - expect: CVV length validation works (3 digits)
    - expect: Invalid CVV shows appropriate error message

### 5. Edge Cases and Error Scenarios

**Seed:** `tests/seed.spec.ts`

#### 5.1. Boundary Value Testing

**File:** `tests/edge-cases/boundary-values.spec.ts`

**Steps:**
  1. Test purchasing exactly the number of available tickets
    - expect: Purchase succeeds
    - expect: Event shows as sold out after purchase
    - expect: No remaining tickets are available
  2. Test purchasing more tickets than available
    - expect: System prevents over-purchasing
    - expect: Clear error message explains ticket limit
    - expect: User can adjust quantity to available amount
  3. Test minimum and maximum quantity values
    - expect: Minimum quantity (1) works correctly
    - expect: Maximum quantity (based on availability) is enforced
    - expect: Edge values calculate total price correctly

#### 5.2. Filter State Management

**File:** `tests/edge-cases/filter-state.spec.ts`

**Steps:**
  1. Apply filter, open event modal, close modal, verify filter remains active
    - expect: Applied filter remains active after modal interaction
    - expect: Event list shows filtered results
    - expect: Filter button remains in selected state
  2. Apply multiple filters in sequence rapidly
    - expect: Each filter application works correctly
    - expect: No race conditions or UI glitches occur
    - expect: Filter states update properly

#### 5.3. Browser and Network Edge Cases

**File:** `tests/edge-cases/browser-network.spec.ts`

**Steps:**
  1. Test application with JavaScript disabled
    - expect: Application provides appropriate fallback behavior
    - expect: Core functionality remains accessible
    - expect: Error messages guide user to enable JavaScript if needed
  2. Test form submission with network connectivity issues
    - expect: Form handles network errors gracefully
    - expect: User receives appropriate error messaging
    - expect: Form data is preserved during network issues
  3. Test page refresh during booking process
    - expect: Form data handling behavior is appropriate
    - expect: User session state is managed correctly
    - expect: No duplicate purchases occur

### 6. Bug Verification and Regression Testing

**Seed:** `tests/seed.spec.ts`

#### 6.1. Total Price Calculation Bug

**File:** `tests/bugs/total-calculation.spec.ts`

**Steps:**
  1. Open Rock Legends Live event modal and change quantity from 1 to 3
    - expect: Total price should update to £195.00 (3 × £65.00)
    - expect: **KNOWN BUG**: Total remains at £65.00 instead of updating
  2. Test total calculation across different events and quantities
    - expect: All events should calculate total correctly
    - expect: Price × Quantity = Correct Total
    - expect: Dynamic price updates work consistently
  3. Test if total updates on field blur or form submission
    - expect: Investigate when total calculation is triggered
    - expect: Document expected vs actual behavior
    - expect: Verify if calculation works at any point in the process

#### 6.2. Cross-Event Consistency

**File:** `tests/bugs/cross-event-consistency.spec.ts`

**Steps:**
  1. Test booking modals across all 6 events
    - expect: All modals display correct event-specific information
    - expect: Form structure is identical across all events
    - expect: Pricing displays correctly for each event
    - expect: All interactive elements work consistently
  2. Test filter functionality with each event type
    - expect: Filters correctly categorize all events
    - expect: No events appear in wrong categories
    - expect: Filter state management works for all categories
