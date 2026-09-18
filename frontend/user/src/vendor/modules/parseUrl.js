function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}

var protocolPattern = /^([a-z0-9.+-]+:)/i;
var portPattern = /:[0-9]*$/;
var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
var unsafeProtocolCharacters = ["<", ">", '"', "`", " ", "\r", "\n", "\t"];
var autoEscapeCharacters = ["{", "}", "|", "\\", "^", "`"].concat(unsafeProtocolCharacters);
var nonHostCharacters = ["'"].concat(autoEscapeCharacters);
var hostEndingCharacters = ["%", "/", "?", ";", "#"].concat(nonHostCharacters);
var authEndingCharacters = ["/", "?", "#"];
var hostnameMaxLength = 255;
var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
var hostnamePartStartPattern = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
var hostlessProtocols = { javascript: true, "javascript:": true };
var slashedProtocols = {
  http: true,
  https: true,
  ftp: true,
  gopher: true,
  file: true,
  "http:": true,
  "https:": true,
  "ftp:": true,
  "gopher:": true,
  "file:": true
};

function parseUrl(url, slashesDenoteHost) {
  if (url && url instanceof Url) return url;
  var parsedUrl = new Url();
  parsedUrl.parse(url, slashesDenoteHost);
  return parsedUrl;
}

Url.prototype.parse = function (url, slashesDenoteHost) {
  var index;
  var length;
  var lowerCaseProtocol;
  var characterIndex;
  var hasSlashes;
  var rest = url.trim();

  if (!slashesDenoteHost && url.split("#").length === 1) {
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) this.search = simplePath[2];
      return this;
    }
  }

  var protocol = protocolPattern.exec(rest);
  if (protocol) {
    protocol = protocol[0];
    lowerCaseProtocol = protocol.toLowerCase();
    this.protocol = protocol;
    rest = rest.substr(protocol.length);
  }

  if (slashesDenoteHost || protocol || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    hasSlashes = rest.substr(0, 2) === "//";
    if (hasSlashes && !(protocol && hostlessProtocols[protocol])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocols[protocol] && (hasSlashes || protocol && !slashedProtocols[protocol])) {
    var hostEnd = -1;
    for (index = 0; index < authEndingCharacters.length; index++) {
      characterIndex = rest.indexOf(authEndingCharacters[index]);
      if (characterIndex !== -1 && (hostEnd === -1 || characterIndex < hostEnd)) hostEnd = characterIndex;
    }

    var authIndex = hostEnd === -1 ? rest.lastIndexOf("@") : rest.lastIndexOf("@", hostEnd);
    if (authIndex !== -1) {
      this.auth = rest.slice(0, authIndex);
      rest = rest.slice(authIndex + 1);
    }

    hostEnd = -1;
    for (index = 0; index < hostEndingCharacters.length; index++) {
      characterIndex = rest.indexOf(hostEndingCharacters[index]);
      if (characterIndex !== -1 && (hostEnd === -1 || characterIndex < hostEnd)) hostEnd = characterIndex;
    }

    if (hostEnd === -1) hostEnd = rest.length;
    if (rest[hostEnd - 1] === ":") hostEnd--;

    var host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);
    this.parseHost(host);
    this.hostname = this.hostname || "";

    var isIpv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!isIpv6Hostname) {
      var hostnameParts = this.hostname.split(/\./);
      for (index = 0, length = hostnameParts.length; index < length; index++) {
        var hostnamePart = hostnameParts[index];
        if (hostnamePart && !hostnamePart.match(hostnamePartPattern)) {
          var asciiHostnamePart = "";
          for (var partIndex = 0; partIndex < hostnamePart.length; partIndex++) {
            asciiHostnamePart += hostnamePart.charCodeAt(partIndex) > 127 ? "x" : hostnamePart[partIndex];
          }

          if (!asciiHostnamePart.match(hostnamePartPattern)) {
            var validParts = hostnameParts.slice(0, index);
            var remainingParts = hostnameParts.slice(index + 1);
            var partialMatch = hostnamePart.match(hostnamePartStartPattern);
            if (partialMatch) {
              validParts.push(partialMatch[1]);
              remainingParts.unshift(partialMatch[2]);
            }
            if (remainingParts.length) rest = remainingParts.join(".") + rest;
            this.hostname = validParts.join(".");
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLength) this.hostname = "";
    if (isIpv6Hostname) this.hostname = this.hostname.substr(1, this.hostname.length - 2);
  }

  var hashIndex = rest.indexOf("#");
  if (hashIndex !== -1) {
    this.hash = rest.substr(hashIndex);
    rest = rest.slice(0, hashIndex);
  }

  var searchIndex = rest.indexOf("?");
  if (searchIndex !== -1) {
    this.search = rest.substr(searchIndex);
    rest = rest.slice(0, searchIndex);
  }

  if (rest) this.pathname = rest;
  if (slashedProtocols[lowerCaseProtocol] && this.hostname && !this.pathname) this.pathname = "";
  return this;
};

Url.prototype.parseHost = function (host) {
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ":") this.port = port.substr(1);
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

module.exports = parseUrl;
