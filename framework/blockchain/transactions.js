"use strict";
var _setImmediate2 = require("babel-runtime/core-js/set-immediate"),
_setImmediate3 = _interopRequireDefault(_setImmediate2),
_regenerator = require("babel-runtime/regenerator"),
_regenerator2 = _interopRequireDefault(_regenerator),
_asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator"),
_asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2),
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
var private_ = {},
self = null,
library = null,
modules = null,
TransactionPool = function() {
    function e() { (0, _classCallCheck3.
    default)(this, e),
        this.index = new _map2.
    default,
        this.unConfirmed = new Array
    }
    return (0, _createClass3.
default)(e, [{
        key: "add",
        value: function(e) {
            this.unConfirmed.push(e),
            this.index.set(e.id, this.unConfirmed.length - 1)
        }
    },
    {
        key: "remove",
        value: function(e) {
            var r = this.index.get(e);
            delete this.index[e],
            this.unConfirmed[r] = null
        }
    },
    {
        key: "has",
        value: function(e) {
            var r = this.index.get(e);
            return void 0 !== r && !!this.unConfirmed[r]
        }
    },
    {
        key: "getUnconfirmed",
        value: function() {
            for (var e = [], r = 0; r < this.unConfirmed.length; r++) this.unConfirmed[r] && e.push(this.unConfirmed[r]);
            return e
        }
    },
    {
        key: "clear",
        value: function() {
            this.index = new _map2.
        default,
            this.unConfirmed = new Array
        }
    },
    {
        key: "get",
        value: function(e) {
            var r = this.index.get(e);
            return this.unConfirmed[r]
        }
    }]),
    e
} ();
function Transactions(e, r) {
    library = r,
    (self = this).pool = new TransactionPool,
    e(null, self)
}
Transactions.prototype.getUnconfirmedTransaction = function(e) {
    return self.pool.get(e)
},
Transactions.prototype.processUnconfirmedTransactionAsync = function() {
    var e = (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function e(r) {
        var t, n, a, o;
        return _regenerator2.
    default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
            case 0:
                if (modules.logic.transaction.normalize(r), t = modules.logic.transaction.getBytes(r), n = modules.api.crypto.getId(t), !r.id) {
                    e.next = 8;
                    break
                }
                if (r.id == n) {
                    e.next = 6;
                    break
                }
                throw new Error("Incorrect trainsaction id");
            case 6:
                e.next = 9;
                break;
            case 8:
                r.id = n;
            case 9:
                if (app.logger.debug("process unconfirmed trs", r.id, r.func), !self.pool.has(r.id)) {
                    e.next = 12;
                    break
                }
                throw new Error("Transaction already processed");
            case 12:
                if (modules.logic.transaction.verify(r)) {
                    e.next = 15;
                    break
                }
                throw new Error("Invalid transaction signature");
            case 15:
                return e.next = 17,
                app.model.Transaction.exists({
                    id: r.id
                });
            case 17:
                if (!e.sent) {
                    e.next = 20;
                    break
                }
                throw new Error("Transaction already confirmed");
            case 20:
                return r.senderId || (r.senderId = modules.blockchain.accounts.generateAddressByPublicKey(r.senderPublicKey)),
                a = modules.blockchain.blocks.getLastBlock().height,
                o = {
                    height: a,
                    delegate: modules.blockchain.round.getCurrentDelegate(a)
                },
                e.prev = 23,
                e.next = 26,
                modules.logic.transaction.apply(r, o);
            case 26:
                e.next = 32;
                break;
            case 28:
                throw e.prev = 28,
                e.t0 = e.
                catch(23),
                app.sdb.rollbackTransaction(),
                new Error("Apply transaction error: " + e.t0);
            case 32:
                return self.pool.add(r),
                e.abrupt("return", r);
            case 34:
            case "end":
                return e.stop()
            }
        },
        e, this, [[23, 28]])
    }));
    return function(r) {
        return e.apply(this, arguments)
    }
} (),
Transactions.prototype.getUnconfirmedTransactionList = function() {
    return self.pool.getUnconfirmed()
},
Transactions.prototype.removeUnconfirmedTransaction = function(e) {
    self.pool.remove(e)
},
Transactions.prototype.hasUnconfirmed = function(e) {
    return self.pool.has(e)
},
Transactions.prototype.clearUnconfirmed = function() {
    self.pool.clear()
},
Transactions.prototype.addTransaction = function(e, r) {
    var t = e.query;
    library.sequence.add(function(e) { (0, _asyncToGenerator3.
    default)(_regenerator2.
    default.mark(function r() {
            var n;
            return _regenerator2.
        default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.prev = 0,
                    r.next = 3,
                    self.processUnconfirmedTransactionAsync(t.transaction);
                case 3:
                    n = r.sent,
                    e(null, {
                        transactionId: n.id
                    }),
                    r.next = 10;
                    break;
                case 7:
                    r.prev = 7,
                    r.t0 = r.
                    catch(0),
                    e(r.t0.toString());
                case 10:
                case "end":
                    return r.stop()
                }
            },
            r, this, [[0, 7]])
        }))()
    },
    r)
},
Transactions.prototype.addTransactionUnsigned = function(e, r) {
    var t = e.query;
    if (t.type && (t.type = Number(t.type)), !library.validator.validate(t, {
        type: "object",
        properties: {
            secret: {
                type: "string",
                maxLength: 100
            },
            fee: {
                type: "string",
                maxLength: 50
            },
            type: {
                type: "integer",
                min: 1
            },
            args: {
                type: "string"
            }
        },
        required: ["secret", "fee", "type"]
    })) return (0, _setImmediate3.
default)(r, library.validator.getLastError().details[0].message);
    library.sequence.add(function(e) { (0, _asyncToGenerator3.
    default)(_regenerator2.
    default.mark(function r() {
            var n, a;
            return _regenerator2.
        default.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                case 0:
                    return r.prev = 0,
                    n = modules.api.crypto.keypair(t.secret),
                    a = modules.logic.transaction.create(t, n),
                    r.next = 5,
                    self.processUnconfirmedTransactionAsync(a);
                case 5:
                    e(null, {
                        transactionId: a.id
                    }),
                    r.next = 11;
                    break;
                case 8:
                    r.prev = 8,
                    r.t0 = r.
                    catch(0),
                    e(r.t0.toString());
                case 11:
                case "end":
                    return r.stop()
                }
            },
            r, this, [[0, 8]])
        }))()
    },
    r)
},
Transactions.prototype.getUnconfirmedTransactions = function(e, r) { (0, _setImmediate3.
default)(r, null, {
        transactions: self.getUnconfirmedTransactionList()
    })
},
Transactions.prototype.getTransactions = function(e, r) {
    var t = this,
    n = Number(e.query.limit) || 100,
    a = Number(e.query.offset) || 0,
    o = {};
    e.query.senderId && (o.senderId = e.query.senderId),
    e.query.type && (o.type = Number(e.query.type)),
    (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function e() {
        var s, i;
        return _regenerator2.
    default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
            case 0:
                return e.prev = 0,
                e.next = 3,
                app.model.Transaction.count(o);
            case 3:
                return s = e.sent,
                e.next = 6,
                app.model.Transaction.findAll({
                    condition: o,
                    limit: n,
                    offset: a
                });
            case 6:
                return (i = e.sent) || (i = []),
                e.abrupt("return", r(null, {
                    transactions: i,
                    count: s
                }));
            case 11:
                return e.prev = 11,
                e.t0 = e.
                catch(0),
                app.logger.error("Failed to get transactions", e.t0),
                e.abrupt("return", r("System error: " + e.t0));
            case 15:
            case "end":
                return e.stop()
            }
        },
        e, t, [[0, 11]])
    }))()
},
Transactions.prototype.getTransaction = function(e, r) { (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function t() {
        var n, a;
        return _regenerator2.
    default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
            case 0:
                if (t.prev = 0, e.params && e.params.id) {
                    t.next = 3;
                    break
                }
                return t.abrupt("return", r("Invalid transaction id"));
            case 3:
                return n = e.params.id,
                t.next = 6,
                app.model.Transaction.findOne({
                    condition: {
                        id: n
                    }
                });
            case 6:
                if (a = t.sent) {
                    t.next = 9;
                    break
                }
                return t.abrupt("return", r("Transaction not found"));
            case 9:
                return t.abrupt("return", r(null, {
                    transaction: a
                }));
            case 12:
                return t.prev = 12,
                t.t0 = t.
                catch(0),
                t.abrupt("return", r("System error: " + t.t0));
            case 15:
            case "end":
                return t.stop()
            }
        },
        t, this, [[0, 12]])
    }))()
},
Transactions.prototype.receiveTransactions = function(e, r) { (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function t() {
        var n;
        return _regenerator2.
    default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
            case 0:
                t.prev = 0,
                n = 0;
            case 2:
                if (! (n < e.length)) {
                    t.next = 8;
                    break
                }
                return t.next = 5,
                self.processUnconfirmedTransactionAsync(e[n]);
            case 5:
                ++n,
                t.next = 2;
                break;
            case 8:
                t.next = 13;
                break;
            case 10:
                return t.prev = 10,
                t.t0 = t.
                catch(0),
                t.abrupt("return", r(t.t0));
            case 13:
                r();
            case 14:
            case "end":
                return t.stop()
            }
        },
        t, this, [[0, 10]])
    }))()
},
Transactions.prototype.receiveTransactionsAsync = function() {
    var e = (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function e(r) {
        var t;
        return _regenerator2.
    default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
            case 0:
                t = 0;
            case 1:
                if (! (t < r.length)) {
                    e.next = 7;
                    break
                }
                return e.next = 4,
                self.processUnconfirmedTransactionAsync(r[t]);
            case 4:
                ++t,
                e.next = 1;
                break;
            case 7:
            case "end":
                return e.stop()
            }
        },
        e, this)
    }));
    return function(r) {
        return e.apply(this, arguments)
    }
} (),
Transactions.prototype.onMessage = function(e) {
    switch (e.topic) {
    case "transaction":
        library.sequence.add(function(r) {
            var t = e.message;
            self.receiveTransactions([t],
            function(e) {
                e && app.logger.error("Failed to process transactions: ", e)
            })
        })
    }
},
Transactions.prototype.onBind = function(e) {
    modules = e
},
module.exports = Transactions;