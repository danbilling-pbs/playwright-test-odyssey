# 🎭 Playwright Test Odyssey

**A comprehensive hands-on workshop for learning web application testing with Playwright**

Learn to test web applications systematically using Microsoft's Playwright framework. This workshop takes you from basic application exploration to advanced automated testing concepts through practical exercises with a real application.

## 🎯 What You'll Learn

- **Systematic application exploration** and test planning
- **Playwright fundamentals** - writing, running, and debugging tests
- **Test automation best practices** - form validation, edge cases, business rules
- **Advanced patterns** - Page Objects, data-driven testing, complex workflows
- **Real-world application** testing with the Ticketyboo event booking system

## 🏗️ Workshop Structure

### **Exercises** (`workshop/exercises/`)
- **Exercise 1:** Application Discovery (15 min)
- **Exercise 2:** Test Planning & Scenarios (20 min)  
- **Exercise 3:** Your First Playwright Test (20 min)
- **Exercise 4:** Form Validation Testing (15 min)
- **Exercise 5:** Edge Cases & Business Rules (20 min)
- **Exercise 6:** Page Object Pattern (25 min)
- **Exercise 7:** Data-Driven Testing (20 min)
- **Exercise 8:** Advanced Scenarios (25 min)

**Total Time:** 90 minutes (core) to 6+ hours (extended)

### **Target Application**
We'll test **[Ticketyboo](https://github.com/danbilling-pbs/ticketyboo)** - a realistic event booking system with:
- Event browsing and filtering
- Ticket booking workflow
- Form validation and business logic
- Inventory management
- Payment processing simulation

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js 16+** ([Download](https://nodejs.org))
- **Git** ([Download](https://git-scm.com))
- **Code Editor** (VS Code recommended)

### 2. Setup Applications

**Install the Ticketyboo application** (system under test):
```bash
git clone https://github.com/danbilling-pbs/ticketyboo.git
cd ticketyboo
npm install
npm start  # Runs at http://localhost:3000
```

**Install this testing repository** (in a new terminal):
```bash
git clone https://github.com/danbilling-pbs/playwright-test-odyssey.git
cd playwright-test-odyssey
npm install
npx playwright install
```

### 3. Verify Setup
```bash
# Check Ticketyboo is running
curl http://localhost:3000  # Should return HTML

# Run sample test
npx playwright test tests/example.spec.js --headed
```

**✅ Success:** Browser opens and test runs  
**❌ Issues:** See [Setup Guides](workshop/setup/) for detailed help

## 📚 Workshop Materials

### **Setup Guides** (`workshop/setup/`)
- **[Main Setup Guide](workshop/setup/README.md)** - Core installation steps
- **[Windows Setup](workshop/setup/windows-setup.md)** - Windows-specific instructions  
- **[macOS Setup](workshop/setup/macos-setup.md)** - Mac installation guide
- **[Linux Setup](workshop/setup/linux-setup.md)** - Linux distribution guides
- **[Troubleshooting](workshop/setup/troubleshooting.md)** - Common issues & solutions
- **[Pre-Workshop Checklist](workshop/setup/pre-workshop-checklist.md)** - Verify readiness

### **Workshop Content**
- **[Test Plan](workshop/ticketyboo-test-plan.md)** - Comprehensive testing strategy
- **[Exercise Files](workshop/exercises/)** - Step-by-step learning modules
- **[Workshop Summary](workshop/exercises/workshop-summary.md)** - Overview and options

## 🎓 Learning Paths

### **90-Minute Workshop** (Recommended for beginners)
Exercises 1-5: Core concepts and practical skills
- Application exploration and test planning
- Writing and running basic Playwright tests  
- Form validation and boundary testing

### **Half-Day Workshop** (3 hours)
Exercises 1-6: Add code organization patterns
- All core concepts plus Page Object Pattern
- More discussion and troubleshooting time

### **Full-Day Workshop** (6 hours)  
All exercises: Complete testing curriculum
- Advanced patterns and complex scenarios
- Custom project work and Q&A

## 🛠️ Technology Stack

### **Playwright Framework**
- **Official Documentation:** [playwright.dev](https://playwright.dev)
- **GitHub Repository:** [microsoft/playwright](https://github.com/microsoft/playwright)
- **API Reference:** [Playwright API](https://playwright.dev/docs/api/class-playwright)

### **Node.js Runtime**
- **Official Website:** [nodejs.org](https://nodejs.org)
- **Documentation:** [Node.js Docs](https://nodejs.org/docs)
- **Package Manager:** npm (included with Node.js)

### **Testing Concepts**
- **Test Automation:** Systematic approach to quality assurance
- **Page Object Pattern:** Maintainable test code organization
- **Data-Driven Testing:** Parameterized test execution
- **Boundary Testing:** Edge case and error condition validation

## 📋 Daily Commands

### **Application Management**
```bash
# Start Ticketyboo (Terminal 1 - keep running)
cd ticketyboo
npm start

# Playwright commands (Terminal 2)  
cd playwright-test-odyssey
npx playwright test                    # Run all tests
npx playwright test --headed           # Show browser
npx playwright test example.spec.js    # Run specific test
npx playwright codegen localhost:3000  # Generate test code
```

### **Development**
```bash
# Run tests during development
npx playwright test --ui              # Interactive mode
npx playwright test --debug           # Debug mode
npx playwright show-report            # View results
```

## 🎯 Workshop Outcomes

After completing this workshop, participants will:

### **Core Skills**
- ✅ Systematically explore and analyze web applications
- ✅ Write clear, maintainable test cases  
- ✅ Create and execute Playwright automated tests
- ✅ Test form validation and error handling
- ✅ Apply boundary testing techniques

### **Advanced Skills** (Extended workshops)
- ✅ Organize test code using industry patterns
- ✅ Implement data-driven testing strategies  
- ✅ Handle complex user workflows and edge cases
- ✅ Debug and troubleshoot test failures

### **Real-World Application**
- ✅ Apply testing concepts to your own applications
- ✅ Integrate testing into development workflows
- ✅ Make informed decisions about test automation
- ✅ Communicate testing value to stakeholders

## 🌍 Accessibility & Inclusion

This workshop is designed for:
- **All skill levels** - No prior testing experience required
- **International audiences** - Clear, accessible language
- **Multiple learning styles** - Hands-on, visual, and conceptual approaches
- **Different time constraints** - Modular exercises adapt to available time

## 🤝 Support & Community

### **During the Workshop**
- Ask questions early and often
- Pair programming is encouraged
- Use the troubleshooting guides
- Focus on learning over perfect setup

### **After the Workshop**  
- **Practice:** Apply concepts to your own projects
- **Community:** Join Playwright community forums
- **Documentation:** Bookmark key resources
- **Advanced Learning:** Explore CI/CD integration and performance testing

### **Resources & Links**
- **Playwright Community:** [Discord](https://discord.gg/playwright-807756831384403968) | [GitHub Discussions](https://github.com/microsoft/playwright/discussions)
- **Testing Resources:** [TestingLibrary](https://testing-library.com/) | [Test Automation University](https://testautomationu.applitools.com/)
- **Web Standards:** [MDN Web Docs](https://developer.mozilla.org/) | [W3C](https://www.w3.org/)

## 📄 License & Attribution

This workshop is designed for educational purposes. The Ticketyboo application and all workshop materials are provided under open source licenses.

**Workshop Created By:** [Your Name/Organization]  
**Playwright:** © Microsoft Corporation  
**Node.js:** © OpenJS Foundation

---

**Ready to start your testing journey?** Begin with the [Setup Guide](workshop/setup/README.md) or jump into [Exercise 1](workshop/exercises/exercise-01-application-discovery.md)!

**Questions?** Check the [Troubleshooting Guide](workshop/setup/troubleshooting.md) or [Workshop Summary](workshop/exercises/workshop-summary.md)
