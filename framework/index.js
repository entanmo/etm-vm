"use strict";
var _setImmediate2 = require("babel-runtime/core-js/set-immediate"),
_setImmediate3 = _interopRequireDefault(_setImmediate2);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var EventEmitter = require("events").EventEmitter,
util = require("util");
function Sandbox() {
    this.callbacks = {},
    this.callbackCounter = 1,
    this.messageHandler = null,
    this.dappMessageCb = null,
    EventEmitter.call(this)
}
util.inherits(Sandbox, EventEmitter),
Sandbox.prototype.processParentMessage = function(e) {
    if ("function" == typeof this.onMessage) {
        var t, a = e;
        if (!a.callback_id) return void app.logger.error("Incorrent response from parent, missed callback_id field");
        try {
            t = parseInt(a.callback_id)
        } catch(e) {
            return void app.logger.error("Failed to convert callback_id to integer")
        }
        if (isNaN(t)) return void app.logger.error("Incorrect callback_id field, callback_id should be a number");
        if ("etm_response" == a.type) {
            if (! (n = this.callbacks[t])) return void app.logger.error("Can't find callback_id from parent");
            var r = a.error,
            i = a.response;
            delete this.callbacks[t],
            (0, _setImmediate3.
        default)(n, r, i)
        } else if ("etm_call" == a.type) {
            var n = function(e, a) {
                var r = {
                    type: "dapp_response",
                    callback_id: t,
                    error: e
                }; ! e && a && (r.response = a.response),
                this.emit("message", r)
            }.bind(this),
            s = a.message;
            "function" == typeof this.messageHandler && (0, _setImmediate3.
        default)(this.messageHandler, s, t, n)
        }
    }
},
Sandbox.prototype._getCallbackCounter = function() {
    return this.callbackCounter++
},
Sandbox.prototype.onMessage = function(e) {
    this.messageHandler = e
},
Sandbox.prototype.sendMessage = function(e, t) {
    t || (t = function() {});
    var a = this._getCallbackCounter(),
    r = {
        type: "dapp_call",
        callback_id: a,
        message: e
    };
    this.callbacks[a] = t,
    this.emit("message", r)
},
Sandbox.prototype.run = function(e) {
    var t = {
        sandbox: this
    };
    global.app = e,
    global.PIFY = require("./helpers/index").PIFY,
    require("./init")(t,
    function(t) {
        t ? (console.error("Failed to init: " + t), process.exit(2)) : (e.logger.info("Initialize complete"), this.emit("ready"))
    }.bind(this))
};
var instance = new Sandbox;
process.exit = function(e) {
    instance.emit("exit", e)
},
module.exports = instance;