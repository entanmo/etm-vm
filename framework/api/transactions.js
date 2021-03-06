"use strict";
var self = null,
library = null,
modules = null;
function Transactions(n, s) {
    library = s,
    n(null, self = this)
}
Transactions.prototype.getTransactions = function(n, s) {
    var e = {
        call: "transactions#getTransactions",
        args: {
            blockId: n.blockId,
            limit: n.limit,
            type: n.type,
            orderBy: n.orderBy,
            offset: n.offset,
            senderPublicKey: n.senderPublicKey,
            senderId: n.senderId,
            recipientId: n.recipientId,
            senderUsername: n.senderUsername,
            recipientUsername: n.recipientUsername
        }
    };
    library.sandbox.sendMessage(e, s)
},
Transactions.prototype.getTransaction = function(n, s) {
    var e = {
        call: "transactions#getTransaction",
        args: {
            id: n
        }
    };
    library.sandbox.sendMessage(e, s)
},
Transactions.prototype.getUnconfirmedTransaction = function(n, s) {
    var e = {
        call: "transactions#getUnconfirmedTransaction",
        args: {
            id: n
        }
    };
    library.sandbox.sendMessage(e, s)
},
Transactions.prototype.getUnconfirmedTransactions = function(n) {
    library.sandbox.sendMessage({
        call: "transactions#getUnconfirmedTransactions",
        args: {}
    },
    n)
},
Transactions.prototype.addTransactions = function(n, s, e, a, r, t) {
    var i = {
        call: "transactions#addTransactions",
        args: {
            secret: n,
            amount: s,
            recipientId: e,
            publicKey: a,
            secondSecret: r,
            requesterPublicKey: t
        }
    };
    library.sandbox.sendMessage(i, cb)
},
Transactions.prototype.onBind = function(n) {
    modules = n
},
module.exports = Transactions;