"use strict";
var self = null,
library = null,
modules = null;
function Transport(r, e) {
    library = e,
    r(null, self = this)
}
Transport.prototype.message = function(r, e, t) {
    e = {
        call: "transport#message",
        args: {
            message: e,
            topic: r
        }
    };
    t || (t = function() {}),
    library.sandbox.sendMessage(e, t)
},
Transport.prototype.getRandomPeer = function(r, e, t, s) {
    var o = {
        call: "transport#request",
        args: {
            method: r,
            path: e,
            query: t
        }
    };
    library.sandbox.sendMessage(o, s)
},
Transport.prototype.getPeer = function(r, e, t, s, o) {
    var a = {
        call: "transport#request",
        args: {
            peer: {
                ip: r.ip,
                port: r.port
            },
            method: e,
            path: t,
            query: s
        }
    };
    library.sandbox.sendMessage(a, o)
},
Transport.prototype.onBind = function(r) {
    modules = r
},
module.exports = Transport;