"use strict";
var _regenerator = require("babel-runtime/regenerator"),
_regenerator2 = _interopRequireDefault(_regenerator),
_asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator"),
_asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2),
_toArray2 = require("babel-runtime/helpers/toArray"),
_toArray3 = _interopRequireDefault(_toArray2),
_map = require("babel-runtime/core-js/map"),
_map2 = _interopRequireDefault(_map),
_set = require("babel-runtime/core-js/set"),
_set2 = _interopRequireDefault(_set),
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
var jsonSql = require("json-sql")({
    separatedValues: !1
}),
changeCase = require("change-case");
function deconstruct(e) {
    var r = 0,
    t = null;
    for (var o in e) if (t = [o, e[o]], ++r > 1) throw new Error("Multi k-v deconstruct not supported");
    if (!t) throw new Error("Empty condition not supported");
    return t
}
function fromMapToToken(e) {
    var r = [];
    for (var t in e) r.push(t + ":" + e[t]);
    if (!r) throw new Error("Empty condition not supported");
    return r.join(",")
}
function fromIndexSchemaToToken(e, r) {
    var t = "";
    if ("string" == typeof e) {
        if (void 0 === r[e]) throw new Error("Empty index not supported: " + e);
        t = e + ":" + r[e]
    } else {
        if (!Array.isArray(e)) throw new Error("Index format not supported");
        var o = [];
        for (var n in e) {
            var a = e[n];
            if (void 0 === r[a]) throw new Error("Empty index not supported: " + a);
            o.push(a + ":" + r[a])
        }
        t = o.join(",")
    }
    return t
}
function fromModelToTable(e) {
    return changeCase.snakeCase(e) + "s"
}
function escapeSingleQuote(e) {
    for (var r in e)"string" == typeof e[r] && (e[r] = e[r].replace(/'/g, "''"))
}
var SmartDB = function() {
    function e(r) { (0, _classCallCheck3.
    default)(this, e),
        this.app = r,
        this.trsLogs = new Array,
        this.blockLogs = new Array,
        this.lockCache = new _set2.
    default,
        this.indexes = new _map2.
    default,
        this.indexSchema = new _map2.
    default
    }
    return (0, _createClass3.
default)(e, [{
        key: "undoLogs",
        value: function(e) {
            for (; e.length > 0;) {
                var r = e.pop(),
                t = (0, _toArray3.
            default)(r),
                o = t[0],
                n = t.slice(1);
                this["undo" + o].apply(this, n)
            }
        }
    },
    {
        key: "beginBlock",
        value: function() {}
    },
    {
        key: "rollbackBlock",
        value: function() {
            this.lockCache.clear(),
            this.rollbackTransaction(),
            this.undoLogs(this.blockLogs)
        }
    },
    {
        key: "commitBlock",
        value: function() {
            var e = (0, _asyncToGenerator3.
        default)(_regenerator2.
        default.mark(function e(r) {
                var t, o, n, a, i, s, l = this;
                return _regenerator2.
            default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (r = r || {},
                        this.trsLogs.length > 0 && this.commitTransaction(), app.logger.trace("enter commitBlock"), 100, t = [], o = [], n = 0, this.blockLogs.forEach(function(e) {
                            n % 100 == 0 && 0 !== o.length && (t.push(o), o = []);
                            var r = (0, _toArray3.
                        default)(e),
                            a = r[0],
                            i = r.slice(1);
                            "Lock" !== a && (o.push(l["build" + a].apply(l, i).query), n++)
                        }), 0 !== o.length && t.push(o), 0 !== t.length) {
                            e.next = 11;
                            break
                        }
                        return e.abrupt("return", !0);
                    case 11:
                        if (app.logger.debug("sql batchs size", t.length), e.prev = 12, r.noTransaction) {
                            e.next = 17;
                            break
                        }
                        return e.next = 16,
                        this.app.db.transaction();
                    case 16:
                        a = e.sent;
                    case 17:
                        e.t0 = _regenerator2.
                    default.keys(t);
                    case 18:
                        if ((e.t1 = e.t0()).done) {
                            e.next = 26;
                            break
                        }
                        return i = e.t1.value,
                        s = t[i].join(""),
                        app.logger.debug("execute sql:", s),
                        e.next = 24,
                        this.app.db.query(s);
                    case 24:
                        e.next = 18;
                        break;
                    case 26:
                        if (r.noTransaction) {
                            e.next = 29;
                            break
                        }
                        return e.next = 29,
                        a.commit();
                    case 29:
                        this.blockLogs = new Array,
                        this.lockCache.clear(),
                        e.next = 40;
                        break;
                    case 33:
                        if (e.prev = 33, e.t2 = e.
                        catch(12), app.logger.error("-!!!!!!!!!!!!!!!!!!!!!!commit error", e.t2), r.noTransaction) {
                            e.next = 39;
                            break
                        }
                        return e.next = 39,
                        a.rollback();
                    case 39:
                        throw new Error("Failed to commit block: " + e.t2);
                    case 40:
                        app.logger.trace("after commit transaction");
                    case 41:
                    case "end":
                        return e.stop()
                    }
                },
                e, this, [[12, 33]])
            }));
            return function(r) {
                return e.apply(this, arguments)
            }
        } ()
    },
    {
        key: "beginTransaction",
        value: function() {}
    },
    {
        key: "rollbackTransaction",
        value: function() {
            this.undoLogs(this.trsLogs)
        }
    },
    {
        key: "commitTransaction",
        value: function() {
            this.blockLogs = this.blockLogs.concat(this.trsLogs),
            this.trsLogs = new Array
        }
    },
    {
        key: "load",
        value: function() {
            var e = (0, _asyncToGenerator3.
        default)(_regenerator2.
        default.mark(function e(r, t, o) {
                var n, a, i;
                return _regenerator2.
            default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return n = this.app,
                        e.next = 3,
                        n.model[r].findAll({
                            fields: t
                        });
                    case 3:
                        a = e.sent,
                        i = new _map2.
                    default,
                        a.forEach(function(e) {
                            o.forEach(function(r) {
                                var o = fromIndexSchemaToToken(r, e);
                                if (null != i.get(o)) throw Error("Ununique index not supported: " + o);
                                var n = {};
                                t.forEach(function(r) {
                                    n[r] = e[r]
                                }),
                                i.set(o, n)
                            })
                        }),
                        this.indexes.set(r, i),
                        this.indexSchema.set(r, {
                            fields: t,
                            indexes: o
                        });
                    case 8:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            }));
            return function(r, t, o) {
                return e.apply(this, arguments)
            }
        } ()
    },
    {
        key: "get",
        value: function(e, r) {
            if (!e || !r) throw new Error("Invalid params");
            var t = this.indexes.get(e),
            o = this.indexSchema.get(e);
            if (!t || !o) throw new Error("Model not found in cache: " + e);
            var n = fromMapToToken(r);
            return t.get(n) || null
        }
    },
    {
        key: "keys",
        value: function(e) {
            if (!e) throw new Error("Invalid params");
            var r = this.indexes.get(e),
            t = this.indexSchema.get(e);
            if (!r || !t) throw new Error("Model not found in cache: " + e);
            return r.keys()
        }
    },
    {
        key: "entries",
        value: function(e) {
            if (!e) throw new Error("Invalid params");
            var r = this.indexes.get(e),
            t = this.indexSchema.get(e);
            if (!r || !t) throw new Error("Model not found in cache: " + e);
            return r.entries()
        }
    },
    {
        key: "lock",
        value: function(e) {
            if (this.lockCache.has(e)) throw new Error("Key is locked in this block: " + e);
            this.trsLogs.push(["Lock", e]),
            this.lockCache.add(e)
        }
    },
    {
        key: "undoLock",
        value: function(e) {
            this.lockCache.delete(e)
        }
    },
    {
        key: "create",
        value: function(e, r) {
            this.trsLogs.push(["Create", e, r]);
            var t = this.indexes.get(e),
            o = this.indexSchema.get(e);
            if (t && o) {
                var n = {};
                for (var a in r) - 1 !== o.fields.indexOf(a) && (n[a] = r[a]);
                o.indexes.forEach(function(e) {
                    var o = fromIndexSchemaToToken(e, r);
                    if (t.get(o)) throw Error("Ununique index not supported: " + o);
                    t.set(o, n)
                })
            }
        }
    },
    {
        key: "undoCreate",
        value: function(e, r) {
            var t = this.indexes.get(e),
            o = this.indexSchema.get(e);
            if (t && o) for (var n in r) o.indexes.forEach(function(e) {
                var o = fromIndexSchemaToToken(e, r);
                t.delete(o)
            })
        }
    },
    {
        key: "buildCreate",
        value: function(e, r) {
            escapeSingleQuote(r);
            var t = fromModelToTable(e);
            return jsonSql.build({
                type: "insert",
                table: t,
                values: r
            })
        }
    },
    {
        key: "rollbackCreate",
        value: function(e, r) {
            var t = fromModelToTable(e),
            o = this.app.model[e].getPrimaryKey();
            if (!o) throw new Error("Primary key not found for model: " + e);
            var n = r[o];
            if (void 0 === n) throw new Error("Primary value not found for model: " + e);
            return jsonSql.build({
                type: "remove",
                table: t,
                condition: {
                    primaryKey: n
                }
            })
        }
    },
    {
        key: "replace",
        value: function(e, r) {
            this.trsLogs.push(["Replace", e, r]);
            var t = this.indexes.get(e),
            o = this.indexSchema.get(e);
            if (t && o) {
                var n = {};
                for (var a in r) - 1 !== o.fields.indexOf(a) && (n[a] = r[a]);
                if (o.indexes.length > 1) throw new Error("Model have more than one index");
                var i = fromIndexSchemaToToken(o.indexes[0], r),
                s = t.get(i);
                s && this.trsLogs[this.trsLogs.length - 1].push(s),
                t.set(i, r)
            }
        }
    },
    {
        key: "undoReplace",
        value: function(e, r, t) {
            var o = this.indexes.get(e),
            n = this.indexSchema.get(e);
            if (o && n) {
                var a = fromIndexSchemaToToken(n.indexes[0], r);
                t ? o.set(a, t) : o.delete(a)
            }
        }
    },
    {
        key: "buildReplace",
        value: function(e, r) {
            escapeSingleQuote(r);
            var t = fromModelToTable(e);
            return jsonSql.build({
                type: "insert",
                or: "replace",
                table: t,
                values: r
            })
        }
    },
    {
        key: "rollbackReplace",
        value: function(e, r, t) {
            var o = fromModelToTable(e),
            n = this.app.model[e].getPrimaryKey();
            if (!n) throw new Error("Primary key not found for model: " + e);
            var a = r[n];
            if (void 0 === a) throw new Error("Primary value not found for model: " + e);
            return t ? jsonSql.build({
                type: "update",
                table: o,
                condition: {
                    primaryKey: a
                },
                modifier: t
            }) : jsonSql.build({
                type: "remove",
                table: o,
                condition: {
                    primaryKey: a
                }
            })
        }
    },
    {
        key: "update",
        value: function(e, r, t) {
            if (!e || !r || !t) throw new Error("Invalid params");
            var o = deconstruct(r);
            this.trsLogs.push(["Update", e, r, t]);
            var n = this.indexes.get(e);
            if (n) {
                var a = fromMapToToken(t),
                i = n.get(a);
                i && (this.trsLogs[this.trsLogs.length - 1].push(i[o[0]]), i[o[0]] = o[1])
            }
        }
    },
    {
        key: "undoUpdate",
        value: function(e, r, t, o) {
            var n = this.indexes.get(e);
            if (n) {
                var a = deconstruct(r),
                i = fromMapToToken(t),
                s = n.get(i);
                if (s) {
                    if (!o) throw new Error("Old value should exists");
                    s[a[0]] = o
                }
            }
        }
    },
    {
        key: "buildUpdate",
        value: function(e, r, t) {
            escapeSingleQuote(r);
            var o = fromModelToTable(e);
            return jsonSql.build({
                type: "update",
                table: o,
                modifier: r,
                condition: t
            })
        }
    },
    {
        key: "rollbackUpdate",
        value: function(e, r, t) {
            var o = fromModelToTable(e),
            n = this.app.model[e].getPrimaryKey();
            if (!n) throw new Error("Primary key not found for model: " + e);
            var a = r[n];
            if (void 0 === a) throw new Error("Primary value not found for model: " + e);
            return jsonSql.build({
                type: "update",
                table: o,
                condition: {
                    primaryKey: a
                },
                modifier: t
            })
        }
    },
    {
        key: "increment",
        value: function(e, r, t) {
            if (!e || !r || !t) throw new Error("Invalid params");
            this.trsLogs.push(["Increment", e, r, t]);
            var o = this.indexes.get(e);
            if (o) {
                var n = fromMapToToken(t),
                a = o.get(n);
                if (a) for (var i in r) a[i] += r[i]
            }
        }
    },
    {
        key: "undoIncrement",
        value: function(e, r, t) {
            var o = this.indexes.get(e);
            if (o) {
                var n = fromMapToToken(t),
                a = o.get(n);
                if (a) for (var i in r) a[i] -= r[i]
            }
        }
    },
    {
        key: "buildIncrement",
        value: function(e, r, t) {
            var o = fromModelToTable(e);
            return jsonSql.build({
                type: "update",
                table: o,
                modifier: {
                    $inc: r
                },
                condition: t
            })
        }
    },
    {
        key: "rollbackIncrement",
        value: function(e, r, t) {
            var o = fromModelToTable(e);
            return jsonSql.build({
                type: "update",
                table: o,
                modifier: {
                    $dec: r
                },
                condition: t
            })
        }
    },
    {
        key: "del",
        value: function(e, r) {
            if (!e || !r) throw new Error("Invalid params");
            var t = deconstruct(r);
            this.trsLogs.push(["Del", e, r]);
            var o = this.indexes.get(e);
            if (o) {
                var n = t.join(":"),
                a = o.get(n);
                if (a) {
                    this.trsLogs[this.trsLogs.length - 1].push(a);
                    var i = this.indexSchema.get(e);
                    for (var s in a) - 1 != i.indexes.indexOf(s) && (n = s + ":" + a[s], o.delete(n))
                }
            }
        }
    },
    {
        key: "undoDel",
        value: function(e, r, t) {
            deconstruct(r);
            var o = this.indexes.get(e);
            o && this.indexSchema.get(e).indexes.forEach(function(e) {
                var r = e + ":" + t[e];
                if (o.get(r)) throw Error("Index should have been deleted");
                o.set(r, t)
            })
        }
    },
    {
        key: "buildDel",
        value: function(e, r) {
            var t = fromModelToTable(e);
            return jsonSql.build({
                type: "update",
                table: t,
                condition: r,
                modifier: {
                    _deleted_: 1
                }
            })
        }
    },
    {
        key: "rollbackDel",
        value: function(e, r) {
            var t = fromModelToTable(e);
            return jsonSql.build({
                type: "update",
                table: t,
                condition: r,
                modifier: {
                    _deleted_: 0
                }
            })
        }
    }]),
    e
} ();
module.exports = SmartDB;