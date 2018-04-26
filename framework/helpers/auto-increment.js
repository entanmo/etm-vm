"use strict";
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck"),
_classCallCheck3 = _interopRequireDefault(_classCallCheck2),
_createClass2 = require("babel-runtime/helpers/createClass"),
_createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var bignum = require("bignumber"),
AutoIncrement = function() {
    function e(a) { (0, _classCallCheck3.
    default)(this, e),
        this.sdb = a
    }
    return (0, _createClass3.
default)(e, [{
        key: "get",
        value: function(e) {
            var a = this.sdb.get("Variable", {
                key: e
            });
            return a ? a.value: "0"
        }
    },
    {
        key: "increment",
        value: function(e) {
            var a = this.sdb.get("Variable", {
                key: e
            });
            if (a) {
                var r = bignum(a.value).plus(1).toString();
                return this.sdb.update("Variable", {
                    value: r
                },
                {
                    key: e
                }),
                r
            }
            return this.sdb.create("Variable", {
                key: e,
                value: "1"
            }),
            "1"
        }
    }]),
    e
} ();
module.exports = AutoIncrement;