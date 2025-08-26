




# How to use it.
```
git clone https://github.com/nizpew/Nebula---easy-site-to-exe-maker.git
cd Nebula---easy-site-to-exe-maker
sudo chmod +x *sh 
./*sh
```
---

### **Runtime Dependencies (`dependencies`)**

These are required for the app to run:

* `systeminformation` → For hardware monitoring (optional if part of your app).
* `jquery` → If your frontend uses jQuery.
* Any other libraries your frontend requires, like JS frameworks or helpers.

Example in `package.json`:

```json
"dependencies": {
  "systeminformation": "^5.23.0",
  "jquery": "^3.7.1"
}
```

---

### **Development Dependencies (`devDependencies`)**

These are needed for development, packaging, and distribution:

* `electron` → For creating the desktop app with Chromium.
* `electron-builder` → For building AppImage (Linux) and EXE (Windows).
* `pnpm` or `npm` → Package manager you are using.
* `imagemagick` (optional, system-wide) → To resize the app icon via `convert`.

Example in `package.json`:

```json
"devDependencies": {
  "electron": "^30.5.1",
  "electron-builder": "^24.13.3"
}
```

---

### **External Tools Required on the System**

* `convert` → From ImageMagick (for resizing icons).
* `wine` → To test or run the generated EXE on Linux.
* `chmod` → To fix Electron sandbox permissions on Linux.

---

