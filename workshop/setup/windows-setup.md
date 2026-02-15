# Windows Installation Guide

Step-by-step instructions for setting up the workshop on Windows 10/11.

## Prerequisites Check

Before starting, check if you already have these installed:
- Press `Win + R`, type `cmd`, press Enter
- Type each command and press Enter:
  ```cmd
  node --version
  git --version
  ```

If either command fails, follow the installation steps below.

## Step 1: Install Node.js

### Option A: Direct Download (Recommended)
1. Go to https://nodejs.org
2. Click **"Download the LTS version"** (Long Term Support)
3. Download the Windows Installer (.msi file)
4. **Run the installer:**
   - Click "Next" through all steps
   - ✅ Check "Add to PATH" option
   - Complete installation
5. **Restart your computer** (important!)
6. **Verify installation:**
   - Open Command Prompt (`Win + R` → `cmd`)
   - Type: `node --version`
   - Should show: `v18.x.x` or similar

### Option B: Using Chocolatey (Advanced)
If you have Chocolatey installed:
```powershell
# Run PowerShell as Administrator
choco install nodejs
```

## Step 2: Install Git

### Download and Install
1. Go to https://git-scm.com/download/win
2. Download Git for Windows
3. **Run the installer with these settings:**
   - ✅ Use Git from the Windows Command Prompt
   - ✅ Use the OpenSSL library
   - ✅ Checkout Windows-style, commit Unix-style line endings
   - ✅ Use Windows' default console window
4. **Verify installation:**
   ```cmd
   git --version
   ```

## Step 3: Install Code Editor (Optional but Recommended)

### VS Code (Recommended)
1. Go to https://code.visualstudio.com
2. Click **"Download for Windows"**
3. Run the installer
4. **Install helpful extensions:**
   - Playwright Test for VS Code
   - JavaScript (ES6) code snippets

### Alternative Editors
- **Notepad++:** Simple and lightweight
- **Sublime Text:** Fast and powerful
- **Any text editor** will work for the workshop

## Step 4: Set Up Workshop Projects

### Create Workshop Folder
```cmd
# Open Command Prompt (Win + R → cmd)
cd %USERPROFILE%\Desktop
mkdir playwright-workshop
cd playwright-workshop
```

### Install Ticketyboo Application
```cmd
# Clone the application (the system we'll test)
git clone https://github.com/danbilling-pbs/ticketyboo.git
cd ticketyboo

# Install dependencies
npm install

# Start the application (keep this running)
npm start
```

**Expected Result:** 
- Message: "webpack compiled successfully"
- Browser opens to http://localhost:3000
- You see the Ticketyboo event booking page

### Install Playwright Testing Framework
**Open a NEW Command Prompt window** (keep Ticketyboo running):
```cmd
cd %USERPROFILE%\Desktop\playwright-workshop

# Clone the testing repository
git clone https://github.com/danbilling-pbs/playwright-test-odyssey.git
cd playwright-test-odyssey

# Install dependencies
npm install

# Install Playwright browsers (this may take 5-10 minutes)
npx playwright install
```

## Step 5: Verify Everything Works

### Test the Connection
In the Playwright directory:
```cmd
# Run a simple test
npx playwright test tests/example.spec.js --headed
```

**Expected Result:**
- A browser window opens
- Test runs automatically
- Results show in command prompt

### Workshop File Structure
You should now have:
```
%USERPROFILE%\Desktop\playwright-workshop\
├── ticketyboo\                    # The application (running)
└── playwright-test-odyssey\       # The tests (ready)
```

## Daily Workshop Routine

### Starting Your Day
1. **Start Ticketyboo:**
   ```cmd
   cd %USERPROFILE%\Desktop\playwright-workshop\ticketyboo
   npm start
   ```
   Keep this window open all day!

2. **Open Testing Project:**
   ```cmd
   # In a NEW command prompt window
   cd %USERPROFILE%\Desktop\playwright-workshop\playwright-test-odyssey
   ```
   Use this window for all testing commands.

## Common Windows Issues

### PowerShell Execution Policy
If you see execution policy errors:
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Node.js Not Found After Installation
1. Restart your computer
2. If still not working, manually add to PATH:
   - Search "Environment Variables" in Start Menu
   - Edit "Path" variable
   - Add: `C:\Program Files\nodejs`

### Antivirus/Windows Defender
Some antivirus software blocks Node.js:
- Add exceptions for Node.js and npm
- Temporarily disable real-time protection during installation

### Network/Corporate Restrictions
If downloads fail:
```cmd
# Configure npm for corporate proxies
npm config set proxy http://proxy-server:port
npm config set https-proxy http://proxy-server:port
```

## Workshop Commands Reference

### In Ticketyboo Directory
```cmd
npm start          # Start the application
# Ctrl + C         # Stop the application
```

### In Playwright Directory
```cmd
npx playwright test                    # Run all tests
npx playwright test example.spec.js    # Run specific test
npx playwright test --headed           # Show browser while testing
npx playwright codegen localhost:3000  # Generate test code
```

## Tips for Windows Users

### File Paths
- Use backslashes: `C:\Users\YourName\Desktop`
- Or forward slashes: `C:/Users/YourName/Desktop`
- Both work in most cases

### Multiple Command Prompts
- **Ticketyboo window:** Keep running all day
- **Playwright window:** For running tests
- **File Explorer:** For navigating files

### Keyboard Shortcuts
- `Ctrl + C`: Stop running programs
- `Tab`: Auto-complete file names
- `↑` arrow: Repeat last command

### Windows Terminal (Newer Windows 10/11)
If available, use Windows Terminal instead of Command Prompt:
- Better colors and formatting
- Multiple tabs in one window
- Better copy/paste support

## Need Help?

### Quick Diagnostics
```cmd
# Check versions
node --version
npm --version
git --version

# Check what's running on port 3000
netstat -ano | findstr :3000

# Check if website is accessible
curl http://localhost:3000
```

### During the Workshop
1. ✅ Check both applications are running
2. ✅ Verify you're in the correct directory
3. ✅ Try restarting Command Prompt
4. ✅ Ask your facilitator for help

### After the Workshop
- Keep both repositories for future practice
- Bookmark useful documentation links
- Try creating tests for your own applications

---

**Next:** Continue with the main [Setup Guide](README.md) or check [Troubleshooting](troubleshooting.md) for common issues.