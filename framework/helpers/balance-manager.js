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
BalanceManager = function() {
    function e(a) { (0, _classCallCheck3.
    default)(this, e),
        this.sdb = a
    }
    return (0, _createClass3.
default)(e, [{
        key: "get",
        value: function(e, a) {
            var r = this.sdb.get("Balance", {
                address: e,
                currency: a
            }),
            s = r ? r.balance: "0";
            return bignum(s)
        }
    },
    {
        key: "increase",
        value: function(e, a, r) {
            if (!bignum(r).eq(0)) {
                var s = {
                    address: e,
                    currency: a
                },
                l = this.sdb.get("Balance", s);
                if (null !== l) {
                    var n = bignum(l.balance).plus(r);
                    this.sdb.update("Balance", {
                        balance: n.toString()
                    },
                    s)
                } else s.balance = r,
                this.sdb.create("Balance", s)
            }
        }
    },
    {
        key: "decrease",
        value: function(e, a, r) {
            this.increase(e, a, "-" + r)
        }
    },
    {
        key: "transfer",
        value: function(e, a, r, s) {
            this.decrease(r, e, a),
            this.increase(s, e, a)
        }
    }]),
    e
} ();
module.exports = BalanceManager;