let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function formatUrl(urlParts) {
  var formattedUrl = "";
  return formattedUrl += urlParts.protocol || "", formattedUrl += urlParts.slashes ? "//" : "", formattedUrl += urlParts.auth ? urlParts.auth + "@" : "", urlParts.hostname && -1 !== urlParts.hostname.indexOf(":") ? formattedUrl += "[" + urlParts.hostname + "]" : formattedUrl += urlParts.hostname || "", formattedUrl += urlParts.port ? ":" + urlParts.port : "", formattedUrl += urlParts.pathname || "", formattedUrl += urlParts.search || "", formattedUrl += urlParts.hash || "", formattedUrl;
};
