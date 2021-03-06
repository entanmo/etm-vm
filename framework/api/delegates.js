"use strict";
var self = null,
library = null,
modules = null;
function Delegates(e, t) {
    library = t,
    e(null, self = this)
}
Delegates.prototype.getDelegate = function(e, t) {
    var a = {
        call: "delegates#getDelegate",
        args: {
            transactionId: e.transactionId,
            publicKey: e.publicKey,
            username: e.username
        }
    };
    library.sandbox.sendMessage(a, t)
},
Delegates.prototype.getDelegates = function(e, t) {
    var a = {
        call: "delegates#getDelegates",
        args: {
            limit: e.limit,
            offset: e.offset,
            orderBy: e.orderBy
        }
    };
    library.sandbox.sendMessage(a, t)
},
Delegates.prototype.getFee = function(e) {
    library.sandbox.sendMessage({
        call: "delegates#getFee",
        args: {}
    },
    e)
},
Delegates.prototype.getForgedByAccount = function(e, t) {
    var a = {
        call: "delegates#getForgedByAccount",
        args: {
            generatorPublicKey: e
        }
    };
    library.sandbox.sendMessage(a, t)
},
Delegates.prototype.addDelegate = function(e, t, a, s, l) {
    var r = {
        call: "delegates#addDelegate",
        args: {
            secret: e,
            publicKey: t,
            secondSecret: a,
            username: s
        }
    };
    library.sandbox.sendMessage(r, l)
},
Delegates.prototype.onBind = function(e) {
    modules = e
},
module.exports = Delegates;