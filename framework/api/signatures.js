"use strict";
var self = null,
library = null,
modules = null;
function Signatures(e, s) {
    library = s,
    e(null, self = this)
}
Signatures.prototype.getFee = function(e) {
    library.sandbox.sendMessage({
        call: "signatures#getFee",
        args: {}
    },
    e)
},
Signatures.prototype.addSignature = function(e, s, n, r) {
    var t = {
        call: "signatures#addSignature",
        args: {
            secret: e,
            secondSecret: s,
            publicKey: n
        }
    };
    library.sandbox.sendMessage(t, r)
},
Signatures.prototype.onBind = function(e) {
    modules = e
},
module.exports = Signatures;