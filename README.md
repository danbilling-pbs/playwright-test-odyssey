# 🎭 Playwright Test Odyssey

A Playwright testing project with traditional test automation examples and an intelligent agents workshop for exploring next-generation testing concepts.

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** ([Download](https://nodejs.org))
- **Git** ([Download](https://git-scm.com))
- **VS Code** (Recommended - [Download](https://code.visualstudio.com))

### Setup

1. **Clone this repository:**
   ```bash
   git clone https://github.com/danbilling-pbs/playwright-test-odyssey.git
   cd playwright-test-odyssey
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npx playwright install
   ```

3. **Verify installation:**
   ```bash
   npx playwright test --version
   ```

### Target Application

Tests are designed for **[Ticketyboo](https://github.com/danbilling-pbs/ticketyboo)** - an event booking application.

**Set up Ticketyboo (in a separate terminal):**
```bash
git clone https://github.com/danbilling-pbs/ticketyboo.git
cd ticketyboo
npm install
npm start  # Runs at http://localhost:3000
```

## 🧪 Running Tests

### Basic Commands
```bash
# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Generate test code interactively
npx playwright codegen localhost:3000
```

### Test Reports
```bash
# Run tests and open HTML report
npx playwright test --reporter=html
npx playwright show-report
```

## 📁 Project Structure

```
├── tests/                      # Test files
│   ├── example.spec.js        # Basic example tests
│   ├── booking/               # Booking flow tests
│   ├── event-browsing/        # Event browsing tests
│   ├── event-details/         # Event details tests
│   └── bugs/                  # Bug verification tests
├── test-plans/                # Test planning documents
├── test-charters/             # Exploratory test charters
├── workshop/                  # Workshop materials
│   ├── exercises/             # Hands-on exercises
│   └── setup/                 # Setup guides
├── playwright.config.js       # Playwright configuration
└── package.json               # Dependencies and scripts
```

## 🎓 Workshop: Intelligent Agents

This project includes a comprehensive workshop on **intelligent testing agents** and **Playwright MCP (Model Context Protocol)**.

**👉 [View Workshop Materials](README-workshops.md)**

The workshop covers:
- Agent-based testing architecture
- Self-healing test automation
- AI-assisted test planning
- Cloud-native agent deployment
- Advanced orchestration patterns

### Workshop Quick Start
```bash
# See setup requirements
cat workshop/setup/pre-workshop-checklist.md

# Start with Exercise 1
open workshop/exercises/exercise-01-mcp-agents-introduction.md
```

## 🛠️ Configuration

### Playwright Configuration
- **Browser:** Chromium (default)
- **Timeout:** 30 seconds
- **Headless:** Yes (use `--headed` to show browser)
- **Reports:** HTML and console output

### Available Scripts
```bash
npm test           # Run all tests
npm run test:headed # Run with visible browser
npm run test:debug  # Debug mode
npm run agents:run  # Run agent framework (workshop)
npm run agents:sample # Run sample agent (workshop)
```

## 📚 Documentation

- **Setup Guides:** [`workshop/setup/`](workshop/setup/)
- **Workshop Materials:** [`README-workshops.md`](README-workshops.md)
- **Test Plans:** [`test-plans/`](test-plans/)
- **Playwright Docs:** [playwright.dev](https://playwright.dev)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests
5. Submit a pull request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**New to Playwright?** Start with the [basic tests](tests/example.spec.js) or explore the [workshop materials](workshops.md) for advanced concepts!



