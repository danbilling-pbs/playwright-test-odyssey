# macOS Installation Guide

Step-by-step instructions for setting up the workshop on macOS (10.15 Catalina or newer).

## Prerequisites Check

First, check what's already installed:
```bash
# Open Terminal (Cmd + Space, type "Terminal")
node --version
git --version
```

If either command returns "command not found", follow the installation steps below.

## Step 1: Install Xcode Command Line Tools

This is required for many development tools on macOS:
```bash
xcode-select --install
```

A popup will appear asking to install the command line tools. Click "Install" and wait for it to complete (may take 10-20 minutes).

## Step 2: Install Node.js

### Option A: Direct Download (Recommended)
1. Go to https://nodejs.org
2. Click **"Download the LTS version"**
3. Download the macOS Installer (.pkg file)
4. **Run the installer:**
   - Double-click the .pkg file
   - Follow the installation wizard
   - Enter your password when prompted
5. **Verify installation:**
   ```bash
   node --version
   npm --version
   ```

### Option B: Using Homebrew (If you have it)
```bash
brew install node
```

### Option C: Using Node Version Manager (Advanced)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install node
nvm use node
```

## Step 3: Install Git (Usually Pre-installed)

Git typically comes with macOS, but you can update it:

### Check Current Version
```bash
git --version
```

### Update Git (Optional)
```bash
# Using Homebrew
brew install git

# Or download from https://git-scm.com/download/mac
```

## Step 4: Install Code Editor (Optional but Recommended)

### VS Code (Recommended)
1. Go to https://code.visualstudio.com
2. Click **"Download for macOS"**
3. **Install:**
   - Open the .zip file
   - Drag VS Code to Applications folder
   - Run VS Code from Applications
4. **Install extensions:**
   - Playwright Test for VS Code
   - JavaScript (ES6) code snippets

### Alternative Editors
- **Sublime Text:** Fast and lightweight
- **Atom:** GitHub's editor (discontinued but still works)
- **Any text editor** will work

## Step 5: Set Up Workshop Projects

### Create Workshop Folder
```bash
cd ~/Desktop
mkdir playwright-workshop
cd playwright-workshop
```

### Install Ticketyboo Application
```bash
# Clone the application repository
git clone https://github.com/danbilling-pbs/ticketyboo.git
cd ticketyboo

# Install dependencies
npm install

# Start the application
npm start
```

**Expected Result:**
- Terminal shows "webpack compiled successfully"
- Browser opens to http://localhost:3000
- Ticketyboo event booking page loads

### Install Playwright Testing Framework
**Open a new Terminal tab** (`Cmd + T`) while keeping Ticketyboo running:
```bash
cd ~/Desktop/playwright-workshop

# Clone the testing repository
git clone https://github.com/danbilling-pbs/playwright-test-odyssey.git
cd playwright-test-odyssey

# Install dependencies
npm install

# Install Playwright browsers (takes 5-10 minutes)
npx playwright install
```

## Step 6: Verify Everything Works

### Test the Setup
In the Playwright directory:
```bash
# Run a simple test with visible browser
npx playwright test tests/example.spec.js --headed
```

**Expected Result:**
- Browser window opens (Chrome/Safari/Firefox)
- Test runs automatically
- Results displayed in Terminal

### File Structure Check
You should have:
```
~/Desktop/playwright-workshop/
├── ticketyboo/                    # Application (running)
└── playwright-test-odyssey/       # Tests (ready)
```

## Daily Workshop Routine

### Starting Your Day
1. **Start Ticketyboo** (Terminal Tab 1):
   ```bash
   cd ~/Desktop/playwright-workshop/ticketyboo
   npm start
   ```

2. **Prepare Testing** (Terminal Tab 2):
   ```bash
   cd ~/Desktop/playwright-workshop/playwright-test-odyssey
   # Ready for workshop commands
   ```

### Managing Terminal Tabs
- `Cmd + T`: New tab
- `Cmd + Shift + [` or `]`: Switch between tabs
- `Cmd + W`: Close current tab

## Common macOS Issues

### Permission Denied Errors
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or use npm's built-in fix
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

### Node.js Not Found After Installation
Add to your shell profile:
```bash
# For bash users (older macOS)
echo 'export PATH=/usr/local/bin:$PATH' >> ~/.bash_profile
source ~/.bash_profile

# For zsh users (macOS 10.15+)
echo 'export PATH=/usr/local/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

### Homebrew Installation (If Needed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Firewall/Security Issues
macOS might block Node.js:
- Go to System Preferences → Security & Privacy
- Allow Node.js if prompted
- Or temporarily disable firewall during setup

## Workshop Commands Reference

### Terminal Tab 1 (Ticketyboo)
```bash
npm start           # Start application
# Ctrl + C          # Stop application
```

### Terminal Tab 2 (Playwright)
```bash
npx playwright test                    # Run all tests
npx playwright test example.spec.js    # Run specific test
npx playwright test --headed           # Show browser
npx playwright codegen localhost:3000  # Generate code
```

## Useful macOS Tips

### Terminal Shortcuts
- `Cmd + +/-`: Zoom text in/out
- `Cmd + K`: Clear terminal
- `Ctrl + C`: Stop running process
- `Tab`: Auto-complete filenames

### Finding Files
```bash
# Navigate to desktop
cd ~/Desktop

# List files and folders
ls -la

# Open current folder in Finder
open .

# Open VS Code in current folder
code .
```

### Monitor System Resources
```bash
# Check running processes
top

# Check disk space
df -h

# Check what's using port 3000
lsof -i :3000
```

### Multiple Displays/Spaces
If using multiple monitors or Spaces:
- Keep Terminal on one side
- Browser on the other
- Use Mission Control (`F3`) to manage windows

## Troubleshooting Quick Fixes

### Application Won't Start
```bash
# Clear npm cache
npm cache clean --force

# Remove and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Browser Doesn't Open
```bash
# Check default browser
open http://localhost:3000

# Or specify browser
open -a "Google Chrome" http://localhost:3000
open -a Safari http://localhost:3000
```

### Port Already in Use
```bash
# Find what's using port 3000
lsof -i :3000

# Kill process if needed (replace PID with actual number)
kill -9 PID

# Or start on different port
npm start -- --port 3001
```

## After Installation

### Verify Everything
```bash
# Check versions
node --version    # Should be 16.x or higher
npm --version     # Should be 8.x or higher
git --version     # Any recent version

# Test applications
curl http://localhost:3000  # Should return HTML
```

### Optional Enhancements
- **iTerm2:** Better terminal than default
- **Oh My Zsh:** Enhanced shell experience  
- **Homebrew:** Package manager for additional tools

### Keep Projects
After the workshop:
- Keep both repositories for practice
- Try testing your own web applications
- Explore advanced Playwright features

---

**Next:** Return to the main [Setup Guide](README.md) or check [Troubleshooting](troubleshooting.md) if you encounter issues.