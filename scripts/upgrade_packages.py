#!/usr/bin/env python3
"""
Upgrade all npm packages to their latest versions.
This script will update all dependencies in package.json to the latest available versions.
"""

import subprocess
import sys
import json
import os
from pathlib import Path


def get_project_root() -> Path:
    """Get the root directory of the project."""
    return Path(__file__).parent.parent


def load_package_json(root: Path) -> dict:
    """Load and return the package.json file."""
    package_file = root / "package.json"
    if not package_file.exists():
        print(f"Error: package.json not found at {package_file}")
        sys.exit(1)
    
    with open(package_file, "r") as f:
        return json.load(f)


def upgrade_packages() -> None:
    """Upgrade all npm packages using npm update."""
    root = get_project_root()
    os.chdir(root)
    
    print("🚀 Starting npm package upgrade...")
    print(f"📁 Working directory: {root}")
    
    try:
        # Update packages
        print("\n📦 Upgrading packages...")
        subprocess.run(
            ["npm", "update"],
            check=True,
            capture_output=False
        )
        
        print("\n✅ Package upgrade completed successfully!")
        
        # Optional: Run npm audit fix to fix security vulnerabilities
        try:
            print("\n🔒 Running npm audit fix...")
            subprocess.run(
                ["npm", "audit", "fix"],
                check=False,
                capture_output=False
            )
            print("✅ Security audit completed!")
        except Exception as e:
            print(f"⚠️ Warning: Could not run npm audit: {e}")
        
        print("\n📋 Updated package.json")
        print("💡 Tip: Review the changes in package.json and test your application")
        
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Error during package upgrade: {e}")
        sys.exit(1)


def main() -> None:
    """Main entry point."""
    print("=" * 60)
    print("NPM Package Upgrade Script")
    print("=" * 60)
    
    root = get_project_root()
    package_data = load_package_json(root)
    
    print(f"\nProject: {package_data.get('name', 'Unknown')}")
    print(f"Current version: {package_data.get('version', 'Unknown')}")
    print(f"\nDependencies: {len(package_data.get('dependencies', {}))}")
    print(f"Dev Dependencies: {len(package_data.get('devDependencies', {}))}")
    
    response = input("\n❓ Continue with package upgrade? (yes/no): ").lower().strip()
    
    if response in ("yes", "y"):
        upgrade_packages()
    else:
        print("\n⏭️ Package upgrade cancelled.")
        sys.exit(0)


if __name__ == "__main__":
    main()
