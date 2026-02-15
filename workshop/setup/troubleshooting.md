# Troubleshooting Guide

This guide helps resolve common setup issues you might encounter during workshop preparation.

## Common Issues and Solutions

### Issue 1: Node.js Not Installed or Wrong Version

**Symptoms:**
- `node --version` returns "command not found"
- Version shows older than 16.x.x

**Solution:**
1. Download Node.js from https://nodejs.org
2. Install the **LTS version** (recommended)
3. Restart your terminal/command prompt
4. Verify: `node --version` should show 16.x.x or higher

**Alternative (Using Node Version Manager):**
```bash
# For macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node

# For Windows (using Chocolatey)
choco install nodejs
```

### Issue 2: Git Not Installed

**Symptoms:**
- `git --version` returns "command not found"
- Cannot clone repositories

**Solution:**
1. Download Git from https://git-scm.com
2. Install with default settings
3. Restart terminal
4. Verify: `git --version`

**Alternative (Download ZIP):**
If Git installation fails, download repositories as ZIP files:
1. Go to https://github.com/danbilling-pbs/ticketyboo
2. Click "Code" → "Download ZIP"
3. Extract to your desired folder
4. Repeat for playwright-test-odyssey repository

### Issue 3: Ticketyboo Won't Start

**Symptoms:**
- `npm start` fails with errors
- "Port 3000 is already in use"
- Module not found errors

**Solutions:**

**Port Already in Use:**
```bash
# Find what's using port 3000
netstat -ano | grep :3000
# Kill the process or use a different port
npm start -- --port 3001
```

**Dependency Issues:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Permission Errors (macOS/Linux):**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

### Issue 4: Playwright Installation Fails

**Symptoms:**
- `npx playwright install` hangs or fails
- Browser download errors
- Permission denied errors

**Solutions:**

**Network/Firewall Issues:**
```bash
# Try installing with different registry
npm config set registry https://registry.npmjs.org/
npm install
npx playwright install
```

**Permission Issues (Windows):**
- Run Command Prompt as Administrator
- Run the installation commands

**Space Issues:**
```bash
# Check available disk space
df -h  # macOS/Linux
dir    # Windows

# Clean npm cache if needed
npm cache clean --force
```

**Manual Browser Installation:**
```bash
# Install specific browsers only
npx playwright install chromium
npx playwright install firefox
```

### Issue 5: Tests Can't Connect to Ticketyboo

**Symptoms:**
- Tests fail with connection errors
- "localhost:3000 refused connection"
- Timeout errors

**Solutions:**

**Verify Ticketyboo is Running:**
1. Check browser can access `http://localhost:3000`
2. Look for "webpack compiled" message in terminal
3. No error messages in Ticketyboo terminal

**Check Playwright Configuration:**
```javascript
// In playwright.config.js
module.exports = {
  use: {
    baseURL: 'http://localhost:3000',  // Verify this matches
  },
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
};
```

**Firewall/Security Software:**
- Temporarily disable antivirus/firewall
- Allow Node.js through Windows Firewall
- Check corporate network restrictions

### Issue 6: VS Code or Editor Issues

**Symptoms:**
- Syntax highlighting doesn't work
- IntelliSense not working
- File associations incorrect

**Solutions:**

**Install VS Code Extensions:**
1. Playwright Test for VS Code
2. JavaScript (ES6) code snippets
3. GitLens (for Git integration)

**Configure File Associations:**
```json
// In VS Code settings.json
{
  "files.associations": {
    "*.spec.js": "javascript",
    "*.spec.ts": "typescript"
  }
}
```

### Issue 7: Environment-Specific Problems

**Windows-Specific:**

**PowerShell Execution Policy:**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Path Issues:**
```cmd
# Add Node.js to PATH manually
setx PATH "%PATH%;C:\Program Files\nodejs"
```

**macOS-Specific:**

**Xcode Command Line Tools:**
```bash
xcode-select --install
```

**Homebrew Installation (Alternative):**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node git
```

**Linux-Specific:**

**Ubuntu/Debian:**
```bash
# Update package manager
sudo apt update

# Install Node.js
sudo apt install nodejs npm git

# Install required libraries
sudo apt-get install libnss3-dev libatk-bridge2.0-dev libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxss1 libasound2
```

### Issue 8: Workshop Day Problems

**Slow Internet/Download Issues:**

1. **Pre-download everything:**
   ```bash
   npm install --prefer-offline
   npx playwright install
   ```

2. **USB Drive Backup:**
   - Copy `node_modules` folder to USB
   - Share between participants

**Multiple People, Same Network:**

1. **Use different ports:**
   ```bash
   npm start -- --port 3001  # for Ticketyboo
   ```

2. **Update Playwright config:**
   ```javascript
   baseURL: 'http://localhost:3001'
   ```

## Getting Help During the Workshop

### Step-by-Step Debugging

1. **Identify the Problem:**
   - What were you trying to do?
   - What error message appeared?
   - When did it last work?

2. **Check the Basics:**
   - Is Ticketyboo running? (Check localhost:3000)
   - Are you in the correct directory?
   - Did you save your files?

3. **Try Simple Solutions First:**
   - Restart the application
   - Close and reopen terminal
   - Refresh your browser

4. **Gather Information:**
   - Copy the exact error message
   - Note your operating system
   - Check Node.js version: `node --version`

### When to Ask for Help

**Ask immediately for:**
- Installation failures
- Cannot start Ticketyboo
- Playwright won't run any tests

**Try first, then ask:**
- Test failures (check your code)
- Selector issues (use codegen)
- Timing problems (add waits)

### Useful Commands for Diagnosis

```bash
# System information
node --version
npm --version
npx playwright --version

# Network check
curl http://localhost:3000  # Should return HTML

# Process check (what's running on port 3000)
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Disk space
df -h       # macOS/Linux
dir c:\     # Windows
```

## Prevention Tips

### Before the Workshop
- Test your setup 24 hours before
- Download everything with good internet
- Have a backup plan (USB drive, mobile hotspot)

### During Setup
- Follow instructions step-by-step
- Don't skip verification steps
- Ask questions early if confused

### Workshop Day
- Arrive 10 minutes early for tech check
- Bring power cables
- Have backup internet (phone hotspot)
- Work with a partner when appropriate

## Emergency Fallback Options

### If Local Setup Completely Fails

1. **Use Online IDE:**
   - GitHub Codespaces
   - Repl.it
   - CodeSandbox

2. **Pair Programming:**
   - Work with someone whose setup works
   - Share screen/keyboard

3. **Watch and Learn:**
   - Follow along with demonstrations
   - Focus on concepts rather than hands-on
   - Get setup working after the workshop

### Offline Alternatives

1. **Static Ticketyboo:**
   - HTML file of the application
   - Limited functionality but enough for learning

2. **Demo Videos:**
   - Pre-recorded test executions
   - Step-by-step walkthroughs

Remember: The goal is learning, not perfect setup. Don't let technical issues prevent you from getting value from the workshop!