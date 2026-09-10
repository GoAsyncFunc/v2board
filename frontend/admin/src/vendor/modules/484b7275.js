let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = {
  options: {
    html: !1,
    xhtmlOut: !1,
    breaks: !1,
    langPrefix: "language-",
    linkify: !1,
    typographer: !1,
    quotes: "\u201c\u201d\u2018\u2019",
    highlight: null,
    maxNesting: 20
  },
  components: {
    core: {
      rules: ["normalize", "block", "inline"]
    },
    block: {
      rules: ["paragraph"]
    },
    inline: {
      rules: ["text"],
      rules2: ["balance_pairs", "text_collapse"]
    }
  }
};
