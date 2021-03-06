"use strict";
var _regenerator = require("babel-runtime/regenerator"),
_regenerator2 = _interopRequireDefault(_regenerator),
_asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator"),
_asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2),
_keys = require("babel-runtime/core-js/object/keys"),
_keys2 = _interopRequireDefault(_keys);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var async = require("async"),
path = require("path"),
ZSchema = require("z-schema"),
extend = require("extend"),
changeCase = require("change-case"),
modules = {},
ready = !1;
module.exports = function(e, r) {
    async.auto({
        sandbox: function(r) {
            r(null, e.sandbox)
        },
        validator: function(e) {
            ZSchema.registerFormat("publicKey",
            function(e) {
                try {
                    return 32 == new Buffer(e, "hex").length
                } catch(e) {
                    return ! 1
                }
            }),
            ZSchema.registerFormat("signature",
            function(e) {
                try {
                    return 64 == new Buffer(e, "hex").length
                } catch(e) {
                    return ! 1
                }
            }),
            ZSchema.registerFormat("hex",
            function(e) {
                try {
                    new Buffer(e, "hex")
                } catch(e) {
                    return ! 1
                }
                return ! 0
            }),
            ZSchema.prototype.getError = function() {
                var e = this.getLastErrors()[0];
                return e ? e.message + ": " + e.path: "unknow error"
            };
            var r = new ZSchema;
            e(null, r)
        },
        bus: function(e) {
            var r = function() {
                this.message = function() {
                    if (ready) {
                        var e = [];
                        Array.prototype.push.apply(e, arguments);
                        var r = e.shift(); (0, _keys2.
                    default)(modules).forEach(function(n) { (0, _keys2.
                        default)(modules[n]).forEach(function(a) {
                                var t = "on" + changeCase.pascalCase(r);
                                "function" == typeof modules[n][a][t] && modules[n][a][t].apply(modules[n][a][t], e)
                            })
                        })
                    }
                }
            };
            e(null, new r)
        },
        sequence: function(e) {
            var r = new(require("./helpers/sequence.js"))({
                name: "Main",
                onWarning: function(e, r) {
                    app.logger.warn("Main queue", e)
                }
            });
            e(null, r)
        },
        modules: ["sandbox", "bus", "sequence", "validator",
        function(r, e) {
            var n = require("./modules.full.json"),
            a = []; (0, _keys2.
        default)(n).forEach(function(e) {
                var t = e.split("/"),
                u = t[0],
                o = t[1];
                a.push(function(a) {
                    var t = new(require(n[e]))(a, r);
                    modules[u] = modules[u] || {},
                    modules[u][o] = t
                })
            }),
            async.series(a,
            function(r) {
                e(r, modules)
            })
        }],
        ready: ["modules", "bus",
        function(r, e) {
            ready = !0,
            (0, _asyncToGenerator3.
        default)(_regenerator2.
        default.mark(function e() {
                var r, n;
                return _regenerator2.
            default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return r = path.join(app.rootDir, "init.js"),
                        n = require(r),
                        e.prev = 2,
                        e.next = 5,
                        n();
                    case 5:
                        e.next = 11;
                        break;
                    case 7:
                        e.prev = 7,
                        e.t0 = e.
                        catch(2),
                        app.logger.error("Failed to initialize app: ", e.t0),
                        process.exit(3);
                    case 11:
                    case "end":
                        return e.stop()
                    }
                },
                e, this, [[2, 7]])
            }))(),
            r.bus.message("bind", r.modules),
            app.api = r.modules.api,
            e()
        }]
    },
    r)
};