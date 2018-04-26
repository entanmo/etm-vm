"use strict";
var _stringify = require("babel-runtime/core-js/json/stringify"),
_stringify2 = _interopRequireDefault(_stringify);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var fs = require("fs"),
path = require("path"),
spawn = require("child_process").spawn,
util = require("util"),
EventEmitter = require("events").EventEmitter;
function Sandbox(e) {
    var t = this;
    t._ready = !1,
    t._exited = !1,
    t._message_queue = [],
    t.options = {
        timeout: 0,
        node: "node",
        shovel: path.join(__dirname, "shovel2.js"),
        file: e.file,
        args: e.args
    }
}
util.inherits(Sandbox, EventEmitter),
Sandbox.prototype.run = function() {
    var e = this,
    t = [this.options.shovel, this.options.file].concat(this.options.args);
    e.child = spawn(this.options.node, t, {
        stdio: ["pipe", "pipe", "pipe", "ipc"]
    }),
    e.child.stdout.on("data",
    function(t) {
        e.emit("stdout", t.toString("utf8").replace(/\n$/, ""))
    }),
    e.child.stderr.on("data",
    function(t) {
        e.emit("stderr", t.toString("utf8").replace(/\n$/, ""))
    }),
    e.child.on("message",
    function(t) {
        if ("__sandbox_inner_ready__" === t) for (e.emit("ready"), e._ready = !0; e._message_queue.length > 0;) e.postMessage(e._message_queue.shift());
        else e.emit("message", t)
    }),
    e.child.on("exit",
    function(t) {
        e.options.timeout,
        e.exited = !0,
        e.emit("exit", t)
    }),
    e.options.timeout > 0 && (e.child.timer = setTimeout(function() {
        this.parent.stdout.removeListener("output", output),
        (0, _stringify2.
    default)({
            result:
            "TimeoutError",
            console: []
        }),
        this.parent.kill("SIGKILL")
    },
    e.options.timeout), e.child.timer.parent = e.child)
},
Sandbox.prototype.kill = function() {
    var e = this;
    e._ready && !e.exited && e.child && e.child.kill("SIGKILL")
},
Sandbox.prototype.postMessage = function(e) {
    var t = this;
    t._ready ? t.child.send(e) : t._message_queue.push(e)
},
module.exports = Sandbox;