"use strict";
var self = null,
library = null,
modules = null;
function Multisignatures(s, e) {
    library = e,
    s(null, self = this)
}
Multisignatures.prototype.pending = function(s, e, i) {
    var t = {
        call: "multisignatures#pending",
        args: {
            publicKey: s,
            isOutTransfer: e
        }
    };
    library.sandbox.sendMessage(t, i)
},
Multisignatures.prototype.sign = function(s, e, i, t) {
    var n = {
        call: "multisignatures#sign",
        args: {
            secret: s,
            publicKey: e,
            transactionId: i
        }
    };
    library.sandbox.sendMessage(n, t)
},
Multisignatures.prototype.addMultisignature = function(s, e, i, t, n, r, u) {
    var l = {
        call: "multisignatures#addMultisignature",
        args: {
            secret: s,
            publicKey: e,
            secondSecret: i,
            min: t,
            lifetime: n,
            keysgroup: r
        }
    };
    library.sandbox.sendMessage(l, u)
},
Multisignatures.prototype.onBind = function(s) {
    modules = s
},
module.exports = Multisignatures;