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
module.exports = {
    deposit: function() {
        var e = (0, _asyncToGenerator3.
    default)(_regenerator2.
    default.mark(function e(r, t, n, a) {
            return _regenerator2.
        default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                case 0:
                    if (a) {
                        e.next = 2;
                        break
                    }
                    return e.abrupt("return", "Invalid recipient");
                case 2:
                    if (app.validate("amount", t), -1 !== app.meta.delegates.indexOf(this.trs.senderPublicKey)) {
                        e.next = 5;
                        break
                    }
                    return e.abrupt("return", "Sender is not a delegate");
                case 5:
                    return e.next = 7,
                    app.model.Deposit.exists({
                        srcId: n
                    });
                case 7:
                    if (!e.sent) {
                        e.next = 10;
                        break
                    }
                    return e.abrupt("return", "Double deposit");
                case 10:
                    app.sdb.lock("core.deposit@" + n),
                    app.balances.increase(a, r, t),
                    app.sdb.create("Deposit", {
                        tid: this.trs.id,
                        currency: r,
                        amount: t,
                        srcId: n,
                        recipientId: a
                    });
                case 13:
                case "end":
                    return e.stop()
                }
            },
            e, this)
        }));
        return function(r, t, n, a) {
            return e.apply(this, arguments)
        }
    } (),
    withdrawal: function() {
        var e = (0, _asyncToGenerator3.
    default)(_regenerator2.
    default.mark(function e(r, t) {
            return _regenerator2.
        default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                case 0:
                    if (app.validate("amount", t), !app.balances.get(this.trs.senderId, r).lt(t)) {
                        e.next = 4;
                        break
                    }
                    return e.abrupt("return", "Insufficient balance");
                case 4:
                    app.balances.decrease(this.trs.senderId, r, t);
                case 5:
                case "end":
                    return e.stop()
                }
            },
            e, this)
        }));
        return function(r, t) {
            return e.apply(this, arguments)
        }
    } (),
    transfer: function() {
        var e = (0, _asyncToGenerator3.
    default)(_regenerator2.
    default.mark(function e(r, t, n) {
            var a;
            return _regenerator2.
        default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                case 0:
                    if (n) {
                        e.next = 2;
                        break
                    }
                    return e.abrupt("return", "Invalid recipient");
                case 2:
                    if (app.validate("amount", t), a = app.balances.get(this.trs.senderId, r), 1 === this.block.height || !a.lt(t)) {
                        e.next = 6;
                        break
                    }
                    return e.abrupt("return", "Insufficient balance");
                case 6:
                    app.balances.transfer(r, t, this.trs.senderId, n),
                    app.sdb.create("Transfer", {
                        tid: this.trs.id,
                        senderId: this.trs.senderId,
                        recipientId: n,
                        currency: r,
                        amount: t
                    });
                case 8:
                case "end":
                    return e.stop()
                }
            },
            e, this)
        }));
        return function(r, t, n) {
            return e.apply(this, arguments)
        }
    } (),
    setNickname: function() {
        var e = (0, _asyncToGenerator3.
    default)(_regenerator2.
    default.mark(function e(r) {
            var t, n;
            return _regenerator2.
        default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                case 0:
                    if (r && !(r.length > 20)) {
                        e.next = 2;
                        break
                    }
                    return e.abrupt("return", "Invalid name");
                case 2:
                    return app.sdb.lock("core.account@" + this.trs.senderId),
                    e.next = 5,
                    app.model.Account.exists({
                        str1: r
                    });
                case 5:
                    if (!e.sent) {
                        e.next = 8;
                        break
                    }
                    return e.abrupt("return", "Nickname already exists");
                case 8:
                    return t = {
                        address: this.trs.senderId
                    },
                    e.next = 11,
                    app.model.Account.findOne({
                        condition: t
                    });
                case 11:
                    if (! (n = e.sent) || !n.str1) {
                        e.next = 14;
                        break
                    }
                    return e.abrupt("return", "Nickname already set");
                case 14:
                    app.sdb.replace("Account", {
                        address: this.trs.senderId,
                        str1: r
                    });
                case 15:
                case "end":
                    return e.stop()
                }
            },
            e, this)
        }));
        return function(r) {
            return e.apply(this, arguments)
        }
    } ()
};