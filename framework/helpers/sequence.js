"use strict";
var _setImmediate2 = require("babel-runtime/core-js/set-immediate"),
_setImmediate3 = _interopRequireDefault(_setImmediate2);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var util = require("util"),
extend = require("extend");
function Sequence(e) {
    var t = {
        onWarning: null,
        warningLimit: 300
    };
    t = extend(t, e);
    var n = this;
    this.sequence = [],
    this.counter = 1,
    this.name = e.name,
    (0, _setImmediate3.
default)(function e() {
        t.onWarning && n.sequence.length >= t.warningLimit && t.onWarning(n.sequence.length, t.warningLimit),
        n.__tick(function() {
            setTimeout(e, 3)
        })
    })
}
Sequence.prototype.__tick = function(e) {
    var t = this,
    n = this.sequence.shift();
    if (!n) return (0, _setImmediate3.
default)(e);
    var i = [function(i, u) {
        app.logger.debug(t.name + " sequence out " + n.counter + " func " + n.worker.name),
        n.done && (0, _setImmediate3.
    default)(n.done, i, u),
        (0, _setImmediate3.
    default)(e)
    }];
    n.args && (i = i.concat(n.args)),
    n.worker.apply(n.worker, i)
},
Sequence.prototype.add = function(e, t, n) {
    if (!n && t && "function" == typeof t && (n = t, t = void 0), e && "function" == typeof e) {
        var i = {
            worker: e,
            done: n
        };
        util.isArray(t) && (i.args = t),
        i.counter = this.counter++,
        app.logger.debug(this.name + " sequence in " + i.counter + " func " + e.name),
        this.sequence.push(i)
    }
},
Sequence.prototype.count = function() {
    return this.sequence.length
},
module.exports = Sequence;