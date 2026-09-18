module.exports = {
  options: {
    html: true,
    xhtmlOut: true,
    breaks: false,
    langPrefix: "language-",
    linkify: false,
    typographer: false,
    quotes: "\u201c\u201d\u2018\u2019",
    highlight: null,
    maxNesting: 20
  },
  components: {
    core: {
      rules: ["normalize", "block", "inline"]
    },
    block: {
      rules: ["blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph"]
    },
    inline: {
      rules: ["autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text"],
      rules2: ["balance_pairs", "emphasis", "text_collapse"]
    }
  }
};
