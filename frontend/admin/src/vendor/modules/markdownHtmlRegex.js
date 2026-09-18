var attributeName = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
var unquotedAttributeValue = "[^\"'=<>`\\x00-\\x20]+";
var singleQuotedAttributeValue = "'[^']*'";
var doubleQuotedAttributeValue = '\"[^\"]*\"';
var attributeValue = "(?:" + unquotedAttributeValue + "|" + singleQuotedAttributeValue + "|" + doubleQuotedAttributeValue + ")";
var attribute = "(?:\\s+" + attributeName + "(?:\\s*=\\s*" + attributeValue + ")?)";
var openTag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
var closeTag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
var htmlComment = "\x3c!----\x3e|\x3c!--(?:-?[^>-])(?:-?[^-])*--\x3e";
var processingInstruction = "<[?][\\s\\S]*?[?]>";
var declaration = "<![A-Z]+\\s+[^>]*>";
var cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";

exports.HTML_TAG_RE = new RegExp("^(?:" + openTag + "|" + closeTag + "|" + htmlComment + "|" + processingInstruction + "|" + declaration + "|" + cdata + ")");
exports.HTML_OPEN_CLOSE_TAG_RE = new RegExp("^(?:" + openTag + "|" + closeTag + ")");
