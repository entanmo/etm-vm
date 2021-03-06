"use strict";
var _setImmediate2 = require("babel-runtime/core-js/set-immediate"),
_setImmediate3 = _interopRequireDefault(_setImmediate2);
function _interopRequireDefault(r) {
    return r && r.__esModule ? r: {
    default:
        r
    }
}
var EventEmitter = require("events").EventEmitter,
util = require("util"),
fs = require("fs"),
path = require("path"),
querystring = require("querystring"),
Sandbox = require("./sandbox");
function SandboxWrapper(r, e, t, i, a, n) {
    if (EventEmitter.call(this), "string" != typeof r || null == r) throw new Error("First argument should be a path to file to launch in vm");
    if ("string" != typeof e || null == e) throw new Error("Second argument should be a id of dapp");
    if ("function" != typeof i || null == i) throw new Error("Third argument should be a api hanlder callback");
    this.params = t,
    this.file = r,
    this.id = e,
    this.apiHandler = i,
    this.child = null,
    this.debug = a || !1,
    this.callbackCounter = 1,
    this.logger = n,
    this.callbacks = {}
}
util.inherits(SandboxWrapper, EventEmitter),
SandboxWrapper.prototype._getCallbackCounter = function() {
    return this.callbackCounter++
},
SandboxWrapper.prototype._parse = function(r) {
    var e = r;
    if (null === e.callback_id || void 0 === e.callback_id) return this._onError(new Error("Incorrect response from vm, missed callback id field"));
    try {
        var t = parseInt(e.callback_id)
    } catch(r) {
        return this._onError(new Error("Incorrect callback_id field, callback_id should be a number"))
    }
    if (isNaN(t)) return this._onError(new Error("Incorrect callback_id field, callback_id should be a number"));
    if ("dapp_response" == e.type) {
        var i = this.callbacks[t];
        if (!i) return this._onError(new Error("ETM can't find callback_id from vm"));
        var a = e.error,
        n = e.response;
        delete this.callbacks[t],
        (0, _setImmediate3.
    default)(i, a, n)
    } else if ("dapp_call" == e.type) {
        var o = e.message;
        if (null == o) return this._onError(new Error("ETM can't find message for request from vm"));
        o.dappId = this.id,
        this.apiHandler(o,
        function(r, e) {
            var i = {
                type: "etm_response",
                callback_id: t,
                error: r,
                response: e || {}
            };
            this.child.postMessage(i)
        }.bind(this))
    } else this._onError(new Error("Incorrect response type from vm"))
},
SandboxWrapper.prototype.run = function() {
    this.child = new Sandbox({
        file: this.file,
        args: this.params
    });
    var r = this;
    r.child.run(function(e) {
        return r._onError("dapp exit with reason: " + e.result)
    }),
    r.child.on("exit",
    function(e) {
        r.emit("exit", e)
    }),
    r.child.on("error", r._onError.bind(r)),
    r.debug && r.child.on("stdout", r._debug.bind(r)),
    r.child.on("stderr", r._debug.bind(r)),
    r.child.on("message", r._parse.bind(r))
},
SandboxWrapper.prototype.setApi = function(r) {
    if ("function" != typeof r || null == r) throw new Error("First argument should be a function");
    this.apiHandler = r
},
SandboxWrapper.prototype.sendMessage = function(r, e) {
    var t = this._getCallbackCounter(),
    i = {
        callback_id: t,
        type: "etm_call",
        message: r
    };
    this.callbacks[t] = e,
    this.child.postMessage(i)
},
SandboxWrapper.prototype.exit = function() {
    this.child && this.child.kill()
},
SandboxWrapper.prototype._debug = function(r) {
    this.logger.log("dapp[" + this.id + "]", r)
},
SandboxWrapper.prototype._onError = function(r) {
    this.logger.error("dapp[" + this.id + "]", r)
},
SandboxWrapper.routes = require("./framework/routes.json"),
module.exports = SandboxWrapper;