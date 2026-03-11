# Business Logic Testing Charter: Pricing & Inventory Management

## Charter Statement  
**"Investigate the pricing calculation and ticket inventory system with various purchase scenarios to discover business logic flaws"**

## Charter Details

### Mission Scope
- Total price calculations (quantity × unit price)
- Ticket availability tracking
- Inventory updates after purchases  
- Edge cases in business rules
- Known pricing calculation bug verification

### Testing Goals
- Validate pricing calculation accuracy
- Test inventory management consistency
- Discover edge cases in business rules
- Document existing bugs thoroughly
- Identify data integrity issues

### Resources/Tools
- Calculator for manual verification
- Multiple browser sessions/tabs
- Network throttling tools
- Browser developer tools
- Test data scenarios

### Time Estimate
**Medium (1-2 hours)**

### Risk Focus
**HIGH PRIORITY** - Business logic flaws could lead to:
- Revenue loss from incorrect pricing
- Customer complaints and disputes
- Inventory overselling
- Financial reconciliation issues

## Known Issues to Investigate

### Confirmed Bug: Price Calculation
- **Issue**: Total price doesn't update when quantity changes
- **Test**: Change quantity from 1 to 3 for £65.00 event
- **Expected**: £195.00 (3 × £65.00)
- **Actual**: Remains £65.00
- **Impact**: Revenue loss, customer confusion

## Test Scenarios

### Pricing Calculation Tests
1. **Single ticket purchases** - Verify 1:1 price calculation
2. **Multiple ticket purchases** - Test quantity × price math
3. **Different price points** - £12.50, £28.00, £65.00 events
4. **Maximum quantity** - Test with highest allowed quantities
5. **Edge quantities** - 0, 1, maximum available tickets

### Inventory Management Tests  
1. **Available tickets display** - Verify counts are accurate
2. **Purchase impacts** - Check if availability decreases
3. **Concurrent purchases** - Multiple users buying same event
4. **Sold out scenarios** - What happens when no tickets left
5. **Over-booking prevention** - Block purchases > availability

### Data Consistency Tests
- Refresh page during booking process
- Network interruption during purchase
- Browser back/forward button behavior
- Multiple tab scenarios

## Session Report Template
