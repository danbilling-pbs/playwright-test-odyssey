# Exercise 4: Test Healing & Adaptation

**Time:** 25 minutes  
**Objective:** Create self-healing tests that automatically adapt to application changes

## What You Will Learn

- How intelligent agents detect and respond to test failures
- Implementing adaptive selectors that evolve with UI changes  
- Creating healing strategies for common test breakage scenarios
- Building tests that improve themselves over time through machine learning

## The Problem: Brittle Test Automation

### Traditional Test Failures

```javascript
// Brittle test - breaks when UI changes
test('Traditional approach - fragile', async ({ page }) => {
  await page.click('#submit-btn'); // ❌ Breaks if ID changes
  await page.click('.red-button'); // ❌ Breaks if CSS changes  
  await page.click('text=Submit'); // ❌ Breaks if text changes
});
```

### Agent-Driven Solution

```javascript
// Self-healing test - adapts automatically
test('Agent approach - resilient', async ({ page }) => {
  const agent = new HealingAgent(page);
  await agent.smartClick({
    intent: 'submit_form',
    fallback_strategies: ['id', 'class', 'text', 'position', 'ai_identification'],
    learning: true
  });
});
```

## Instructions

### Step 1: Simulate Application Changes (8 minutes)

1. **Modify the Ticketyboo application** to simulate common UI changes:

   ```bash
   # Create a modified version for testing healing
   cp -r ticketyboo ticketyboo-modified
   cd ticketyboo-modified
   ```

2. **Make deliberate breaking changes:**

   **Change 1: Update CSS classes**

   ```html
   <!-- Original -->
   <button class="filter-btn concerts">Concerts</button>
   
   <!-- Modified --> 
   <button class="new-filter concert-category">Concerts</button>
   ```

   **Change 2: Modify element structure**

   ```html
   <!-- Original -->
   <div class="event-card">
     <h3>Rock Legends Live</h3>
   </div>

   <!-- Modified -->
   <article class="event-item">
     <header><h3>Rock Legends Live</h3></header>
   </article>
   ```

   **Change 3: Add new intermediate elements**

   ```html
   <!-- Original -->
   <button id="purchase-btn">Complete Purchase</button>

   <!-- Modified -->
   <div class="button-wrapper">
     <button data-action="purchase">Complete Purchase</button>
   </div>
   ```

3. **Start the modified application:**

   ```bash
   cd ticketyboo-modified  
   npm start -- --port 3001  # Run on different port
   ```

### Step 2: Implement Healing Strategies (12 minutes)

1. **Create adaptive selector engine:**

   ```javascript
   // tests/healing/adaptive-selectors.spec.js
   const { test, expect } = require('@playwright/test');

   class AdaptiveSelector {
     constructor(page) {
       this.page = page;
       this.selectorHistory = new Map();
       this.successPatterns = new Map();
     }

     async findElement(intent, strategies) {
       for (const strategy of strategies) {
         try {
           const element = await this.tryStrategy(strategy);
           if (element) {
             // Learn successful pattern
             this.recordSuccess(intent, strategy);
             return { element, strategy, adapted: false };
           }
         } catch (error) {
           console.log(`Strategy ${strategy.type} failed:`, error.message);
         }
       }

       // All strategies failed - use AI healing
       return await this.aiHealing(intent);
     }

     async aiHealing(intent) {
       const context = await this.page.evaluate(() => ({
         html: document.documentElement.outerHTML,
         url: window.location.href,
         timestamp: Date.now()
       }));

       // AI analyzes the page to find the intended element
       const aiSuggestion = await this.analyzeWithAI({
         intent,
         context,
         previousPatterns: this.successPatterns.get(intent) || []
       });

       if (aiSuggestion.confidence > 0.8) {
         const element = await this.page.locator(aiSuggestion.selector);
         this.recordAdaptation(intent, aiSuggestion);
         return { element, strategy: aiSuggestion, adapted: true };
       }

       throw new Error(`Cannot find element for intent: ${intent}`);
     }

     recordSuccess(intent, strategy) {
       if (!this.successPatterns.has(intent)) {
         this.successPatterns.set(intent, []);
       }
       this.successPatterns.get(intent).unshift({
         ...strategy,
         timestamp: Date.now(),
         success: true
       });
     }

     recordAdaptation(intent, newStrategy) {
       console.log(`🔧 Healing: Learned new selector for ${intent}`);
       this.recordSuccess(intent, newStrategy);
       
       // Update test suite with new selector
       this.suggestTestUpdate(intent, newStrategy);
     }
   }

   // Test the adaptive selector
   test('Healing agent adapts to changed selectors', async ({ page }) => {
     const selector = new AdaptiveSelector(page);
     
     await page.goto('http://localhost:3001'); // Modified app
     
     // Try to click concert filter with healing  
     const result = await selector.findElement('filter_concerts', [
       { type: 'id', value: '#concerts-filter' },
       { type: 'class', value: '.concerts' }, 
       { type: 'text', value: 'text=Concerts' },
       { type: 'data-testid', value: '[data-testid="concerts-filter"]' }
     ]);
     
     await result.element.click();
     
     if (result.adapted) {
       console.log('✅ Agent successfully healed broken selector');
       console.log('New strategy:', result.strategy);
     }
     
     // Verify the filtering still works
     await expect(page.locator('.event-card, .event-item')).toContainText('concert');
   });
   ```

2. **Implement content-aware healing:**

   ```javascript
   // tests/healing/content-healing.spec.js  
   test('Healing agent adapts to content changes', async ({ page }) => {
     await page.goto('http://localhost:3001');

     const contentHealer = {
       async findByIntent(page, intent) {
         const strategies = {
           'book_ticket': [
             () => page.getByRole('button', { name: /purchase|book|buy/i }),
             () => page.locator('[data-action*="purchase"]'),
             () => page.locator('button:has-text("Complete")'),
             () => this.aiIdentifyBookingButton(page)
           ],
           'filter_events': [
             () => page.getByRole('button', { name: /concert|film|comedy/i }),
             () => page.locator('[class*="filter"]'),
             () => page.locator('button').filter({ hasText: /concert|film|comedy/i }),
             () => this.aiIdentifyFilterButtons(page)
           ]
         };

         for (const strategy of strategies[intent] || []) {
           try {
             const element = await strategy();
             if (await element.count() > 0) {
               return element.first();
             }
           } catch (e) {
             continue; // Try next strategy
           }
         }
         
         throw new Error(`No healing strategy succeeded for: ${intent}`);
       },

       async aiIdentifyBookingButton(page) {
         // AI-powered element identification
         return await page.evaluate(() => {
           const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));
           
           // AI logic to identify purchase/booking buttons
           return buttons.find(btn => {
             const text = btn.textContent.toLowerCase();
             const attrs = Array.from(btn.attributes).map(a => a.name + '=' + a.value).join(' ');
             
             return (
               text.includes('purchase') || text.includes('buy') || 
               text.includes('book') || text.includes('complete') ||
               attrs.includes('purchase') || attrs.includes('buy')
             );
           });
         });
       }
     };

     // Test healed booking flow
     const bookingButton = await contentHealer.findByIntent(page, 'book_ticket');
     await expect(bookingButton).toBeVisible();
     console.log('✅ Successfully found booking button with healing');
   });
   ```

### Step 3: Create Learning-Based Adaptation (5 minutes)

1. **Implement pattern learning:**

   ```javascript
   // tests/healing/learning-agent.spec.js
   test('Agent learns and improves over time', async ({ page }) => {
     const learningAgent = {
       patterns: new Map(),
       
       async learnPattern(selector, success, context) {
         const key = this.generatePatternKey(context);
         
         if (!this.patterns.has(key)) {
           this.patterns.set(key, {
             successes: [],
             failures: [],
             confidence: 0
           });
         }
         
         const pattern = this.patterns.get(key);
         
         if (success) {
           pattern.successes.push({ selector, timestamp: Date.now() });
           pattern.confidence = Math.min(pattern.confidence + 0.1, 1.0);
         } else {
           pattern.failures.push({ selector, timestamp: Date.now() });
           pattern.confidence = Math.max(pattern.confidence - 0.05, 0);
         }
         
         console.log(`📊 Pattern confidence for ${key}: ${pattern.confidence}`);
       },
       
       async predictBestSelector(context) {
         const key = this.generatePatternKey(context);
         const pattern = this.patterns.get(key);
         
         if (pattern && pattern.confidence > 0.7) {
           const recentSuccess = pattern.successes[pattern.successes.length - 1];
           console.log(`🎯 Using learned selector: ${recentSuccess.selector}`);
           return recentSuccess.selector;
         }
         
         return null; // No confident prediction
       },
       
       generatePatternKey(context) {
         // Create unique key based on page context
         return `${context.url}_${context.pageType}_${context.action}`;
       }
     };

     // Test the learning capability
     await page.goto('http://localhost:3001');
     
     const context = {
       url: page.url(),
       pageType: 'event_listing',
       action: 'filter_concerts'
     };
     
     // Try predicted selector first
     let selector = await learningAgent.predictBestSelector(context);
     
     if (!selector) {
       // Fall back to discovery
       selector = '.new-filter.concert-category'; // This will be "learned"
     }
     
     try {
       await page.click(selector);
       await learningAgent.learnPattern(selector, true, context);
       console.log('✅ Agent learned successful selector pattern');
     } catch (error) {
       await learningAgent.learnPattern(selector, false, context);
       console.log('❌ Agent learned failed selector pattern');
     }
   });
   ```

## Advanced Healing Strategies

### Visual Regression Healing

```javascript
// Detect UI changes through visual comparison
test('Visual healing detects layout changes', async ({ page }) => {
  await page.goto('http://localhost:3001');
  
  const visualHealer = {
    async detectLayoutChanges(page, baseline) {
      const current = await page.screenshot();
      const diff = await this.compareScreenshots(baseline, current);
      
      if (diff.changedAreas.length > 0) {
        console.log(`🔍 Detected ${diff.changedAreas.length} UI changes`);
        return await this.adaptToChanges(page, diff.changedAreas);
      }
    }
  };
});
```

### Performance-Aware Healing

```javascript
// Adapt wait strategies based on performance
test('Performance healing adjusts timing', async ({ page }) => {
  await page.goto('http://localhost:3001');
  
  const performanceHealer = {
    async adaptiveWait(selector, action) {
      const startTime = Date.now();
      
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        const loadTime = Date.now() - startTime;
        
        // Learn optimal wait times
        this.recordWaitTime(selector, loadTime);
        
        // Adjust future waits based on learned patterns
        const optimalWait = this.calculateOptimalWait(selector);
        console.log(`⏱️ Learned optimal wait: ${optimalWait}ms for ${selector}`);
        
      } catch (error) {
        // Increase wait time and try alternative selectors
        return await this.healTimeout(selector, action);
      }
    }
  };
});
```

## Running Healing Tests

```bash
# Test against original application (should pass)
npx playwright test tests/healing/ --config=original.config.js

# Test against modified application (triggers healing)  
npx playwright test tests/healing/ --config=modified.config.js --headed

# Compare healing effectiveness
npm run test:healing-analysis
```

## Expected Outcomes

- Tests that automatically adapt to UI changes without manual intervention
- Understanding of different healing strategies for various failure modes
- Experience with AI-powered element identification and pattern learning
- Confidence in deploying self-maintaining test suites

## Discussion Points

- How much healing automation is appropriate vs. human oversight?
- What are the risks of tests that modify themselves?
- How can teams maintain confidence in adaptive test results?
- When should healing trigger alerts vs. silent adaptation?

## Next Steps

In Exercise 5, you'll scale these intelligent agents to cloud-based execution environments, learning how to deploy and manage agent-driven testing across distributed infrastructure.