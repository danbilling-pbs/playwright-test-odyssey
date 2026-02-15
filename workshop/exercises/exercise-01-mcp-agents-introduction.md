# Exercise 1: Introduction to Playwright MCP & Agents

**Time:** 20 minutes  
**Objective:** Understand Playwright MCP fundamentals and intelligent agent concepts

## What You Will Learn

- What is Playwright MCP (Model Context Protocol) and how it enables intelligent agents
- How agents can interact with browser contexts in a structured way
- The difference between traditional test automation and agent-driven testing
- Setting up your first MCP-enabled agent workflow

## Key Concepts

### Playwright MCP Overview

The Model Context Protocol (MCP) allows intelligent agents to understand and manipulate browser sessions, making automation more adaptive, resilient, and context-aware. Instead of rigid, pre-scripted tests, agents can:

- **Plan** test strategies based on application analysis
- **Generate** tests dynamically based on discovered functionality  
- **Heal** broken tests by adapting to UI changes
- **Learn** from execution patterns to improve over time

### Agent vs Traditional Testing

| Traditional Testing | Agent-Driven Testing |
|-------------------|---------------------|

| Pre-scripted, rigid | Dynamic, adaptive |
| Breaks on UI changes | Self-healing capabilities |
| Manual maintenance | Automated evolution |
| Static test plans | AI-generated strategies |

## Instructions

### Step 1: Explore MCP Architecture (8 minutes)

1. **Open VS Code** and navigate to your `playwright-test-odyssey` directory
2. **Examine the MCP configuration:**

   ```bash
   code playwright.mcp.json
   ```

3. **Review the agent structure:**

   - Notice how agents are defined with capabilities
   - See how browser context is managed
   - Understand the communication protocol
   - Examine agent tool definitions

### Step 2: Start Your First Agent (12 minutes)

1. **Launch the Ticketyboo application:**

   ```bash
   # Terminal 1 - Keep running
   cd ticketyboo
   npm start
   ```

2. **Initialize the MCP agent runner:**

   ```bash
   # Terminal 2 - Agent commands
   cd playwright-test-odyssey
   npm run agents:sample
   ```

3. **Observe agent behavior:**

   - Watch how the agent explores the application
   - Note the structured data it collects
   - See how it makes decisions about next actions
   - Observe the MCP protocol messages in real-time

### Step 3: Compare Approaches (5 minutes)

**Traditional Test Example:**

```javascript
// Rigid, pre-scripted approach
test('filter concerts', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('[data-testid="concerts-filter"]');
  await expect(page.locator('.event-card')).toContainText('Rock Legends');
});
```

**Agent-Driven Test Example:**

```javascript
// Intelligent, adaptive approach
const agent = await mcp.createAgent({
  goal: 'explore event filtering functionality',
  context: 'ticketyboo booking system',
  adaptation: true,
  healing: true
});

const result = await agent
  .explore()
  .plan()
  .execute()
  .adapt();
```

## Agent Capabilities You'll Explore

### Discovery & Analysis

- **Automatic exploration** of application functionality
- **Dynamic element detection** and interaction mapping
- **User journey identification** through AI analysis
- **Business logic inference** from UI patterns

### Test Planning

- **AI-powered test strategy** generation
- **Risk-based prioritization** of test scenarios
- **Coverage analysis** and gap detection
- **Maintenance prediction** for test longevity

### Execution & Adaptation

- **Self-healing selectors** that adapt to UI changes
- **Context-aware assertions** based on application state
- **Dynamic wait strategies** optimized for performance
- **Intelligent retry mechanisms** with learning capabilities

## Expected Outcomes

- Understanding of MCP architecture and agent concepts
- Familiarity with agent-driven vs traditional testing approaches
- Hands-on experience with your first intelligent agent
- Recognition of the adaptive capabilities agents provide

## Discussion Points

- How could agents improve your current testing challenges?
- What types of applications would benefit most from agent-driven testing?
- How might agents change the role of test automation engineers?
- What are potential risks or limitations of intelligent agents in testing?

## Next Steps

In Exercise 2, you'll work with your AI assistant (Claude/Copilot) to create agent-driven test plans that adapt to the Ticketyboo application's functionality and business requirements.