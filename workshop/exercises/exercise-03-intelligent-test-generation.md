# Exercise 3: Intelligent Test Generation

**Time:** 30 minutes  
**Objective:** Implement AI-generated tests using Playwright MCP and intelligent agents

## What You Will Learn

- How to translate AI-designed test strategies into executable code
- Using Playwright MCP for dynamic test generation
- Implementing self-adapting test logic with intelligent agents
- Creating tests that evolve based on application changes

## Implementation Approach

### From AI Strategy to Executable Tests

In Exercise 2, you collaborated with AI to design agent strategies. Now you'll implement those strategies using Playwright MCP's intelligent automation capabilities.

## Instructions

### Step 1: Set Up Agent-Driven Test Generation (10 minutes)

1. **Create a new agent test file:**

   ```bash
   # In your playwright-test-odyssey directory
   touch tests/agents/discovery-agent.spec.js
   ```

2. **Initialize the MCP agent framework:**

   ```javascript
   const { test, expect } = require('@playwright/test');
   const { MCPAgent } = require('../utils/mcp-agent');

   test.describe('Discovery Agent - Intelligent Exploration', () => {
     let agent;

     test.beforeEach(async ({ page }) => {
       agent = new MCPAgent({
         page,
         name: 'EventExplorer',
         objective: 'discover_and_map_functionality',
         adaptation: true,
         learning: true
       });
     });

     test('Agent discovers application structure', async () => {
       await agent.initialize();
       
       // Agent analyzes the application
       const analysis = await agent.discover({
         target: 'http://localhost:3000',
         scope: 'full_application',
         strategy: 'intelligent_exploration'
       });

       // Agent generates test scenarios based on discovery
       const scenarios = await agent.generateScenarios(analysis);
       
       // Execute AI-determined priority scenarios
       for (const scenario of scenarios.priority) {
         await agent.execute(scenario);
         await agent.validateOutcome(scenario);
       }
     });
   });
   ```

### Step 2: Implement Dynamic Test Generation (15 minutes)

1. **Create the intelligent test generator:**

   ```javascript
   // tests/agents/intelligent-generator.spec.js
   const { test } = require('@playwright/test');

   test('AI generates tests for booking workflow', async ({ page }) => {
     const generator = await page.evaluate(() => {
       // Inject AI-powered analysis script
       return window.mcpAgent.analyzeWorkflow({
         starting_point: document.location.href,
         goal: 'complete_ticket_purchase',
         obstacles: ['form_validation', 'inventory_limits', 'payment_flow'],
         adaptation_rules: [
           'if_element_missing_find_alternatives',
           'if_workflow_changed_discover_new_path',
           'if_validation_added_incorporate_checks'
         ]
       });
     });

     // Agent generates test steps dynamically
     const testSteps = generator.generateOptimalPath();
     
     for (const step of testSteps) {
       await page.evaluate((stepData) => {
         window.mcpAgent.executeStep(stepData);
       }, step);
       
       // Self-validating assertions
       const validation = await page.evaluate(() => {
         return window.mcpAgent.validateCurrentState();
       });
       
       if (!validation.success) {
         // Agent adapts the strategy
         const adaptation = await page.evaluate(() => {
           return window.mcpAgent.adaptStrategy(validation.issues);
         });
         // Continue with adapted approach
       }
     }
   });
   ```

2. **Implement business rule validation agent:**

   ```javascript
   // tests/agents/business-validator.spec.js
   test('Business Logic Guardian validates rules', async ({ page }) => {
     await page.goto('http://localhost:3000');
     
     const validator = new BusinessRuleAgent(page);
     
     // AI discovers business rules from UI behavior
     const discoveredRules = await validator.discoverRules({
       interactions: ['ticket_quantity_changes', 'price_calculations'],
       observations: ['inventory_updates', 'form_validations'],
       learning: true
     });

     // Generate validation tests for discovered rules  
     for (const rule of discoveredRules) {
       const testCases = await validator.generateTestCases(rule);
       
       for (const testCase of testCases) {
         await validator.executeValidation(testCase);
         
         // AI assesses if rule is correctly implemented
         const assessment = await validator.assessImplementation(rule, testCase);
         
         if (assessment.deviation_detected) {
           await validator.reportBusinessLogicIssue({
             rule: rule,
             expected: testCase.expected,
             actual: testCase.actual,
             severity: assessment.severity
           });
         }
       }
     }
   });
   ```

### Step 3: Create Self-Healing Test Logic (5 minutes)

1. **Implement adaptive selectors:**

   ```javascript
   // tests/agents/healing-agent.spec.js
   test('Self-healing agent adapts to UI changes', async ({ page }) => {
     const healer = new SelfHealingAgent(page);
     
     // Attempt to interact with potentially changed elements
     const concertFilterResult = await healer.smartClick({
       primary_selector: '[data-testid="concerts-filter"]',
       fallback_strategies: [
         'find_by_text("Concerts")',
         'find_by_role("button", { name: /concert/i })',
         'find_by_position_near_element("Films")',
         'ai_identify_filter_element()'
       ],
       learning: true // Remember successful adaptations
     });

     if (concertFilterResult.required_adaptation) {
       // Agent learned a new selector - update test suite
       await healer.updateTestSuite({
         old_selector: '[data-testid="concerts-filter"]',
         new_selector: concertFilterResult.successful_selector,
         confidence: concertFilterResult.confidence_score
       });
     }

     // Verify the filtering worked with adaptive assertions
     await healer.smartAssert({
       goal: 'verify_only_concerts_displayed',
       methods: [
         () => expect(page.locator('.event-card')).toContainText('concert'),
         () => expect(page.locator('.event-card')).not.toContainText('film'),
         () => healer.aiVerifyFilteringWorked('concerts')
       ]
     });
   });
   ```

## Agent Utilities Implementation

### Step 4: Create Agent Helper Classes (Optional - Time Permitting)

1. **MCP Agent Base Class:**

   ```javascript
   // utils/mcp-agent.js
   class MCPAgent {
     constructor(options) {
       this.page = options.page;
       this.name = options.name;
       this.objective = options.objective;
       this.adaptationEnabled = options.adaptation;
       this.learningEnabled = options.learning;
       this.memory = new Map(); // Store learned patterns
     }

     async discover(options) {
       // AI-powered application discovery
       return await this.page.evaluate((opts) => {
         return window.aiDiscovery.analyze(opts);
       }, options);
     }

     async generateScenarios(analysis) {
       // Generate test scenarios based on analysis
       const scenarios = await this.aiPlanning.createScenarios({
         analysis: analysis,
         priorities: ['business_critical', 'user_journey', 'edge_cases'],
         adaptation_factors: ['ui_stability', 'data_integrity', 'performance']
       });
       
       return scenarios;
     }

     async adaptStrategy(issues) {
       // Intelligent adaptation to problems
       if (this.adaptationEnabled) {
         const adaptation = await this.aiAdaptation.solve(issues);
         this.memory.set('adaptation_' + Date.now(), adaptation);
         return adaptation;
       }
     }
   }
   ```

## Running Your Intelligent Tests

### Execution Commands

```bash
# Run discovery agent
npx playwright test tests/agents/discovery-agent.spec.js --headed

# Run business validation agent  
npx playwright test tests/agents/business-validator.spec.js

# Run self-healing agent
npx playwright test tests/agents/healing-agent.spec.js

# Run all agents with reporting
npx playwright test tests/agents/ --reporter=html
```

### Agent Coordination

```bash
# Run agents in coordinated sequence
npm run agents:orchestrated-run

# Run agents in parallel with conflict resolution
npm run agents:parallel-execution
```

## Expected Outcomes

- Working intelligent agents that can discover, validate, and adapt
- Experience with AI-generated test logic and self-healing mechanisms  
- Understanding of how agents coordinate and learn from each other
- Practical implementation of MCP concepts in real test scenarios

## Monitoring Agent Behavior

### Agent Analytics Dashboard

- **Discovery metrics:** New elements found, coverage achieved
- **Validation metrics:** Business rules verified, violations detected
- **Healing metrics:** Adaptations made, selector updates, success rates
- **Learning metrics:** Patterns recognized, strategies improved

### Debug and Observe Agents

```javascript
// Enable agent debugging
test('Debug agent decision making', async ({ page }) => {
  const agent = new MCPAgent({ 
    page, 
    debug: true, 
    verboseLogging: true 
  });
  
  // Watch agent reasoning in real-time
  agent.on('decision', (decision) => {
    console.log('Agent Decision:', decision);
  });
  
  agent.on('adaptation', (adaptation) => {
    console.log('Agent Adapted:', adaptation);
  });
  
  await agent.execute();
});
```

## Discussion Points

- How do intelligent agents change your approach to test design?
- What are the trade-offs between agent automation and human control?
- How can teams gain confidence in AI-generated test logic?
- What governance is needed for self-modifying test suites?

## Next Steps

In Exercise 4, you'll explore how agents can automatically heal and adapt when tests break, creating truly resilient automation that evolves with your application.
