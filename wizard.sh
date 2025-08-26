#!/bin/bash

# ==========================
# Ask user for inputs
# ==========================
read -p "Enter the path to your app icon (e.g., nebula-app-icon.png): " ICON_PATH
read -p "Enter the URL of the site you want to create a frontend for: " SITE_URL

# ==========================
# Create resized icons
# ==========================

convert "$ICON_PATH" -resize 512x512 build/icons/512.png
convert "$ICON_PATH" -resize 256x256 build/icons/256.png
convert "$ICON_PATH" -resize 128x128 build/icons/128.png
convert "$ICON_PATH" -resize 64x64  build/icons/64.png
convert "$ICON_PATH" -resize 32x32  build/icons/32.png
convert "$ICON_PATH" -resize 16x16  build/icons/16.png

cp build/icons/512.png build/icons/icon.png
convert "$ICON_PATH" -resize 32x32 build/icons/tray.png

# ==========================
# Replace URL in main.js
# ==========================
sed -i "s|mainWindow.loadURL(\".*\");|mainWindow.loadURL(\"$SITE_URL\");|" main.js

# ==========================
# Install dependencies and build
# ==========================
pnpm install  # or npm install
pnpm run dist

# Run the AppImage
dist/Nebula-1.0.0.AppImage --no-sandbox
echo 'AppImage build completed!'

# Build for Windows
pnpm run dist -- --win
wine dist/Nebula\ Setup\ 1.0.0.exe






echo "your archives are in 'dist/Nebula Setup 1.0.0.exe' "
