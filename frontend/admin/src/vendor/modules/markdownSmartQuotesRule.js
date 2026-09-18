var isWhiteSpace = require("./markdownUtils.js").isWhiteSpace;
var isPunctChar = require("./markdownUtils.js").isPunctChar;
var isMdAsciiPunct = require("./markdownUtils.js").isMdAsciiPunct;

var quoteTestPattern = /['"]/;
var quotePattern = /['"]/g;
var apostrophe = "\u2019";

function replaceCharacterAt(text, index, replacement) {
  return text.substr(0, index) + replacement + text.substr(index + 1);
}

function processInlineTokens(tokens, state) {
  var quoteStack = [];

  for (var tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
    var token = tokens[tokenIndex];
    var tokenLevel = token.level;
    var stackIndex;

    for (stackIndex = quoteStack.length - 1; stackIndex >= 0; stackIndex--) {
      if (quoteStack[stackIndex].level <= tokenLevel) break;
    }
    quoteStack.length = stackIndex + 1;

    if (token.type !== "text") continue;

    var text = token.content;
    var position = 0;
    var textLength = text.length;

    scanQuotes: while (position < textLength) {
      quotePattern.lastIndex = position;
      var match = quotePattern.exec(text);
      if (!match) break;

      var canOpen = true;
      var canClose = true;
      position = match.index + 1;
      var isSingleQuote = match[0] === "'";

      var previousCharacter = 32;
      if (match.index > 0) {
        previousCharacter = text.charCodeAt(match.index - 1);
      } else {
        for (stackIndex = tokenIndex - 1; stackIndex >= 0; stackIndex--) {
          if (tokens[stackIndex].type === "softbreak" || tokens[stackIndex].type === "hardbreak") break;
          if (tokens[stackIndex].content) {
            previousCharacter = tokens[stackIndex].content.charCodeAt(tokens[stackIndex].content.length - 1);
            break;
          }
        }
      }

      var nextCharacter = 32;
      if (position < textLength) {
        nextCharacter = text.charCodeAt(position);
      } else {
        for (stackIndex = tokenIndex + 1; stackIndex < tokens.length; stackIndex++) {
          if (tokens[stackIndex].type === "softbreak" || tokens[stackIndex].type === "hardbreak") break;
          if (tokens[stackIndex].content) {
            nextCharacter = tokens[stackIndex].content.charCodeAt(0);
            break;
          }
        }
      }

      var previousIsPunctuation = isMdAsciiPunct(previousCharacter) || isPunctChar(String.fromCharCode(previousCharacter));
      var nextIsPunctuation = isMdAsciiPunct(nextCharacter) || isPunctChar(String.fromCharCode(nextCharacter));
      var previousIsWhitespace = isWhiteSpace(previousCharacter);
      var nextIsWhitespace = isWhiteSpace(nextCharacter);

      if (nextIsWhitespace) {
        canOpen = false;
      } else if (nextIsPunctuation && !previousIsWhitespace && !previousIsPunctuation) {
        canOpen = false;
      }

      if (previousIsWhitespace) {
        canClose = false;
      } else if (previousIsPunctuation && !nextIsWhitespace && !nextIsPunctuation) {
        canClose = false;
      }

      if (nextCharacter === 34 && match[0] === '"' && previousCharacter >= 48 && previousCharacter <= 57) {
        canOpen = false;
        canClose = false;
      }

      if (canOpen && canClose) {
        canOpen = previousIsPunctuation;
        canClose = nextIsPunctuation;
      }

      if (canOpen || canClose) {
        if (canClose) {
          for (stackIndex = quoteStack.length - 1; stackIndex >= 0; stackIndex--) {
            var opener = quoteStack[stackIndex];
            if (opener.level < tokenLevel) break;
            if (opener.single === isSingleQuote && opener.level === tokenLevel) {
              var openingQuote;
              var closingQuote;
              if (isSingleQuote) {
                openingQuote = state.md.options.quotes[2];
                closingQuote = state.md.options.quotes[3];
              } else {
                openingQuote = state.md.options.quotes[0];
                closingQuote = state.md.options.quotes[1];
              }

              token.content = replaceCharacterAt(token.content, match.index, closingQuote);
              tokens[opener.token].content = replaceCharacterAt(tokens[opener.token].content, opener.pos, openingQuote);
              position += closingQuote.length - 1;
              if (opener.token === tokenIndex) position += openingQuote.length - 1;
              text = token.content;
              textLength = text.length;
              quoteStack.length = stackIndex;
              continue scanQuotes;
            }
          }
        }

        if (canOpen) {
          quoteStack.push({
            token: tokenIndex,
            pos: match.index,
            single: isSingleQuote,
            level: tokenLevel
          });
        } else if (canClose && isSingleQuote) {
          token.content = replaceCharacterAt(token.content, match.index, apostrophe);
        }
      } else if (isSingleQuote) {
        token.content = replaceCharacterAt(token.content, match.index, apostrophe);
      }
    }
  }
}

module.exports = function markdownSmartQuotesRule(state) {
  if (!state.md.options.typographer) return;

  for (var index = state.tokens.length - 1; index >= 0; index--) {
    var token = state.tokens[index];
    if (token.type === "inline" && quoteTestPattern.test(token.content)) {
      processInlineTokens(token.children, state);
    }
  }
};
