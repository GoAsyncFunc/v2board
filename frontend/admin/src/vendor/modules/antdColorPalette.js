let legacyModule = module,
  legacyExports = exports;
var interopDefault = this && this.__importDefault || function (moduleValue) {
  return moduleValue && moduleValue.__esModule ? moduleValue : {
    default: moduleValue
  };
};
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var generatePalette = interopDefault(require("./64306278.js"));
legacyExports.generate = generatePalette.default;
var presetPrimaryColors = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
};
legacyExports.presetPrimaryColors = presetPrimaryColors;
var presetPalettes = {};
legacyExports.presetPalettes = presetPalettes, Object.keys(presetPrimaryColors).forEach(function (colorName) {
  presetPalettes[colorName] = generatePalette.default(presetPrimaryColors[colorName]), presetPalettes[colorName].primary = presetPalettes[colorName][5];
});
var redPalette = presetPalettes.red;
legacyExports.red = redPalette;
var volcanoPalette = presetPalettes.volcano;
legacyExports.volcano = volcanoPalette;
var goldPalette = presetPalettes.gold;
legacyExports.gold = goldPalette;
var orangePalette = presetPalettes.orange;
legacyExports.orange = orangePalette;
var yellowPalette = presetPalettes.yellow;
legacyExports.yellow = yellowPalette;
var limePalette = presetPalettes.lime;
legacyExports.lime = limePalette;
var greenPalette = presetPalettes.green;
legacyExports.green = greenPalette;
var cyanPalette = presetPalettes.cyan;
legacyExports.cyan = cyanPalette;
var bluePalette = presetPalettes.blue;
legacyExports.blue = bluePalette;
var geekbluePalette = presetPalettes.geekblue;
legacyExports.geekblue = geekbluePalette;
var purplePalette = presetPalettes.purple;
legacyExports.purple = purplePalette;
var magentaPalette = presetPalettes.magenta;
legacyExports.magenta = magentaPalette;
var greyPalette = presetPalettes.grey;
legacyExports.grey = greyPalette;
