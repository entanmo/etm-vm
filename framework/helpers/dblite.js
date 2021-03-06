"use strict";
var _keys = require("babel-runtime/core-js/object/keys"),
_keys2 = _interopRequireDefault(_keys),
_setImmediate2 = require("babel-runtime/core-js/set-immediate"),
_setImmediate3 = _interopRequireDefault(_setImmediate2),
_stringify = require("babel-runtime/core-js/json/stringify"),
_stringify2 = _interopRequireDefault(_stringify),
_typeof2 = require("babel-runtime/helpers/typeof"),
_typeof3 = _interopRequireDefault(_typeof2);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var paramsIndex, paramsArray, paramsObject, EOL, EOL_LENGTH, SANITIZER, SANITIZER_REPLACER, sqlTest = "",
isArray = Array.isArray,
crypto = require("crypto"),
path = require("path"),
EventEmitter = require("events").EventEmitter,
WIN32 = "win32" === process.platform,
PATH_SEP = path.sep || (WIN32 ? "\\": "/"),
spawn = require("child_process").spawn,
DECIMAL = /^[1-9][0-9]*$/,
SELECT = /^(?:select|SELECT|pragma|PRAGMA) /,
REPLACE_QUESTIONMARKS = /\?/g,
REPLACE_PARAMS = /(?:\:|\@|\$)([a-zA-Z_0-9$]+)/g,
DOUBLE_DOUBLE_QUOTES = /""/g,
SINGLE_QUOTES = /'/g,
SINGLE_QUOTES_DOUBLED = "''",
HAS_PARAMS = /(?:\?|(?:(?:\:|\@|\$)[a-zA-Z_0-9$]+))/,
log = console.log.bind(console),
bin = ["sqlite3"],
IS_NODE_06 = !1,
_defineCSVEOL = function() {
    _defineCSVEOL = function() {};
    var e = dblite.sqliteVersion || process.env.SQLITE_VERSION;
    e = String(dblite.sqliteVersion || "").replace(/[^.\d]/g, "").split("."),
    EOL_LENGTH = (EOL = "\n").length,
    SANITIZER = new RegExp("[;" + EOL.split("").map(function(e) {
        return "\\x" + ("0" + e.charCodeAt(0).toString(16)).slice( - 2)
    }).join("") + "]+$"),
    SANITIZER_REPLACER = ";" + EOL,
    e.length || console.warn(["[WARNING] sqlite 3.8.6 changed CSV output", "please specify your sqlite version", 'via `dblite.sqliteVersion = "3.8.5";`', "or via SQLITE_VERSION=3.8.5"].join(EOL))
};
function dblite() {
    _defineCSVEOL();
    var e, r, t = "---" + crypto.randomBytes(64).toString("base64") + "---",
    n = '"' + t + '" AS "' + t + '";' + EOL,
    i = -(t.length + EOL_LENGTH),
    s = "",
    o = new EventEmitter,
    a = spawn(1 === bin.length ? bin[0] : "." + PATH_SEP + bin[bin.length - 1], normalizeFirstArgument(Array.prototype.slice.call(arguments)).concat("-csv").reverse(), {
        cwd: bin.slice(0, -1).join(PATH_SEP) || process.cwd(),
        env: process.env,
        encoding: "utf8",
        detached: !0,
        stdio: ["pipe", "pipe", "pipe"]
    }),
    l = [],
    c = !1,
    u = !1,
    f = !1,
    p = !1,
    E = !1,
    d = !1,
    S = 0,
    _ = !1;
    function g(e) {
        o.listeners("close").length ? o.emit("close", e) : log("bye bye")
    }
    function h() {
        l.length && o._query.apply(o, l.shift())
    }
    function y(t) {
        if (e && 1 < e.length) {
            var n = e;
            f = p = _ = !1,
            e = r = null,
            E = !0,
            n.call(o, new Error(t.toString()), null)
        } else o.listeners("error").length ? o.emit("error", "" + t) : console.error("" + t)
    }
    return t += EOL,
    a.stderr.on("data",
    function(e) {
        u = !1,
        y(e)
    }),
    a.stdin.on("error", y),
    a.stdout.on("error", y),
    a.stderr.on("error", y),
    a.stdout.on("data",
    function(n) {
        var a, l, c, g, y, A, L, O;
        if (E) return s = "",
        E = !1,
        void(o.ignoreErrors && (u = !1, h()));
        S += n.length,
        d && n.toString().slice(i) === t && (s = "", n = t, d = !1, console.log("out of memory test", S, sqlTest)),
        d && (n = ""),
        s.length + n.length >= 1e8 && (s = "", d = !0),
        (s += n.toString()).slice(i) === t && (S = 0, (y = (a = s.slice(0, i)).slice(i) === t) && (a = a.slice(0, i)), s = "", u = !1, f || p ? (A = f, L = _, f = p = _ = u, c = e, g = r, A && (l = L ? a: parseCSV(a), y && isArray(l) && l.length && (null == g ? g = l[0] : isArray(g) || l[0].forEach(enrichFields, g), l.shift())), e = r = null, h(), c && (O = !L && g ? isArray(g) ? l.map(row2object, g) : l.map(row2parsed, parseFields(g)) : l, 1 < c.length ? c.call(o, null, O) : c.call(o, O))) : (h(), a.length && (o.listeners("info").length ? o.emit("info", EOL + a) : log(EOL + a))))
    }),
    a.unref ? (a.on("close", g), a.unref()) : (IS_NODE_06 = !0, a.stdout.on("close", g)),
    o.ignoreErrors = !1,
    o.close = function() {
        c || (o.query(".exit"), c = !0)
    },
    o.lastRowID = function(e, r) {
        return o.query("SELECT ROWID FROM `" + e + "` ORDER BY ROWID DESC LIMIT 1",
        function(e) {
            var t, n = e[0];
            if (! (n instanceof Array)) for (t in n) if (n.hasOwnProperty(t)) {
                n = [n[t]];
                break
            } (r || log).call(o, n[0])
        }),
        o
    },
    o.plain = function(e) {
        if ("string" != typeof e) throw new Error("Argument #1 should be a string");
        return e = {
            query: e,
            dontParse: !0
        },
        o._query.apply(o, arguments)
    },
    o.query = function(e) {
        if ("string" != typeof e) throw new Error("Argument #1 should be a string");
        return e = {
            query: e,
            dontParse: !1
        },
        o._query.apply(o, arguments)
    },
    o._query = function(t, i, s, E) {
        if (c) return y("closing"),
        o;
        if (u) return l.push(arguments),
        o;
        "object" === (void 0 === t ? "undefined": (0, _typeof3.
    default)(t)) && (_ = t.dontParse, t = t.query);
        try {
            if (f = SELECT.test(t), sqlTest = "", f) {
                switch (sqlTest = t + " " + ("[object Object]" == Object.prototype.toString.call(i) ? (0, _stringify2.
            default)(i):
                ""), u = !0, arguments.length) {
                case 4:
                    e = E,
                    r = s,
                    t = replaceString(t, i);
                    break;
                case 3:
                    "function" == typeof s ? (e = s, s = null, HAS_PARAMS.test(t) ? (r = null, t = replaceString(t, i)) : r = i) : (e = log, r = s, t = replaceString(t, i));
                    break;
                case 2:
                    "function" == typeof i ? (r = null, e = i) : (e = log, HAS_PARAMS.test(t) ? (r = null, t = replaceString(t, i)) : r = i);
                    break;
                default:
                    e = log,
                    r = null
                }
                a.stdin.write(sanitize(t) + "SELECT " + n)
            } else {
                if (_) throw _ = !1,
                new Error("not a select");
                if ("." === t[0]) u = !0,
                a.stdin.write(t + EOL + "SELECT " + n);
                else switch (arguments.length) {
                case 1:
                case 2:
                    if ("function" != typeof i) {
                        a.stdin.write(sanitize(HAS_PARAMS.test(t) ? replaceString(t, i) : t)),
                        (0, _setImmediate3.
                    default)(h);
                        break
                    }
                    s = i,
                    i = null;
                case 3:
                    u = p = !0,
                    e = s,
                    a.stdin.write(sanitize(HAS_PARAMS.test(t) ? replaceString(t, i) : t) + EOL + "SELECT " + n)
                }
            }
        } catch(r) {
            u = !1,
            e && e(new Error("got exception: " + r.toString()))
        }
        return o
    },
    o.parseCSV = parseCSV,
    o.escape = escape,
    o.row2object = row2object,
    o.row2parsed = row2parsed,
    o.parseFields = parseFields,
    o
}
function enrichFields(e) {
    var r = this.hasOwnProperty(e),
    t = r && this[e];
    delete this[e],
    this[e] = r ? t: String
}
function normalizeFirstArgument(e) {
    return ":memory:" !== e[0] && (e[0] = path.resolve(e[0])),
    e
}
function parseCSV(e) {
    _defineCSVEOL();
    for (var r, t, n, i, s, o = [], a = [], l = 0, c = 0, u = e.length, f = 0; f < u; f++) {
        switch (e[f]) {
        case '"':
            t = !0,
            r = f;
            do {
                switch (e[r = (i = e.indexOf('"', r + 1)) + 1]) {
                case EOL[0]:
                    if (2 === EOL_LENGTH && e[r + 1] !== EOL[1]) break;
                case ",":
                    t = !1
                }
            } while ( t );
            s = e.slice(f + 1, i++).replace(DOUBLE_DOUBLE_QUOTES, '"');
            break;
        default:
            i = e.indexOf(",", f),
            n = e.indexOf(EOL, f),
            i < 0 && (i = u - EOL_LENGTH),
            s = e.slice(f, n < i ? i = n: i)
        }
        o[l++] = s,
        e[f = i] === EOL[0] && (1 === EOL_LENGTH || e[f + 1] === EOL[1] && ++f) && (a[c++] = o, o = [], l = 0)
    }
    return a
}
function parseFields(e) {
    for (var r, t = (0, _keys2.
default)(e), n = [], i = t.length, s = 0; s < i; s++) r = e[t[s]],
    n[s] = r === Boolean ? $Boolean: r === Date ? $Date: r || String;
    return {
        f: t,
        p: n
    }
}
function replaceString(e, r) {
    return isArray(r) ? (paramsIndex = 0, paramsArray = r, e = e.replace(REPLACE_QUESTIONMARKS, replaceQuestions)) : r && (paramsObject = r, e = e.replace(REPLACE_PARAMS, replaceParams)),
    paramsArray = paramsObject = null,
    e
}
function replaceParams(e, r) {
    return escape(paramsObject[r])
}
function replaceQuestions() {
    return escape(paramsArray[paramsIndex++])
}
function row2object(e) {
    for (var r = {},
    t = this.length,
    n = 0; n < t; n++) r[this[n]] = e[n];
    return r
}
function row2parsed(e) {
    for (var r = {},
    t = this.f,
    n = this.p,
    i = t.length,
    s = 0; s < i; s++) if (n[s] === Buffer) r[t[s]] = n[s](e[s], "hex");
    else if (n[s] === Array) r[t[s]] = e[s] ? e[s].split(",") : [];
    else if (n[s] === String) try {
        r[t[s]] = JSON.parse((0, _stringify2.
    default)(e[s] || ""))
    } catch(n) {
        r[t[s]] = e[s]
    } else r[t[s]] = n[s](e[s]);
    return r
}
function escape(e) {
    switch (_defineCSVEOL(), void 0 === e ? "undefined": (0, _typeof3.
default)(e)) {
    case "string":
        return "'" + e.replace(SINGLE_QUOTES, SINGLE_QUOTES_DOUBLED) + "'";
    case "object":
        return null == e ? "null": Buffer.isBuffer(e) ? "X'" + e.toString("hex") + "'": "'" + (0, _stringify2.
    default)(e).replace(SINGLE_QUOTES, SINGLE_QUOTES_DOUBLED) + "'";
    case "boolean":
        return e ? "1": "0";
    case "number":
        if (isFinite(e)) return "" + e
    }
    throw new Error("unsupported data " + e)
}
function sanitize(e) {
    return e.replace(SANITIZER, "") + SANITIZER_REPLACER
}
function $Boolean(e) {
    switch (e.toLowerCase()) {
    case "0":
    case "false":
    case "null":
    case "":
        return ! 1
    }
    return ! 0
}
function $Date(e) {
    return new Date(DECIMAL.test(e) ? parseInt(e, 10) : e)
}
Object.defineProperty(dblite, "bin", {
    get: function() {
        return bin.join(PATH_SEP)
    },
    set: function(e) {
        if ( - 1 < e.indexOf(PATH_SEP) && (e = path.resolve(e), !require(IS_NODE_06 ? "path": "fs").existsSync(e))) throw "invalid executable: " + e;
        bin = e.split(PATH_SEP)
    }
}),
dblite.withSQLite = function(e) {
    return dblite.sqliteVersion = e,
    dblite
},
module.exports = dblite;