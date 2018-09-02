"use strict";
var _regenerator = require("babel-runtime/regenerator"),
_regenerator2 = _interopRequireDefault(_regenerator),
_asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator"),
_asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2),
_typeof2 = require("babel-runtime/helpers/typeof"),
_typeof3 = _interopRequireDefault(_typeof2),
_keys = require("babel-runtime/core-js/object/keys"),
_keys2 = _interopRequireDefault(_keys),
_setImmediate2 = require("babel-runtime/core-js/set-immediate"),
_setImmediate3 = _interopRequireDefault(_setImmediate2);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var util = require("util"),
crypto = require("crypto"),
bignum = require("bignumber"),
extend = require("extend"),
addressHelper = require("../helpers/address.js"),
private_ = {},
self = null,
library = null,
modules = null;
function Accounts(e, r) {
    library = r,
    e(null, self = this)
}
function reverseDiff(e) {
    for (var r = e.slice(), t = 0; t < r.length; t++) {
        var n = "-" == r[t][0] ? "+": "-";
        r[t] = n + r[t].slice(1)
    }
    return r
}
function applyDiff(e, r) {
    for (var t = e ? e.slice() : [], n = 0; n < r.length; n++) {
        var a = r[n][0],
        c = r[n].slice(1);
        if ("+" == a) {
            var u = -1;
            if ((t = t || []) && (u = t.indexOf(c)), -1 != u) return ! 1;
            t.push(c)
        }
        if ("-" == a) {
            u = -1;
            if (t && (u = t.indexOf(c)), -1 == u) return ! 1;
            t.splice(u, 1),
            t.length || (t = null)
        }
    }
    return t
}
private_.accounts = [],
private_.accountsIndexById = {},
private_.executor = null,
private_.addAccount = function(e, r) {
    e.address || (e.address = self.generateAddressByPublicKey(e.publicKey)),
    e.balance = e.balance || {},
    e.u_balance = e.u_balance || {},
    e.balance.ETM = e.balance.ETM || 0,
    e.u_balance.ETM = e.u_balance.ETM || 0,
    (r || private_).accounts.push(e);
    var t = (r || private_).accounts.length - 1;
    return (r || private_).accountsIndexById[e.address] = t,
    e
},
private_.removeAccount = function(e, r) {
    var t = (r || private_).accountsIndexById[e];
    delete(r || private_).accountsIndexById[e],
    (r || private_).accounts[t] = void 0
},
private_.getAccount = function(e, r) {
    var t = (r || private_).accountsIndexById[e];
    return (r || private_).accounts[t]
},
Accounts.prototype.clone = function(e) {
    var r = {
        data: extend(!0, {},
        private_.accounts),
        index: extend(!0, {},
        private_.accountsIndexById)
    };
    for (var t in r.data) for (var n in r.data[t].u_balance) r.data[t].u_balance[n] = r.data[t].balance[n] || 0;
    e(null, r)
},
Accounts.prototype.getExecutor = function(e) {
    var r = app.secret;
    if (!r) return (0, _setImmediate3.
default)(e, "Secret is null");
    if (private_.executor) return (0, _setImmediate3.
default)(e, null, private_.executor);
    var t = modules.api.crypto.keypair(r),
    n = self.generateAddressByPublicKey(t.publicKey.toString("hex"));
    private_.executor = {
        address: n,
        keypair: t,
        secret: r
    },
    e(null, private_.executor)
},
Accounts.prototype.generateAddressByPublicKey = function(e) {
    return addressHelper.generateBase58CheckAddress(e)
},
Accounts.prototype.getAccount = function(e, r, t) {
    var n = e.address;
    if (e.publicKey && (n = self.generateAddressByPublicKey(e.publicKey)), !n) return r("Account not found");
    r(null, private_.getAccount(n, t))
},
Accounts.prototype.getAccounts = function(e, r) {
    e(null, (r || private_).accounts.filter(function(e) {
        return !! e
    }))
},
Accounts.prototype.setAccountAndGet = function(e, r, t) {
    var n = e.address || null;
    if (null === n) {
        if (!e.publicKey) return r("Missing address or publicKey");
        n = self.generateAddressByPublicKey(e.publicKey)
    }
    var a = private_.getAccount(n, t);
    a ? extend(a, e) : a = private_.addAccount(e, t),
    r(null, a)
},
Accounts.prototype.mergeAccountAndGet = function(e, r, t) {
    var n = e.address || null;
    if (null === n) {
        if (!e.publicKey) return r("Missing address or publicKey");
        n = self.generateAddressByPublicKey(e.publicKey)
    }
    var a = private_.getAccount(n, t);
    if (!a) {
        var c = {
            address: n
        };
        e.publicKey && (c.publicKey = e.publicKey),
        a = private_.addAccount(c, t)
    } (0, _keys2.
default)(e).forEach(function(r) {
        var t = e[r];
        if ("number" == typeof t) a[r] = (a[r] || 0) + t;
        else if (util.isArray(t)) a[r] = applyDiff(a[r], t);
        else if ("object" == (void 0 === t ? "undefined": (0, _typeof3.
    default)(t))) for (var n in t) a[r][n] = (a[r][n] || 0) + t[n]
    }),
    r(null, a)
},
Accounts.prototype.undoMerging = function(e, r, t) {
    var n = e.address || null;
    if (null === n) {
        if (!e.publicKey) return r("Missing address or publicKey");
        n = self.generateAddressByPublicKey(e.publicKey)
    }
    var a = private_.getAccount(n, t);
    if (!a) {
        var c = {
            address: n
        };
        e.publicKey && (c.publicKey = e.publicKey),
        a = private_.addAccount(c, t)
    } (0, _keys2.
default)(e).forEach(function(r) {
        var t = e[r];
        if ("number" == typeof t) a[r] = (a[r] || 0) - t;
        else if (util.isArray(t)) t = reverseDiff(t),
        a[r] = applyDiff(a[r], t);
        else if ("object" == (void 0 === t ? "undefined": (0, _typeof3.
    default)(t))) for (var n in t) a[r][n] = (a[r][n] || 0) - t[n]
    }),
    r(null, a)
},
Accounts.prototype.onBind = function(e) {
    modules = e
},
Accounts.prototype.login = function(e, r) {
    var t = this,
    n = e.query;
    if (!n.secret) return r("secret should not be empty"); (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function e() {
        var a, c, u, i, s;
        return _regenerator2.
    default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
            case 0:
                return e.prev = 0,
                a = modules.api.crypto.keypair(n.secret),
                c = self.generateAddressByPublicKey(a.publicKey.toString("hex")),
                e.next = 5,
                app.model.Balance.findAll({
                    condition: {
                        address: c
                    },
                    fields: ["currency", "balance"]
                });
            case 5:
                return u = e.sent,
                e.next = 8,
                app.model.Account.findOne({
                    condition: {
                        address: c
                    }
                });
            case 8:
                i = e.sent,
                s = {
                    address: c,
                    publicKey: a.publicKey.toString("hex"),
                    balances: u,
                    extra: i,
                    isDelegate: modules.blockchain.round.isDelegateAddress(c)
                },
                r(null, {
                    account: s
                }),
                e.next = 16;
                break;
            case 13:
                e.prev = 13,
                e.t0 = e.
                catch(0),
                r("Server error: " + e.t0);
            case 16:
            case "end":
                return e.stop()
            }
        },
        e, t, [[0, 13]])
    }))()
},
Accounts.prototype.getBalances = function(e, r) {
    var t = this;
    if (!e.params || !e.params.address) return r("Address should not be empty"); (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function n() {
        var a, c;
        return _regenerator2.
    default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
            case 0:
                return t.prev = 0,
                a = e.params.address,
                t.next = 4,
                app.model.Balance.findAll({
                    condition: {
                        address: a
                    },
                    fields: ["currency", "balance"]
                });
            case 4:
                c = t.sent,
                r(null, {
                    balances: c
                }),
                t.next = 11;
                break;
            case 8:
                t.prev = 8,
                t.t0 = t.
                catch(0),
                r("Server error: " + t.t0);
            case 11:
            case "end":
                return t.stop()
            }
        },
        n, t, [[0, 8]])
    }))()
},
Accounts.prototype.getAccount = function(e, r) {
    var t = this;
    if (!e.params || !e.params.address) return r("Address should not be empty"); (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function n() {
        var a, c, u, i;
        return _regenerator2.
    default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
            case 0:
                return t.prev = 0,
                a = e.params.address,
                t.next = 4,
                app.model.Balance.findAll({
                    condition: {
                        address: a
                    },
                    fields: ["currency", "balance"]
                });
            case 4:
                return c = t.sent,
                t.next = 7,
                app.model.Account.findOne({
                    condition: {
                        address: a
                    }
                });
            case 7:
                u = t.sent,
                i = {
                    balances: c,
                    extra: u,
                    isDelegate: modules.blockchain.round.isDelegateAddress(a)
                },
                r(null, {
                    account: i
                }),
                t.next = 15;
                break;
            case 12:
                t.prev = 12,
                t.t0 = t.
                catch(0),
                r("Server error: " + t.t0);
            case 15:
            case "end":
                return t.stop()
            }
        },
        n, t, [[0, 12]])
    }))()
},
Accounts.prototype.open2 = function(e, r) {
    if (!e.publicKey) return r("publicKey should not be empty");
    try {
        if (32 != new Buffer(e.publicKey, "hex").length) return r("publicKey should be hex format")
    } catch(e) {
        return r("Invalid publicKey")
    }
    var t = self.generateAddressByPublicKey(e.publicKey),
    n = private_.getAccount(t);
    n ? n.publicKey = e.publicKey: n = private_.addAccount({
        address: t,
        publicKey: e.publicKey
    }),
    r(null, {
        account: n
    })
},
module.exports = Accounts;