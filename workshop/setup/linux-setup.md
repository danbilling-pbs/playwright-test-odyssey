# Linux Installation Guide

Step-by-step instructions for setting up the workshop on Linux distributions (Ubuntu, Debian, CentOS, Fedora, etc.).

## Prerequisites Check

Open a terminal and check existing installations:
```bash
node --version
npm --version
git --version
```

If any commands return "command not found", follow the installation steps below.

## Installation by Distribution

### Ubuntu/Debian (Most Common)

#### Update Package Manager
```bash
sudo apt update
```

#### Install Node.js
```bash
# Method 1: Using NodeSource repository (recommended)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Method 2: Using default repository (older version)
sudo apt install nodejs npm

# Method 3: Using snap
sudo snap install node --classic
```

#### Install Git
```bash
sudo apt install git
```

#### Install Required Libraries for Playwright
```bash
sudo apt-get install -y \
  libnss3-dev \
  libatk-bridge2.0-dev \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libxss1 \
  libasound2
```

### CentOS/RHEL/Fedora

#### Install Node.js
```bash
# For CentOS/RHEL 8+
sudo dnf install nodejs npm git

# For older CentOS/RHEL
sudo yum install nodejs npm git

# For Fedora
sudo dnf install nodejs npm git
```

#### Alternative: Using NodeSource
```bash
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install nodejs git
```

### Arch Linux

```bash
sudo pacman -S nodejs npm git
```

### openSUSE

```bash
sudo zypper install nodejs18 npm git
```

## Step 2: Verify Installation

```bash
# Check versions
node --version    # Should be 16.x or higher
npm --version     # Should be 8.x or higher  
git --version     # Any version is fine

# Fix npm permissions (if needed)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## Step 3: Install Code Editor (Optional)

### VS Code (Recommended)

#### Ubuntu/Debian
```bash
# Download and install
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
sudo apt update
sudo apt install code
```

#### Fedora/CentOS
```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/yum.repos.d/vscode.repo
sudo dnf install code
```

#### Alternative Editors
```bash
# Vim (lightweight)
sudo apt install vim

# Nano (simple)
sudo apt install nano

# Gedit (graphical)
sudo apt install gedit

# Sublime Text (advanced)
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt update
sudo apt install sublime-text
```

## Step 4: Set Up Workshop Projects

### Create Workshop Directory
```bash
cd ~/Desktop  # or ~/Documents if no Desktop folder
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

**Expected Output:**
- "webpack compiled successfully"
- "Local: http://localhost:3000"

### Install Playwright Testing Framework
**Open a new terminal tab/window** (keep Ticketyboo running):
```bash
cd ~/Desktop/playwright-workshop  # or ~/Documents/playwright-workshop

# Clone testing repository
git clone https://github.com/danbilling-pbs/playwright-test-odyssey.git
cd playwright-test-odyssey

# Install dependencies
npm install

# Install Playwright browsers (this takes time)
npx playwright install

# Install browser dependencies
npx playwright install-deps
```

## Step 5: Verify Workshop Setup

### Test Basic Functionality
```bash
# In the playwright-test-odyssey directory
npx playwright test tests/example.spec.js --headed
```

**Expected Result:**
- Browser opens (if you have a graphical desktop)
- Test executes and passes
- Results shown in terminal

### Check File Structure
```bash
ls ~/Desktop/playwright-workshop
# Should show: ticketyboo/ and playwright-test-odyssey/
```

## Linux-Specific Configurations

### Browser Installation Issues

If Playwright browsers don't install properly:
```bash
# Install system dependencies first
npx playwright install-deps

# Then install browsers
npx playwright install

# For Ubuntu/Debian, ensure these packages:
sudo apt-get install -y \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libdrm2 \
  libgtk-3-0 \
  libgtk-4-1 \
  libnspr4 \
  libnss3 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils
```

### Headless Mode (No GUI)

If running on a server without desktop environment:
```bash
# Run tests in headless mode (default)
npx playwright test

# Force headless if needed
npx playwright test --config=playwright.config.js
```

### Display Issues (WSL/Remote)

For Windows Subsystem for Linux (WSL):
```bash
# Install X server on Windows first (like VcXsrv)
export DISPLAY=:0

# Or run in headless mode
npx playwright test --headed false
```

### Permission Issues

Fix common permission problems:
```bash
# For npm global installs
sudo chown -R $(whoami) ~/.npm

# For Playwright cache
sudo chown -R $(whoami) ~/.cache/ms-playwright

# Alternative: Use user-level installation
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## Daily Workshop Routine

### Terminal Management
```bash
# Terminal 1: Start Ticketyboo
cd ~/Desktop/playwright-workshop/ticketyboo
npm start

# Terminal 2: Playwright commands
cd ~/Desktop/playwright-workshop/playwright-test-odyssey
# Ready for workshop exercises
```

### Useful Terminal Shortcuts
- `Ctrl + Shift + T`: New terminal tab
- `Ctrl + Shift + N`: New terminal window
- `Ctrl + C`: Stop running process
- `Ctrl + Z`: Suspend process
- `Tab`: Auto-complete

## Common Linux Issues and Solutions

### Node.js Version Too Old
```bash
# Remove old version
sudo apt remove nodejs npm

# Install from NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Missing Shared Libraries
```bash
# Check what libraries are missing
ldd $(which node)

# Install development tools
sudo apt-get install build-essential

# For CentOS/RHEL
sudo yum groupinstall "Development Tools"
```

### Firewall Blocking localhost
```bash
# Check if firewall is running
sudo ufw status

# Allow port 3000 if needed
sudo ufw allow 3000

# Or temporarily disable
sudo ufw disable
```

### Resource Limitations
```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check processes using port 3000
ss -tulpn | grep :3000
```

## Workshop Commands Reference

### Application Management
```bash
cd ~/Desktop/playwright-workshop/ticketyboo
npm start                    # Start Ticketyboo
# Ctrl + C                   # Stop application
```

### Testing Commands
```bash
cd ~/Desktop/playwright-workshop/playwright-test-odyssey
npx playwright test                    # Run all tests
npx playwright test --headed           # Show browser (if GUI available)
npx playwright test example.spec.js    # Run specific test
npx playwright codegen localhost:3000  # Generate test code
npx playwright show-report            # View test results
```

### System Diagnostics
```bash
# Check what's running
ps aux | grep node

# Network connectivity
curl http://localhost:3000

# System resources
htop  # or top

# Disk space
df -h
```

## Package Manager Specific Tips

### APT (Ubuntu/Debian)
```bash
# Update package list
sudo apt update

# Upgrade all packages
sudo apt upgrade

# Search for packages
apt search nodejs
```

### YUM/DNF (CentOS/RHEL/Fedora)
```bash
# Update packages
sudo dnf update  # or sudo yum update

# Search packages
dnf search nodejs
```

### Snap (Universal)
```bash
# Install Node.js via Snap
sudo snap install node --classic

# List installed snaps
snap list
```

## After Installation

### Verify Everything Works
```bash
# Check all components
node --version && npm --version && git --version
curl -I http://localhost:3000
npx playwright --version
```

### Performance Tips
- Close unnecessary applications during workshop
- Use lightweight desktop environment if possible
- Monitor system resources with `htop`

### Security Considerations
- Don't run workshop as root user
- Keep firewall enabled when not testing
- Use latest updates for security

---

**Next:** Return to the main [Setup Guide](README.md) or check [Troubleshooting](troubleshooting.md) for additional help.