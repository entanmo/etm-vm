"use strict";
var _promise = require("babel-runtime/core-js/promise"),
_promise2 = _interopRequireDefault(_promise);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
module.exports = {
    PIFY: function(e, r) {
        return function() {
            for (var t = arguments.length,
            n = Array(t), u = 0; u < t; u++) n[u] = arguments[u];
            return new _promise2.
        default(function(t, u) {
                e.apply(r, [].concat(n, [function(e, r) {
                    return e ? u(e) : t(r)
                }]))
            })
        }
    }
};