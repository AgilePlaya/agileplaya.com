#!/usr/bin/env python3
"""
Install all npm dependencies.
This script runs npm install to set up the project dependencies.
"""

import subprocess
import sys
import os
from pathlib import Path


def get_project_root() -> Path:
    """Get the root directory of the project."""
    return Path(__file__).parent.parent


def install_dependencies() -> None:
    """Install npm dependencies."""
    root = get_project_root()
    os.chdir(root)
    
    print("🚀 Installing npm dependencies...")
    print(f"📁 Working directory: {root}")
    print("=" * 60)
    
    try:
        # Run npm install
        print("\n📦 Running npm install...\n")
        subprocess.run(
            ["npm", "install"],
            check=True,
            capture_output=False
        )
        
        print("\n✅ Dependencies installed successfully!")
        print("\n💡 Next steps:")
        print("   - Run 'npm run dev' to start the development server")
        print("   - Run 'npm run build' to build for production")
        
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Error installing dependencies: {e}")
        sys.exit(1)


def check_node_installation() -> bool:
    """Check if Node.js and npm are installed."""
    try:
        subprocess.run(
            ["npm", "--version"],
            capture_output=True,
            check=True
        )
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def main() -> None:
    """Main entry point."""
    print("=" * 60)
    print("NPM Dependency Installation Script")
    print("=" * 60)
    
    # Check if npm is installed
    if not check_node_installation():
        print("\n❌ Error: npm is not installed or not in PATH")
        print("💡 Please install Node.js from https://nodejs.org/")
        sys.exit(1)
    
    print("\n✅ npm is installed")
    
    # Check if node_modules already exists
    root = get_project_root()
    node_modules = root / "node_modules"
    
    if node_modules.exists():
        print("\n⚠️ node_modules directory already exists")
        response = input("❓ Reinstall dependencies? (yes/no): ").lower().strip()
        
        if response not in ("yes", "y"):
            print("\n⏭️ Installation cancelled.")
            sys.exit(0)
        else:
            print("\n🧹 Cleaning up existing node_modules...")
            import shutil
            shutil.rmtree(node_modules)
            if (root / "package-lock.json").exists():
                (root / "package-lock.json").unlink()
    
    install_dependencies()


if __name__ == "__main__":
    main()
