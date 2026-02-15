# Pre-Workshop Setup Checklist

Use this checklist to verify your setup is ready for the workshop. Complete all steps before the workshop day.

## ✅ Basic Installation Check

### System Requirements
- [ ] **Operating System:** Windows 10+, macOS 10.15+, or Linux
- [ ] **RAM:** At least 4GB available (8GB recommended)
- [ ] **Disk Space:** At least 1GB free
- [ ] **Internet:** Stable connection for downloads

### Required Software
- [ ] **Node.js** installed (version 16 or higher)
  ```bash
  node --version
  # Should show: v16.x.x or higher
  ```

- [ ] **npm** available (comes with Node.js)
  ```bash
  npm --version
  # Should show: 8.x.x or similar
  ```

- [ ] **Git** installed (any recent version)
  ```bash
  git --version
  # Should show: git version 2.x.x
  ```

## ✅ Workshop Projects Setup

### Directory Structure
- [ ] **Workshop folder created** at `~/Desktop/playwright-workshop` (or similar)
- [ ] **Ticketyboo** cloned and working
- [ ] **Playwright tests** cloned and configured

### Ticketyboo Application
- [ ] **Repository cloned** from https://github.com/danbilling-pbs/ticketyboo
- [ ] **Dependencies installed** (`npm install` completed successfully)
- [ ] **Application starts** without errors (`npm start`)
- [ ] **Accessible in browser** at http://localhost:3000
- [ ] **Event data visible** (concerts, films, comedy shows displayed)

### Playwright Testing Framework
- [ ] **Repository cloned** from https://github.com/danbilling-pbs/playwright-test-odyssey
- [ ] **Dependencies installed** (`npm install` completed)
- [ ] **Playwright browsers installed** (`npx playwright install`)
- [ ] **Can run tests** (`npx playwright test` executes)

## ✅ Functional Testing

### Application Functionality
Test the Ticketyboo application manually:

- [ ] **Homepage loads** correctly at localhost:3000
- [ ] **Event filtering works:**
  - [ ] Click "Concerts" → Shows only concerts
  - [ ] Click "Films" → Shows only films
  - [ ] Click "Comedy" → Shows only comedy
  - [ ] Click "All Events" → Shows all events
- [ ] **Event details open:** Click any event → Modal opens
- [ ] **Booking form visible:** All fields present (name, email, payment)
- [ ] **Modal closes:** Click × or outside → Modal closes

### Playwright Testing
Test the automation framework:

- [ ] **Basic test runs:**
  ```bash
  npx playwright test tests/example.spec.js
  # Should pass without errors
  ```

- [ ] **Headed mode works:** 
  ```bash
  npx playwright test tests/example.spec.js --headed
  # Browser should open and show test execution
  ```

- [ ] **Test generation works:**
  ```bash
  npx playwright codegen localhost:3000
  # Browser should open with recording tools
  ```

## ✅ Code Editor Setup (Recommended)

### VS Code (If Using)
- [ ] **VS Code installed** and can open files
- [ ] **Playwright extension installed:**
  - Open VS Code
  - Go to Extensions (Ctrl+Shift+X)
  - Search "Playwright Test for VS Code"
  - Install the extension
- [ ] **Can open workshop folders:**
  - File → Open Folder → Select `playwright-test-odyssey`
  - Files visible in sidebar

### Test File Creation
- [ ] **Can create new files** in the `tests/` directory
- [ ] **Syntax highlighting works** for JavaScript/TypeScript files
- [ ] **Files save correctly**

## ✅ Network and Security

### Port Access
- [ ] **Port 3000 accessible:** No firewall blocking localhost:3000
- [ ] **No conflicting applications:** Nothing else using port 3000
- [ ] **Browser can connect:** Chrome/Firefox/Safari can load the site

### Corporate Network (If Applicable)
- [ ] **Proxy configured** for npm if behind corporate firewall:
  ```bash
  npm config get proxy
  npm config get https-proxy
  ```
- [ ] **Downloads work:** Can install packages without errors
- [ ] **Git access:** Can clone repositories

## ✅ Workshop Day Preparation

### Files and Folders
- [ ] **Know your file locations:**
  - Ticketyboo: `~/Desktop/playwright-workshop/ticketyboo`
  - Tests: `~/Desktop/playwright-workshop/playwright-test-odyssey`
- [ ] **Bookmarks set:**
  - Ticketyboo: http://localhost:3000
  - GitHub repos bookmarked for reference

### Command Reference
- [ ] **Know how to open terminal/command prompt**
- [ ] **Can navigate between directories**
- [ ] **Familiar with basic commands:**
  - `cd` (change directory)
  - `ls` or `dir` (list files)  
  - `npm start` (start applications)
  - `npx playwright test` (run tests)

## ✅ Final Verification Test

### Complete Workflow Test
Perform this end-to-end test 24 hours before the workshop:

1. **Start Applications:**
   ```bash
   # Terminal 1: Start Ticketyboo
   cd ~/Desktop/playwright-workshop/ticketyboo
   npm start
   
   # Terminal 2: Prepare testing
   cd ~/Desktop/playwright-workshop/playwright-test-odyssey
   ```

2. **Manual Test:**
   - Open http://localhost:3000 in browser
   - Filter events by category
   - Open and close an event modal
   - Verify all functionality works

3. **Automated Test:**
   ```bash
   # In the playwright directory
   npx playwright test tests/example.spec.js --headed
   ```

4. **Workshop Readiness:**
   - [ ] Both applications run simultaneously
   - [ ] No error messages in terminals
   - [ ] Tests pass consistently
   - [ ] Can start/stop applications easily

## 🆘 If Something Doesn't Work

### Before the Workshop
- **24+ hours before:** Complete this checklist
- **Issues found:** Check [Troubleshooting Guide](troubleshooting.md)
- **Still stuck:** Contact workshop facilitator
- **Last resort:** Arrange to pair with another participant

### Quick Diagnostic Commands
```bash
# Check versions
node --version && npm --version && git --version

# Check applications
curl http://localhost:3000              # Should return HTML
ps aux | grep node                      # Should show running Node processes

# Check Playwright
npx playwright --version               # Should show version
ls ~/.cache/ms-playwright/             # Should show browser downloads
```

### Emergency Contacts
- **Workshop facilitator:** [Contact details to be provided]
- **Technical support:** [If available]
- **Peer support:** Find a workshop buddy for mutual help

## 📋 Workshop Day Checklist

### Before You Leave Home
- [ ] **Laptop charged** and power cable packed
- [ ] **Setup verified** within last 24 hours
- [ ] **Internet backup** (mobile hotspot if needed)
- [ ] **Contact details** for facilitator/support

### At the Venue
- [ ] **Connect to wifi** and test internet
- [ ] **Start applications** and verify connectivity
- [ ] **Test both terminals** can run commands
- [ ] **Ask for help early** if issues arise

### Workshop Mindset
- [ ] **Focus on learning** not perfect setup
- [ ] **Pair programming** is encouraged
- [ ] **Questions welcome** - others probably have the same ones
- [ ] **Enjoy the process** - testing can be fun!

## 💡 Pro Tips for Success

### Organization
- Keep file paths simple and consistent
- Use descriptive names for test files
- Take notes as you learn concepts

### Troubleshooting
- Read error messages carefully
- Try simple solutions first (restart, refresh)
- Ask for help when stuck for more than 5 minutes

### Learning
- Practice the exercises multiple times
- Experiment with your own test ideas
- Connect concepts to your daily work

---

**Ready for the workshop?** If you can check all the boxes above, you're prepared! If not, review the appropriate setup guide for your platform or check the troubleshooting documentation.

**Good luck and enjoy the workshop! 🎭🧪**