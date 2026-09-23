import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

export const markdownEditorStylesheetPath = 'node_modules/react-markdown-editor-lite/lib/index.css';
export const markdownEditorStylesheetOutput = 'assets/admin/markdown-editor.css';
export const markdownEditorBrowserTargets = ['defaults', 'ie 10'];
const markdownEditorSelector = /\.rc-md-editor\b|\.rmel-[\w-]*\b|\.custom-html-style\b/;

export async function removeMarkdownEditorStyles(css, from) {
  let removedRules = 0;
  let removedFontFaces = 0;

  const result = await postcss([
    {
      postcssPlugin: 'remove-markdown-editor-styles',
      Once(root) {
        root.walkRules((rule) => {
          if (!markdownEditorSelector.test(rule.selector)) return;
          removedRules += 1;
          rule.remove();
        });

        root.walkAtRules('font-face', (fontFace) => {
          const fontFamily = fontFace.nodes?.find(
            (node) => node.type === 'decl' && node.prop === 'font-family',
          )?.value;
          if (fontFamily?.replaceAll(/["']/g, '').trim() !== 'rmel-iconfont') return;
          removedFontFaces += 1;
          fontFace.remove();
        });
      },
    },
  ]).process(css, { from, map: false });

  return { css: result.css, removedRules, removedFontFaces };
}

export async function prefixMarkdownEditorStyles(css, from) {
  const result = await postcss([
    autoprefixer({ overrideBrowserslist: markdownEditorBrowserTargets }),
  ]).process(css, { from, map: false });
  return result.css;
}
