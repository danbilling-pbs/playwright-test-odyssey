# Ticketyboo Event Ticketing Application - Comprehensive Test Plan

## Application Overview

The Ticketyboo application is an event ticketing platform that allows users to browse, filter, and purchase tickets for various events (concerts, films, comedy shows). The application features event listing, filtering capabilities, detailed event modals with booking forms, payment processing, and inventory management. Key components include event browsing, category filtering, ticket purchasing with form validation, and real-time inventory updates.

## Test Scenarios

### 1. Event Browsing and Display

**Seed:** `tests/seed.spec.ts`

#### 1.1. Homepage Event Display

**File:** `tests/event-browsing/homepage-display.spec.ts`

**Steps:**
  1. Navigate to the application homepage
    - expect: Page title shows 'Ticketyboo - Event Tickets'
    - expect: Header displays '🎫 Ticketyboo' branding
    - expect: Tagline 'Your ticket to amazing events!' is visible
    - expect: All 6 default events are displayed in a grid layout
  2. Verify event card information display
    - expect: Each event card shows event type icon
    - expect: Event name is displayed as a heading
    - expect: Artist/performer information is shown
    - expect: Venue location with 📍 icon is displayed
    - expect: Date and time with 📅 and 🕐 icons are shown
    - expect: Price per ticket is displayed
    - expect: Available ticket count is shown

#### 1.2. Event Category Filtering

**File:** `tests/event-browsing/category-filtering.spec.ts`

**Steps:**
  1. Click on 'All Events' filter button
    - expect: All Events button becomes active/highlighted
    - expect: All 6 events are displayed
    - expect: Events of all types (concert, film, comedy) are shown
  2. Click on 'Concerts' filter button
    - expect: Concerts button becomes active
    - expect: Only concert events are displayed
    - expect: Film and comedy events are hidden
    - expect: At least 2 concert events should be visible
  3. Click on 'Films' filter button
    - expect: Films button becomes active
    - expect: Only film events are displayed
    - expect: Concert and comedy events are hidden
    - expect: At least 2 film events should be visible
  4. Click on 'Comedy' filter button
    - expect: Comedy button becomes active
    - expect: Only comedy events are displayed
    - expect: Concert and film events are hidden
    - expect: At least 2 comedy events should be visible
  5. Return to 'All Events' filter
    - expect: All Events button becomes active again
    - expect: All 6 events are displayed again
    - expect: Filter state resets properly

### 2. Event Details and Modal Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1. Event Details Modal Display

**File:** `tests/event-details/modal-display.spec.ts`

**Steps:**
  1. Click on a concert event card (Rock Legends Live)
    - expect: Modal dialog opens and overlays the main content
    - expect: Close button (×) is visible in top corner
    - expect: Event type icon is displayed correctly
    - expect: Event name appears as main heading
    - expect: Artist/performer name is shown
    - expect: Venue details with location icon
    - expect: Date and time information with appropriate icons
    - expect: Price per ticket is displayed
    - expect: Current ticket availability is shown
    - expect: Event description text is present
  2. Close the modal using the × button
    - expect: Modal closes completely
    - expect: Returns to main event listing page
    - expect: No modal content remains visible
  3. Click on a film event card (Classic Cinema Night)
    - expect: Film event modal opens with film-specific icon
    - expect: All modal elements display correctly
    - expect: Film title and details are appropriate
    - expect: Modal structure is consistent with concert modal
  4. Click on a comedy event card (Stand-Up Spectacular)
    - expect: Comedy event modal opens with comedy-specific icon
    - expect: All modal elements display correctly
    - expect: Comedian name and details are appropriate
    - expect: Modal structure is consistent across event types

### 3. Ticket Booking Form Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. Form Validation and Required Fields

**File:** `tests/booking/form-validation.spec.ts`

**Steps:**
  1. Open any event modal and click 'Complete Purchase' with empty form
    - expect: Form does not submit
    - expect: Focus moves to first required field (Full Name)
    - expect: Form validation prevents submission
  2. Fill only the Full Name field and click 'Complete Purchase'
    - expect: Form does not submit
    - expect: Focus moves to Email field
    - expect: Previous field retains entered data
  3. Fill Name and Email fields, then click 'Complete Purchase'
    - expect: Form does not submit
    - expect: Focus moves to Card Number field
    - expect: All previous fields retain entered data
  4. Enter invalid email format (e.g., 'invalid-email')
    - expect: Form validation catches invalid email
    - expect: Focus returns to Email field when attempting to submit
    - expect: Form does not proceed with invalid email
  5. Enter valid email format (e.g., 'user@example.com')
    - expect: Email field accepts valid format
    - expect: Form can proceed to next validation step

#### 3.2. Successful Ticket Purchase Flow

**File:** `tests/booking/successful-purchase.spec.ts`

**Steps:**
  1. Open Stand-Up Spectacular event (£28.00 per ticket)
    - expect: Event modal opens
    - expect: Price shows £28.00 per ticket
    - expect: Total shows £28.00
  2. Fill all required fields: Name='John Smith', Email='john.smith@email.com', Card='4532 1234 5678 9012', Expiry='12/28', CVV='123', Cardholder='JOHN SMITH'
    - expect: All fields accept valid data
    - expect: No validation errors occur
  3. Change ticket quantity to 3
    - expect: Quantity field updates to 3
    - expect: Note: Total may not update visually (known UI issue) but backend calculation should be correct
  4. Click 'Complete Purchase'
    - expect: Purchase processes successfully
    - expect: Success modal appears with green checkmark
    - expect: Confirmation ID is generated (e.g., #2)
    - expect: Shows correct event name and details
    - expect: Shows correct quantity (3 tickets)
    - expect: Shows correct total paid (£84.00 = £28.00 × 3)
    - expect: Shows customer information correctly
    - expect: Shows masked card number (e.g., '**** **** **** 9012')
    - expect: Shows cardholder name
  5. Close success modal and check event listing
    - expect: Success modal closes
    - expect: Returns to main event listing
    - expect: Stand-Up Spectacular available tickets decreased by 3 (from 80 to 77)
    - expect: Inventory system updated correctly

### 4. Inventory and Business Logic

**Seed:** `tests/seed.spec.ts`

#### 4.1. Inventory Limit Validation

**File:** `tests/booking/inventory-limits.spec.ts`

**Steps:**
  1. Open Improv Night event (60 tickets available)
    - expect: Event modal shows 60 tickets available
  2. Enter quantity greater than available stock (e.g., 65 tickets)
    - expect: Quantity field accepts the input initially
  3. Fill all other required fields with valid data
    - expect: All fields accept valid information
  4. Attempt to complete purchase
    - expect: Purchase is blocked
    - expect: Focus returns to quantity field
    - expect: System prevents over-purchasing
    - expect: No purchase confirmation occurs
  5. Change quantity to valid amount within available stock (e.g., 5 tickets)
    - expect: Purchase can proceed successfully
    - expect: Inventory updates correctly after purchase

#### 4.2. Real-time Inventory Updates

**File:** `tests/booking/inventory-updates.spec.ts`

**Steps:**
  1. Note the initial available ticket count for Jazz Night event
    - expect: Current availability is displayed (e.g., 100 tickets available)
  2. Purchase 2 tickets for Jazz Night event successfully
    - expect: Purchase completes with success confirmation
    - expect: Shows correct quantity and pricing in confirmation
  3. Return to main event listing and check Jazz Night availability
    - expect: Available ticket count decreased by purchased amount
    - expect: Inventory reflects the real-time update
    - expect: Other events' inventory remains unchanged

### 5. UI Issues and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 5.1. Quantity Update Display Bug

**File:** `tests/bugs/quantity-display-issue.spec.ts`

**Steps:**
  1. Open any event modal and note the initial total price
    - expect: Total shows price for 1 ticket
  2. Change ticket quantity to 3
    - expect: Quantity field updates to 3
  3. Observe the total price display
    - expect: BUG: Total price may not update visually
    - expect: Display may still show single ticket price instead of multiplied amount
  4. Complete purchase with valid payment information
    - expect: Despite display issue, backend calculation is correct
    - expect: Success modal shows correct total paid amount
    - expect: Actual charge reflects proper multiplication (quantity × unit price)

#### 5.2. Payment Method Display

**File:** `tests/booking/payment-security.spec.ts`

**Steps:**
  1. Complete a purchase with card number '4532 1234 5678 9012'
    - expect: Purchase completes successfully
  2. Check payment method in success confirmation
    - expect: Card number is properly masked
    - expect: Shows only last 4 digits (e.g., '**** **** **** 9012')
    - expect: Full card number is not displayed for security

### 6. Cross-Event Type Testing

**Seed:** `tests/seed.spec.ts`

#### 6.1. Event Type Consistency

**File:** `tests/event-types/consistency-testing.spec.ts`

**Steps:**
  1. Test booking flow for each event type: Concert (Rock Legends Live), Film (Classic Cinema Night), Comedy (Stand-Up Spectacular)
    - expect: All event types use identical modal structure
    - expect: Form fields are consistent across event types
    - expect: Validation rules are the same for all events
    - expect: Purchase flow works identically
    - expect: Success confirmations follow same format
  2. Verify event-specific information displays correctly for each type
    - expect: Concert events show appropriate venues and artists
    - expect: Film events show movie titles and cinema locations
    - expect: Comedy events show comedian names and comedy venues
    - expect: Each type displays appropriate descriptive text
    - expect: Icons match event types correctly

### 7. Accessibility and User Experience

**Seed:** `tests/seed.spec.ts`

#### 7.1. Modal Interaction

**File:** `tests/ui-ux/modal-interaction.spec.ts`

**Steps:**
  1. Open any event modal
    - expect: Modal overlays main content properly
    - expect: Background is dimmed/disabled
    - expect: Close button is easily accessible
  2. Test modal closing methods
    - expect: Click × button closes modal
    - expect: Modal closes completely without leaving artifacts
    - expect: Focus returns to appropriate element

#### 7.2. Form Usability

**File:** `tests/ui-ux/form-usability.spec.ts`

**Steps:**
  1. Navigate through form fields using Tab key
    - expect: Tab order follows logical sequence
    - expect: All form fields are keyboard accessible
    - expect: Focus indicators are visible
  2. Test form field placeholders and labels
    - expect: All fields have descriptive labels
    - expect: Placeholder text provides helpful examples
    - expect: Required fields are clearly indicated
