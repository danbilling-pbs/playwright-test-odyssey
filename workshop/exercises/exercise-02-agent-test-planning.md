# Exercise 2: Agent-Driven Test Planning

**Time:** 25 minutes  
**Objective:** Use AI assistants to create intelligent, adaptive test plans

## What You Will Learn

- How to leverage AI assistants (Claude/Copilot) for test planning
- Agent-driven analysis of application functionality and risks
- Creating adaptive test strategies that evolve with the application
- Integrating human expertise with AI-powered planning

## AI Assistant Setup

### Prerequisites

Ensure you have access to one of these AI coding assistants:

- **Claude** (Anthropic) - via web interface or API
- **GitHub Copilot** - integrated in VS Code
- **ChatGPT** or similar coding-capable AI

### Workshop Prompt Template

Use this template to engage your AI assistant:

```text
I'm working on a Playwright MCP workshop with intelligent agents for testing. 

Application: Ticketyboo (event booking system at localhost:3000)
Features: Event browsing, filtering (concerts/films/comedy), ticket booking, payment flow

Help me create an agent-driven test strategy that can:
1. Automatically discover and prioritize test scenarios
2. Adapt to UI changes and evolving functionality  
3. Generate self-healing test scripts
4. Identify risk areas and coverage gaps

Please analyze the application and suggest an intelligent test planning approach.
```

## Instructions

### Step 1: AI-Powered Application Analysis (10 minutes)

1. **Start a conversation with your AI assistant** using the template above

2. **Share the Ticketyboo application details:**
   - Event categories: Concerts, Films, Comedy
   - Key workflows: Browse → Filter → View Details → Book Tickets
   - Business rules: 60 ticket purchase limit, inventory tracking
   - Payment simulation with form validation

3. **Ask your AI assistant to analyze:**

   ```text
   Based on this event booking system, what are the highest-risk areas 
   that intelligent agents should prioritize for testing?
   
   Consider:
   - Critical user journeys
   - Data integrity risks  
   - UI stability concerns
   - Business logic validation
   ```

4. **Review the AI's risk assessment** and note key insights

### Step 2: Generate Adaptive Test Strategies (10 minutes)

1. **Request agent-specific test strategies:**

   ```text
   Design 3 different agent profiles for testing this application:
   
   1. Discovery Agent - explores new functionality
   2. Validation Agent - ensures business rules  
   3. Healing Agent - adapts to UI changes
   
   For each agent, define:
   - Primary objectives
   - Decision-making criteria
   - Adaptation mechanisms
   - Success metrics
   ```

2. **Collaborate on test scenario generation:**

   ```text
   Help me create intelligent test scenarios that can:
   - Automatically adjust to inventory changes
   - Handle dynamic pricing updates
   - Adapt to new event categories
   - Self-repair when selectors change
   
   Provide code examples using Playwright MCP concepts.
   ```

3. **Document the AI's recommendations** in your workspace

### Step 3: Create Your Agent Test Plan (5 minutes)

Based on your AI collaboration, create a structured test plan:

**Agent 1: Discovery Agent**

```javascript
const discoveryAgent = {
  name: "EventExplorer",
  objective: "Discover and map application functionality",
  capabilities: [
    "automatic_navigation",
    "feature_detection", 
    "journey_mapping",
    "coverage_analysis"
  ],
  adaptations: {
    newElements: "investigate_and_categorize",
    changedLayouts: "remap_navigation_paths",
    newFeatures: "generate_exploration_tests"
  }
};
```

**Agent 2: Business Logic Validator**

```javascript
const validationAgent = {
  name: "BusinessRuleGuardian", 
  objective: "Ensure business logic integrity",
  capabilities: [
    "inventory_tracking",
    "pricing_validation",
    "limit_enforcement",
    "data_consistency"
  ],
  rules: [
    "max_60_tickets_per_transaction",
    "inventory_decreases_after_purchase", 
    "price_calculation_accuracy",
    "payment_form_validation"
  ]
};
```

**Agent 3: Self-Healing Maintainer**

```javascript
const healingAgent = {
  name: "TestHealer",
  objective: "Maintain test stability through UI changes",
  capabilities: [
    "selector_adaptation",
    "element_discovery", 
    "flow_reconstruction",
    "assertion_adjustment"
  ],
  healing_strategies: {
    missing_elements: "find_similar_elements_by_function",
    changed_selectors: "update_with_stable_alternatives",
    broken_flows: "discover_new_paths_to_goals"
  }
};
```

## Advanced AI Collaboration Techniques

### Iterative Refinement

```text
Review my agent configuration and suggest improvements:
- Are there missing edge cases?
- Could the adaptation logic be more robust?
- How can agents better coordinate with each other?
```

### Context-Aware Planning

```text
The Ticketyboo application might add new features like:
- User accounts and login
- Event reviews and ratings
- Group booking discounts

How should my agents prepare for these potential changes?
Design adaptive strategies that can evolve with the application.
```

### Risk-Based Prioritization

```text
Help me create a risk matrix for agent-driven testing:
- High impact, high likelihood scenarios
- Business-critical paths that need constant validation
- Areas where traditional testing often breaks
- Opportunities for intelligent automation
```

## Expected Outcomes

- Comprehensive, AI-assisted test strategy for the Ticketyboo application
- Understanding of how agents can adapt to changing requirements
- Experience collaborating with AI for test planning and strategy
- Agent configurations ready for implementation in Exercise 3

## Real-World Applications

- **E-commerce platforms:** Agents that adapt to product catalog changes
- **Financial applications:** Validation agents for regulatory compliance
- **SaaS products:** Discovery agents for feature evolution tracking
- **Mobile applications:** Healing agents for cross-device compatibility

## Discussion Points

- How did the AI assistant's suggestions compare to your manual analysis?
- What types of insights did the AI provide that you might have missed?
- How can agents balance automation with human oversight and control?
- What are the implications of AI-driven test planning for team workflows?

## Troubleshooting AI Collaboration

- **Vague responses:** Provide more specific application context
- **Generic suggestions:** Ask for Playwright MCP-specific examples  
- **Overly complex plans:** Request simplified, practical approaches
- **Missing edge cases:** Prompt for corner cases and failure scenarios

## Next Steps

In Exercise 3, you'll implement these AI-designed agent strategies using Playwright MCP, turning your collaborative test plan into executable intelligent automation.