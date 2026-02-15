# Workshop Setup Guide

This guide will help you set up both the **Ticketyboo application** (the system under test) and the **Playwright testing framework** for the workshop.

## Prerequisites

Before starting, ensure you have the following installed:

### Required Software
- **Node.js** (version 16 or higher)
  - Download from: https://nodejs.org
  - Verify installation: `node --version`
- **Git** (for cloning repositories)
  - Download from: https://git-scm.com
  - Verify installation: `git --version`
- **Code Editor** (recommended: VS Code)
  - Download from: https://code.visualstudio.com

### System Requirements
- **Operating System:** Windows 10+, macOS 10.15+, or Linux
- **RAM:** Minimum 4GB (8GB recommended)
- **Disk Space:** At least 1GB free space
- **Internet Connection:** Required for installation

## Step 1: Install the Ticketyboo Application

The Ticketyboo application is the event booking system we'll be testing.

### 1.1 Clone the Repository
```bash
# Navigate to your preferred directory
cd ~/Desktop  # or wherever you want to work

# Clone the Ticketyboo application
git clone https://github.com/danbilling-pbs/ticketyboo.git

# Navigate into the project
cd ticketyboo
```

### 1.2 Install Dependencies
```bash
# Install all required packages
npm install
```

### 1.3 Start the Application
```bash
# Start the development server
npm start
```

**Expected Output:**
```
Local:   http://localhost:3000
Network: http://192.168.x.x:3000
```

### 1.4 Verify Installation
1. Open your browser
2. Navigate to `http://localhost:3000`
3. You should see the Ticketyboo homepage with event listings

**✅ Success:** You can see events for concerts, films, and comedy shows
**❌ Problem:** See troubleshooting section below

## Step 2: Install the Playwright Testing Framework

Now set up the testing framework in a separate directory.

### 2.1 Clone the Testing Repository
```bash
# Open a new terminal/command prompt (keep Ticketyboo running)
cd ~/Desktop  # or your preferred directory

# Clone the testing repository  
git clone https://github.com/danbilling-pbs/playwright-test-odyssey.git

# Navigate into the project
cd playwright-test-odyssey
```

### 2.2 Install Dependencies
```bash
# Install all required packages
npm install

# Install Playwright browsers (this may take a few minutes)
npx playwright install
```

### 2.3 Verify Installation
```bash
# Run a simple test to verify everything works
npx playwright test --version
```

**Expected Output:**
```
Version 1.x.x-xxxx
```

### 2.4 Run Sample Tests
```bash
# Run the example test (optional)
npx playwright test tests/example.spec.js --headed
```

**✅ Success:** A browser opens and runs a simple test
**❌ Problem:** See troubleshooting section below

## Step 3: Verify Workshop Setup

### 3.1 Check Both Applications Are Running

**Terminal 1 (Ticketyboo):**
- Should show: `webpack compiled with 0 errors`
- Application running at: `http://localhost:3000`

**Terminal 2 (Playwright Tests):**
- Ready to run commands like: `npx playwright test`

### 3.2 Test the Connection
Run this quick test to ensure Playwright can access Ticketyboo:

```bash
# In the playwright-test-odyssey directory
npx playwright test tests/seed.spec.ts --headed
```

**✅ Success:** Browser opens and navigates to localhost:3000
**❌ Problem:** Check both applications are running

## Project Structure Overview

After setup, you should have this structure:

```
~/Desktop/
├── ticketyboo/                    # The application under test
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
└── playwright-test-odyssey/       # The testing framework
    ├── tests/
    ├── workshop/
    ├── playwright.config.js
    └── package.json
```

## Daily Workshop Routine

### Starting Your Day
1. **Start Ticketyboo:**
   ```bash
   cd ~/Desktop/ticketyboo
   npm start
   ```

2. **Open Testing Project:**
   ```bash
   cd ~/Desktop/playwright-test-odyssey
   # Ready for workshop exercises
   ```

3. **Verify Connection:**
   - Check `http://localhost:3000` loads in browser
   - Run: `npx playwright test tests/example.spec.js`

### During the Workshop
- **Ticketyboo** runs continuously (don't close this terminal)
- **Playwright commands** run from the testing directory
- **Browser testing** will open/close automatically

## Quick Reference Commands

### Ticketyboo (Application)
```bash
# Start the application
npm start

# Stop the application
Ctrl + C (or Cmd + C on Mac)
```

### Playwright (Testing)
```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/example.spec.js

# Run tests with browser visible
npx playwright test --headed

# Generate test code automatically
npx playwright codegen localhost:3000
```

## Workshop Files Location

- **Exercises:** `workshop/exercises/`
- **Test Plan:** `workshop/ticketyboo-test-plan.md`
- **Your Tests:** Create in `tests/` directory

## Additional Setup Resources

### Platform-Specific Guides
- **[Windows Setup Guide](windows-setup.md)** - Detailed Windows 10/11 instructions
- **[macOS Setup Guide](macos-setup.md)** - Complete macOS installation guide  
- **[Linux Setup Guide](linux-setup.md)** - Instructions for Ubuntu, CentOS, Fedora, etc.

### Support Documentation
- **[Troubleshooting Guide](troubleshooting.md)** - Common issues and solutions
- **[Pre-Workshop Checklist](pre-workshop-checklist.md)** - Verify your setup works

## Need Help During the Workshop?

### Quick Checks
1. ✅ Is Ticketyboo running at localhost:3000?
2. ✅ Are you in the correct directory for commands?
3. ✅ Did you install all dependencies?

### Common Commands
- **Restart Ticketyboo:** `Ctrl+C` then `npm start`
- **Update Playwright:** `npx playwright install`
- **Check Node version:** `node --version`

### Get Support
- Ask your facilitator
- Check the [troubleshooting guide](troubleshooting.md)
- Use the [pre-workshop checklist](pre-workshop-checklist.md)
- Pair up with another participant