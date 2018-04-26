"use strict";
var self = null,
library = null,
modules = null;
function Accounts(e, s) {
    library = s,
    e(null, self = this)
}
Accounts.prototype.open = function(e, s) {
    var a = {
        call: "accounts#open",
        args: {
            secret: e
        }
    };
    library.sandbox.sendMessage(a, s)
},
Accounts.prototype.getBalance = function(e, s) {
    var a = {
        call: "accounts#getBalance",
        args: {
            address: e
        }
    };
    library.sandbox.sendMessage(a, s)
},
Accounts.prototype.getPublickey = function(e, s) {
    var a = {
        call: "accounts#getPublickey",
        args: {
            address: e
        }
    };
    library.sandbox.sendMessage(a, s)
},
Accounts.prototype.generatePublickey = function(e, s) {
    var a = {
        call: "accounts#generatePublickey",
        args: {
            secret: e
        }
    };
    library.sandbox.sendMessage(a, s)
},
Accounts.prototype.getDelegates = function(e, s) {
    var a = {
        call: "accounts#getDelegates",
        args: {
            address: e
        }
    };
    library.sandbox.sendMessage(a, s)
},
Accounts.prototype.getDelegatesFee = function(e) {
    library.sandbox.sendMessage({
        call: "accounts#getDelegatesFee",
        args: {}
    },
    e)
},
Accounts.prototype.addDelegates = function(e, s, a, c) {
    var t = {
        call: "accounts#addDelegates",
        args: {
            secret: e,
            publicKey: s,
            secondSecret: a
        }
    };
    library.sandbox.sendMessage(t, c)
},
Accounts.prototype.getUsernameFee = function(e) {
    library.sandbox.sendMessage({
        call: "accounts#getUsernameFee",
        args: {}
    },
    e)
},
Accounts.prototype.addUsername = function(e, s, a, c, t) {
    var n = {
        call: "accounts#addUsername",
        args: {
            secret: e,
            publicKey: s,
            secondSecret: a,
            username: c
        }
    };
    library.sandbox.sendMessage(n, t)
},
Accounts.prototype.getAccount = function(e, s) {
    var a = {
        call: "accounts#getAccount",
        args: {
            address: e
        }
    };
    library.sandbox.sendMessage(a, s)
},
Accounts.prototype.onBind = function(e) {
    modules = e
},
module.exports = Accounts;