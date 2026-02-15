#!/usr/bin/env python3
"""
Check for outdated npm packages and security vulnerabilities.
This script lists all packages that have newer versions available.
"""

import subprocess
import sys
import json
import os
from pathlib import Path
from typing import Optional


def get_project_root() -> Path:
    """Get the root directory of the project."""
    return Path(__file__).parent.parent


def check_outdated_packages() -> None:
    """Check for outdated npm packages."""
    root = get_project_root()
    os.chdir(root)
    
    print("🔍 Checking for outdated packages...")
    print(f"📁 Working directory: {root}")
    print("=" * 60)
    
    try:
        # Check for outdated packages
        result = subprocess.run(
            ["npm", "outdated", "--json"],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0 or result.stdout:
            try:
                outdated = json.loads(result.stdout)
                if not outdated:
                    print("\n✅ All packages are up to date!")
                else:
                    print(f"\n📦 Found {len(outdated)} outdated package(s):\n")
                    
                    print(f"{'Package':<25} {'Current':<15} {'Latest':<15} {'Type':<15}")
                    print("-" * 70)
                    
                    for package, info in sorted(outdated.items()):
                        current = info.get("current", "unknown")
                        latest = info.get("latest", "unknown")
                        pkg_type = info.get("type", "unknown")
                        print(f"{package:<25} {current:<15} {latest:<15} {pkg_type:<15}")
                    
                    print("\n💡 To upgrade these packages, run:")
                    print("   python scripts/upgrade_packages.py")
            except json.JSONDecodeError:
                print("⚠️ Failed to parse npm outdated output")
                print(result.stdout)
        else:
            print(result.stdout)
    
    except subprocess.CalledProcessError as e:
        print(f"❌ Error checking for outdated packages: {e}")
        sys.exit(1)


def check_security_vulnerabilities() -> None:
    """Check for security vulnerabilities."""
    print("\n" + "=" * 60)
    print("🔒 Checking for security vulnerabilities...")
    
    try:
        result = subprocess.run(
            ["npm", "audit"],
            capture_output=True,
            text=True
        )
        
        print(result.stdout)
        
        if result.returncode != 0:
            print("\n⚠️ Security vulnerabilities found!")
            print("💡 To fix automatically, run:")
            print("   npm audit fix")
        else:
            print("\n✅ No security vulnerabilities found!")
    
    except subprocess.CalledProcessError as e:
        print(f"❌ Error during security audit: {e}")


def main() -> None:
    """Main entry point."""
    print("=" * 60)
    print("NPM Package Status Check")
    print("=" * 60)
    
    check_outdated_packages()
    check_security_vulnerabilities()


if __name__ == "__main__":
    main()
