"use strict";
var self = null,
library = null,
modules = null;
function Peer(e, r) {
    library = r,
    e(null, self = this)
}
Peer.prototype.getPeers = function(e, r) {
    var s = {
        call: "peer#getPeers",
        args: {
            state: e.state,
            os: e.os,
            version: e.version,
            limit: e.limit,
            shared: e.shared,
            orderBy: e.orderBy,
            offset: e.offset,
            port: e.port
        }
    };
    library.sandbox.sendMessage(s, r)
},
Peer.prototype.getPeer = function(e, r, s) {
    var o = {
        call: "peer#getPeer",
        args: {
            ip_str: e,
            port: r
        }
    };
    library.sandbox.sendMessage(o, s)
},
Peer.prototype.version = function(e) {
    library.sandbox.sendMessage({
        call: "peer#version",
        args: {}
    },
    e)
},
Peer.prototype.onBind = function(e) {
    modules = e
},
module.exports = Peer;