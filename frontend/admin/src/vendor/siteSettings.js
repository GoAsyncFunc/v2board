let legacyModule = module,
  legacyExports = exports;
var r = new URL(window.location.href).origin;
window.settings.host && (r = window.settings.host), window.settings.secure_path = window.settings.secure_path.replace("/", ""), document.title = window.settings.title, legacyExports["a"] = {
  serviceHost: r + "/api/v1"
};
