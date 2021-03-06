"use strict";
var self = null,
    library = null,
    modules = null;
function Dapps(a, s) {
    library = s,
        a(null, self = this)
}

Dapps.prototype.notification = function (notification, cb) {
    library.sandbox.sendMessage({
        call: "dapps#notification",
        args: notification || {}
    }, cb);
}

Dapps.prototype.getGenesis = function (a) {
    library.sandbox.sendMessage({
        call: "dapps#getGenesis",
        args: {}
    },
        a)
},
    Dapps.prototype.sendWithdrawal = function (a, s) {
        var e = {
            call: "dapps#sendWithdrawal",
            args: a
        };
        library.sandbox.sendMessage(e, s)
    },
    Dapps.prototype.getCommonBlock = function (a) {
        library.sandbox.sendMessage({
            call: "dapps#getCommonBlock",
            args: {}
        },
            a)
    },
    Dapps.prototype.setReady = function (a) {
        library.sandbox.sendMessage({
            call: "dapps#setReady",
            args: {}
        },
            a)
    },
    Dapps.prototype.getWithdrawalLastTransaction = function (a) {
        library.sandbox.sendMessage({
            call: "dapps#getWithdrawalLastTransaction",
            args: {}
        },
            a)
    },
    Dapps.prototype.getBalanceTransactions = function (a, s) {
        var e = {
            call: "dapps#getBalanceTransactions",
            args: {
                lastTransactionId: a
            }
        };
        library.sandbox.sendMessage(e, s)
    },
    Dapps.prototype.getDApp = function (a) {
        library.sandbox.sendMessage({
            call: "dapps#getDApp"
        },
            a)
    },
    Dapps.prototype.submitOutTransfer = function (a, s) {
        var e = {
            call: "dapps#submitOutTransfer",
            args: a
        };
        library.sandbox.sendMessage(e, s)
    },
    Dapps.prototype.registerInterface = function (a, s) {
        var e = {
            call: "dapps#registerInterface",
            args: {
                method: a.method,
                path: a.path
            }
        };
        library.sandbox.sendMessage(e, s)
    },
    Dapps.prototype.onBind = function (a) {
        modules = a
    },
    module.exports = Dapps;