# Python Scripts Guide

This project includes helpful Python scripts to manage npm dependencies and keep your project updated. All scripts use only Python's standard library, so no additional Python packages are needed.

## Table of Contents

1. [Installation Scripts](#installation-scripts)
2. [Upgrade Scripts](#upgrade-scripts)
3. [Checking Scripts](#checking-scripts)
4. [Running Scripts](#running-scripts)
5. [Troubleshooting](#troubleshooting)

## Installation Scripts

### `install_deps.py`

**Purpose**: Install all npm dependencies for the project.

**When to use**:
- First time setting up the project
- After cloning the repository
- When dependencies are missing
- After significant package.json changes

**Usage**:
```bash
python scripts/install_deps.py
```

**What it does**:
1. Checks if Node.js and npm are installed
2. Detects if `node_modules` already exists
3. Optionally cleans up old installations
4. Runs `npm install` to fetch all dependencies
5. Shows next steps

**Example output**:
```
============================================================
NPM Dependency Installation Script
============================================================

✅ npm is installed

⚠️ node_modules directory already exists

❓ Reinstall dependencies? (yes/no): yes

🧹 Cleaning up existing node_modules...
🚀 Installing npm dependencies...
📁 Working directory: /home/agile/git-repo/agileplaya.com

📦 Running npm install...

added 250 packages in 15s
✅ Dependencies installed successfully!

💡 Next steps:
   - Run 'npm run dev' to start the development server
   - Run 'npm run build' to build for production
```

### Other Installation Methods

If you prefer not to use Python:

```bash
# Direct npm install
npm install

# Using npm ci (for CI/CD environments)
npm ci
```

## Upgrade Scripts

### `upgrade_packages.py`

**Purpose**: Upgrade all npm packages to their latest versions.

**When to use**:
- Regularly (monthly or quarterly) to get latest features
- When you need performance improvements
- When security updates are available
- Before major deployments

**Usage**:
```bash
python scripts/upgrade_packages.py
```

**What it does**:
1. Shows current project information
2. Lists dependency counts
3. Asks for confirmation
4. Runs `npm update` to upgrade packages
5. Optionally runs `npm audit fix` for security fixes
6. Shows summary and tips

**Example output**:
```
============================================================
NPM Package Upgrade Script
============================================================

Project: agileplaya-portfolio
Current version: 1.0.0

Dependencies: 7
Dev Dependencies: 11

❓ Continue with package upgrade? (yes/no): yes

🚀 Starting npm package upgrade...
📁 Working directory: /home/agile/git-repo/agileplaya.com

📦 Upgrading packages...
up to date, audited 18 packages in 2s

7 packages looked for updates and none had updates available

✅ Package upgrade completed successfully!

🔒 Running npm audit fix...
up to date, audited 18 packages in 1s
found 0 vulnerabilities
✅ Security audit completed!

📋 Updated package.json
💡 Tip: Review the changes in package.json and test your application
```

### Important Notes

- **Test after upgrading**: Always run `npm run build` and test locally
- **Review changes**: Check what packages were updated
- **Git commit**: Commit the updated package-lock.json
- **Breaking changes**: Some major version updates might require code changes

### Manual Upgrade Steps

If you prefer a more controlled approach:

```bash
# Update to latest versions (respects semver ranges)
npm update

# Try to upgrade a specific package
npm install package-name@latest

# Use npm-check-updates tool for more control
npm install -g npm-check-updates
ncu --upgrade
npm install
```

## Checking Scripts

### `check_outdated.py`

**Purpose**: Check for outdated packages and security vulnerabilities.

**When to use**:
- Before upgrading packages
- Regularly (weekly) to stay aware of updates
- When debugging issues
- Before deploying to production

**Usage**:
```bash
python scripts/check_outdated.py
```

**What it does**:
1. Lists all outdated packages with their versions
2. Shows package types (dependencies vs devDependencies)
3. Runs security audit
4. Reports vulnerabilities
5. Suggests fixes

**Example output**:
```
============================================================
NPM Package Status Check
============================================================

🔍 Checking for outdated packages...
📁 Working directory: /home/agile/git-repo/agileplaya.com
============================================================

✅ All packages are up to date!

============================================================
🔒 Checking for security vulnerabilities...

up to date, audited 18 packages in 1s
found 0 vulnerabilities

✅ No security vulnerabilities found!
```

### Understanding the Output

When packages are outdated, you'll see:

```
Package                Current        Latest         Type
----------------------------------------------------------------------
next                  13.4.0         14.0.0         dependencies
tailwindcss           3.3.0          3.4.0          devDependencies
typescript            5.1.6          5.3.3          devDependencies
```

- **Package**: Name of the npm package
- **Current**: Version you have installed
- **Latest**: Newest available version
- **Type**: Whether it's a dependency or devDependency

## Running Scripts

### Prerequisites

- Python 3.7 or higher
- npm and Node.js installed
- Bash/PowerShell/Terminal access

### Quick Start

1. **Check Python installation**:
   ```bash
   python --version
   python3 --version
   ```

2. **Make scripts executable** (Linux/macOS):
   ```bash
   chmod +x scripts/*.py
   ```

3. **Run any script**:
   ```bash
   python scripts/script_name.py
   ```

### On Different Operating Systems

#### macOS/Linux
```bash
# Using Python 3
python3 scripts/install_deps.py

# Or with python (if aliased to python3)
python scripts/install_deps.py

# Make executable and run
chmod +x scripts/install_deps.py
./scripts/install_deps.py
```

#### Windows
```bash
# Using Python
python scripts\install_deps.py

# Or with python3
python3 scripts\install_deps.py

# PowerShell
python .\scripts\install_deps.py
```

### Running in CI/CD

Example GitHub Actions workflow:

```yaml
name: Install Dependencies

on: [push]

jobs:
  install:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: python scripts/install_deps.py
      
      - name: Check outdated packages
        run: python scripts/check_outdated.py
```

## Automating Package Updates

### Using npm-autoupdater

For automatic updates, you can create a scheduled task:

**macOS/Linux - using cron**:
```bash
# Edit crontab
crontab -e

# Add this line to run upgrade script monthly
0 0 1 * * cd /home/agile/git-repo/agileplaya.com && /usr/bin/python3 scripts/upgrade_packages.py
```

**Windows - using Task Scheduler**:
1. Open Task Scheduler
2. Create Basic Task
3. Set trigger to Monthly
4. Action: Start a program
5. Program: `python`
6. Arguments: `scripts/upgrade_packages.py`
7. Start in: Your project directory

### Using GitHub Actions

Create `.github/workflows/upgrade-deps.yml`:

```yaml
name: Weekly Dependency Update

on:
  schedule:
    # Run every Monday at 9 AM
    - cron: '0 9 * * 1'

jobs:
  upgrade:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Check for updates
        run: npm outdated
      
      - name: Update packages
        run: npm update
      
      - name: Commit and push
        run: |
          git config user.name "Dependabot"
          git config user.email "bot@example.com"
          git add package*.json
          git commit -m "chore: upgrade dependencies"
          git push
```

## Troubleshooting

### Issue: "python: command not found"

**Solution**: Use `python3` instead:
```bash
python3 scripts/install_deps.py
```

Or create an alias:
```bash
alias python=python3
```

### Issue: "npm: command not found"

**Solution**: Check Node.js installation:
```bash
node --version
npm --version
```

Install from [nodejs.org](https://nodejs.org/) if needed.

### Issue: "pip: command not found"

**Note**: These scripts don't need pip. They only use Python standard library.

### Issue: Permission denied (Linux/macOS)

**Solution**: Make script executable:
```bash
chmod +x scripts/install_deps.py
./scripts/install_deps.py
```

### Issue: Script output is truncated

**Solution**: Redirect to file:
```bash
python scripts/check_outdated.py > outdated_packages.txt
```

### Issue: npm install/update is slow

**Solutions**:
```bash
# Use npm ci instead
npm ci

# Clear npm cache
npm cache clean --force

# Update npm itself
npm install -g npm@latest

# Use faster registry
npm config set registry https://registry.npmmirror.com
```

### Issue: Security vulnerabilities won't fix

**Solutions**:
```bash
# Try audit fix
npm audit fix

# Fix with force (may have breaking changes)
npm audit fix --force

# Fix specific vulnerability
npm audit fix --include=dev

# Update specific package
npm install package-name@latest
```

## Best Practices

1. **Regular Updates**: Run `check_outdated.py` weekly
2. **Test Before Upgrading**: Always test locally after upgrades
3. **Commit Often**: Commit package-lock.json changes
4. **Review Changes**: Read release notes for significant updates
5. **Backup First**: Consider git stash before major upgrades
6. **Read Changelogs**: Check if breaking changes affect your code
7. **Update gradually**: Don't upgrade everything at once to major versions

## Environment Setup Script

For first-time setup, run these in order:

```bash
# 1. Install dependencies
python scripts/install_deps.py

# 2. Check for any issues
python scripts/check_outdated.py

# 3. Start development
npm run dev
```

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [Python for System Administration](https://www.python.org/)
- [Semantic Versioning](https://semver.org/)

---

**Last Updated**: February 2024
