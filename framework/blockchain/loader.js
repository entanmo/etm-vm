"use strict";
var _regenerator = require("babel-runtime/regenerator"),
_regenerator2 = _interopRequireDefault(_regenerator),
_asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator"),
_asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var async = require("async"),
private_ = {},
self = null,
library = null,
modules = null;
function Loader(e, r) {
    library = r,
    e(null, self = this)
}
private_.loadBlockChain = (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function e() {
        return _regenerator2.
    default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
            case 0:
            case "end":
                return e.stop()
            }
        },
        e, this)
    })),
    Loader.prototype.onBind = function(e) {
        modules = e
    },
    Loader.prototype.onBlockchainReady = function() {
        var e = this; (0, _asyncToGenerator3.
    default)(_regenerator2.
    default.mark(function r() {
            return _regenerator2.
        default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                case 0:
                    return e.prev = 0,
                    e.next = 3,
                    private_.loadBlockChain();
                case 3:
                    e.next = 8;
                    break;
                case 5:
                    e.prev = 5,
                    e.t0 = e.
                    catch(0),
                    app.logger.error("Loader#loadBlockChain error: " + e.t0);
                case 8:
                case "end":
                    return e.stop()
                }
            },
            r, e, [[0, 5]])
        }))()
    },
    Loader.prototype.onMessage = function(e) {},
    module.exports = Loader;