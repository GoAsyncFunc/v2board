let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.warning = warning, legacyExports.note = note, legacyExports.resetWarned = resetWarned, legacyExports.call = callOnce, legacyExports.warningOnce = warningOnce, legacyExports.noteOnce = noteOnce, legacyExports.default = void 0;
var warnedMessages = {};
function warning(condition, message) {
  0;
}
function note(condition, message) {
  0;
}
function resetWarned() {
  warnedMessages = {};
}
function callOnce(callback, condition, message) {
  condition || warnedMessages[message] || (callback(!1, message), warnedMessages[message] = !0);
}
function warningOnce(condition, message) {
  callOnce(warning, condition, message);
}
function noteOnce(condition, message) {
  callOnce(note, condition, message);
}
var defaultWarning = warningOnce;
legacyExports.default = defaultWarning;
