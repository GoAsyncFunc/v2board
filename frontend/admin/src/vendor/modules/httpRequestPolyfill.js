"use strict";

const ClientRequest = require("./clientRequestRuntime.js");
const IncomingMessage = require("./incomingMessageRuntime.js").IncomingMessage;
const copyOwnProperties = require("./copyOwnProperties.js");
const statusCodes = require("./httpStatusCodes.js");
const url = require("./urlRuntime.js");
const globalObject = require("./globalObjectLegacy.js");

function request(options, callback) {
  options = typeof options === "string" ? url.parse(options) : copyOwnProperties(options);

  const defaultProtocol = globalObject.location.protocol.search(/^https?:$/) === -1 ? "http:" : "";
  const protocol = options.protocol || defaultProtocol;
  let hostname = options.hostname || options.host;
  const port = options.port;
  const path = options.path || "/";

  if (hostname && hostname.indexOf(":") !== -1) hostname = "[" + hostname + "]";
  options.url = (hostname ? protocol + "//" + hostname : "") +
    (port ? ":" + port : "") + path;
  options.method = (options.method || "GET").toUpperCase();
  options.headers = options.headers || {};

  const clientRequest = new ClientRequest(options);
  if (callback) clientRequest.on("response", callback);
  return clientRequest;
}

function get(options, callback) {
  const clientRequest = request(options, callback);
  clientRequest.end();
  return clientRequest;
}

function Agent() {}
Agent.defaultMaxSockets = 4;

exports.request = request;
exports.get = get;
exports.ClientRequest = ClientRequest;
exports.IncomingMessage = IncomingMessage;
exports.Agent = Agent;
exports.globalAgent = new Agent();
exports.STATUS_CODES = statusCodes;
exports.METHODS = [
  "CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK",
  "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY",
  "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT",
  "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"
];
