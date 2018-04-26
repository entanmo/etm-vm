"use strict";
var _getIterator2 = require("babel-runtime/core-js/get-iterator"),
_getIterator3 = _interopRequireDefault(_getIterator2),
_set = require("babel-runtime/core-js/set"),
_set2 = _interopRequireDefault(_set),
_map = require("babel-runtime/core-js/map"),
_map2 = _interopRequireDefault(_map),
_classCallCheck2 = require("babel-runtime/helpers/classCallCheck"),
_classCallCheck3 = _interopRequireDefault(_classCallCheck2),
_createClass2 = require("babel-runtime/helpers/createClass"),
_createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var TEN_MINUTES = 6e5,
FOUR_HOURS = 144e5,
OutTransferManager = function() {
    function e(t) { (0, _classCallCheck3.
    default)(this, e),
        this.maxSignatureNumber = t,
        this.pending = new Array,
        this.index = new _map2.
    default,
        this.cacheIds = new _set2.
    default,
        this.historyIds = new _set2.
    default,
        this.lastClearCacheTime = Date.now(),
        this.lastClearHistoryTime = Date.now()
    }
    return (0, _createClass3.
default)(e, [{
        key: "addReady",
        value: function(e, t) {
            this.cacheIds.add(e.id),
            this.cacheIds.add(t)
        }
    },
    {
        key: "addPending",
        value: function(e, t) {
            e.signatures || (e.signatures = []),
            this.pending.push(e),
            this.index.set(e.id, this.pending.length - 1),
            this.cacheIds.add(e.id),
            this.cacheIds.add(t)
        }
    },
    {
        key: "addSignature",
        value: function(e, t) {
            var a = this.index[e],
            i = this.pending[a];
            i && i.signatures.length < this.maxSignatureNumber && -1 == i.signatures.indexOf(t) && i.signatures.push(t)
        }
    },
    {
        key: "setReady",
        value: function(e) {
            var t = this.index[e];
            this.pending[t] ? (this.index.delete(e), this.pending[t] = null) : this.cacheIds.add(e)
        }
    },
    {
        key: "getPending",
        value: function() {
            var e = this.pending.filter(function(e) {
                return !! e
            });
            return this.pending = e,
            e
        }
    },
    {
        key: "has",
        value: function(e) {
            return this.index.has(e) || this.cacheIds.has(e) || this.historyIds.has(e)
        }
    },
    {
        key: "clear",
        value: function() {
            var e = Date.now() - this.lastClearCacheTime,
            t = Date.now() - this.lastClearHistoryTime;
            if (e > TEN_MINUTES) {
                t > FOUR_HOURS && (this.historyIds.clear(), this.lastClearHistoryTime = Date.now());
                var a = !0,
                i = !1,
                s = void 0;
                try {
                    for (var r, n = (0, _getIterator3.
                default)(this.cacheIds); ! (a = (r = n.next()).done); a = !0) {
                        var l = r.value;
                        this.historyIds.add(l)
                    }
                } catch(e) {
                    i = !0,
                    s = e
                } finally {
                    try { ! a && n.
                        return && n.
                        return ()
                    } finally {
                        if (i) throw s
                    }
                }
                this.cacheIds.clear(),
                this.lastClearCacheTime = Date.now()
            }
        }
    }]),
    e
} ();
module.exports = OutTransferManager;