# Playwright Test Odyssey

Playwright Test Odyssey Workshop Repo

## Usage

- Run tests: `npm test`

## Playwright agents

- Run the sample agent (opens a browser, visits example.com, saves screenshot):

	- `npm run agents:sample`

- Run the Playwright test runner through the agent runner (passes CLI args through):

	- `npm run agents:run -- --project=chromium`

- MCP config: `playwright.mcp.json` describes available agents.
