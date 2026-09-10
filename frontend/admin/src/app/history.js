let legacyModule = module,
    legacyExports = exports;
const { markEsModule } = require("./moduleInterop.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/45513731.js").default({
    basename: "/",
});
((window.g_history = r), (legacyExports["default"] = r));
