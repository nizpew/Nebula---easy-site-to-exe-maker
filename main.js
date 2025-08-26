const { app, BrowserWindow, Tray, Menu, nativeImage, session, shell } = require("electron");
const path = require("path");

let tray = null;
let mainWindow = null;

// ----------------------
// Fixes para Linux/Windows/macOS
// ----------------------
app.commandLine.appendSwitch("disable-dev-shm-usage"); 
app.commandLine.appendSwitch("no-sandbox");           
app.commandLine.appendSwitch("ozone-platform-hint", "auto"); 
app.commandLine.appendSwitch("enable-features", "WaylandWindowDecorations");

// ----------------------
// Função para criar a janela
// ----------------------
function createWindow() {
  let iconPath = path.join(__dirname, "build/icons/icon.png"); // Linux
  if (process.platform === "win32") iconPath = path.join(__dirname, "build/icons/icon.ico");
  if (process.platform === "darwin") iconPath = path.join(__dirname, "build/icons/icon.icns");

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false,
    roundedCorners: true,
    icon: iconPath,
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("https://nekorecomender.lovable.app/");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // ----------------------
  // AdBlock nativo
  // ----------------------
  const filter = {
    urls: [
      "*://*.doubleclick.net/*",
      "*://*.googlesyndication.com/*",
      "*://*.adservice.google.com/*",
      "*://*.ads.soundcloud.com/*"
    ]
  };

  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    callback({ cancel: true });
  });
}

// ----------------------
// Login com Google no navegador externo
// ----------------------
function loginWithGoogle() {
  const loginUrl = "https://soundcloud.com/connect";
  shell.openExternal(loginUrl);
}

// ----------------------
// App ready
// ----------------------
app.whenReady().then(() => {
  createWindow();

  // Tray
  const trayIcon = nativeImage.createFromPath(
    path.join(__dirname, "build/icons/tray.png")
  );
  trayIcon.setTemplateImage(true); // ajuda no Linux dark/light mode

  tray = new Tray(trayIcon);
  tray.setToolTip("Nebula");
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "Show Nebula", click: () => mainWindow.show() },
    { label: "Login with Google", click: loginWithGoogle },
    { label: "Quit", click: () => app.quit() }
  ]));

  if (process.platform === "linux") {
    tray.on("click", () => {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// ----------------------
// Quit
// ----------------------
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

