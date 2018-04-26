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
app.route.get("/contracts",
function() {
    var e = (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function e(r) {
        var t, n;
        return _regenerator2.
    default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
            case 0:
                for (n in t = [], app.contractTypeMapping) t.push({
                    type: n,
                    name: app.contractTypeMapping[n]
                });
                return e.abrupt("return", {
                    contracts: t
                });
            case 3:
            case "end":
                return e.stop()
            }
        },
        e, void 0)
    }));
    return function(r) {
        return e.apply(this, arguments)
    }
} ()),
app.route.get("/transfers",
function() {
    var e = (0, _asyncToGenerator3.
default)(_regenerator2.
default.mark(function e(r) {
        var t, n, a, u, o, s, c, i, p, f, l, d, m;
        return _regenerator2.
    default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
            case 0:
                if (t = r.query.ownerId, n = r.query.currency, a = null, u = null, o = Number(r.query.limit) || 10, s = Number(r.query.offset) || 0, t && n ? (a = [{
                    senderId: t
                },
                {
                    currency: n
                }], u = [{
                    recipientId: t
                },
                {
                    currency: n
                }]) : t ? (a = {
                    senderId: t
                },
                u = {
                    recipientId: t
                }) : a = u = n ? {
                    currency: n
                }: null, null !== a && a !== u) {
                    e.next = 17;
                    break
                }
                return e.next = 10,
                app.model.Transfer.count(a);
            case 10:
                return c = e.sent,
                e.next = 13,
                app.model.Transfer.findAll({
                    condition: a,
                    limit: o,
                    offset: s,
                    sort: {
                        timestamp: -1
                    }
                });
            case 13:
                return i = e.sent,
                e.abrupt("return", {
                    count: c,
                    transfers: i
                });
            case 17:
                return e.next = 19,
                app.model.Transfer.count(a);
            case 19:
                return p = e.sent,
                e.next = 22,
                app.model.Transfer.count(u);
            case 22:
                return f = e.sent,
                e.next = 25,
                app.model.Transfer.findAll({
                    condition: a,
                    limit: o,
                    offset: s,
                    sort: {
                        timestamp: -1
                    }
                });
            case 25:
                return l = e.sent,
                e.next = 28,
                app.model.Transfer.findAll({
                    condition: u,
                    limit: o,
                    offset: s,
                    sort: {
                        timestamp: -1
                    }
                });
            case 28:
                return d = e.sent,
                m = l.concat(d).sort(function(e, r) {
                    return r.t_timestamp - e.t_timestamp
                }).slice(0, o),
                e.abrupt("return", {
                    count: p + f,
                    transfers: m
                });
            case 31:
            case "end":
                return e.stop()
            }
        },
        e, void 0)
    }));
    return function(r) {
        return e.apply(this, arguments)
    }
} ());