"use strict";
function Contacts(t, n) {
    library = n,
    t(null, self = this)
}
var self = null,
library = null,
modules = null;
Contacts.prototype.getContacts = function(t, n) {
    var o = {
        call: "contacts#getContacts",
        args: {
            publicKey: t
        }
    };
    library.sandbox.sendMessage(o, n)
},
Contacts.prototype.addContact = function(t, n, o, a, s) {
    var e = {
        call: "contacts#addContact",
        args: {
            secret: t,
            publicKey: n,
            secondSecret: o,
            following: a
        }
    };
    library.sandbox.sendMessage(e, s)
},
Contacts.prototype.getFee = function(t) {
    var n = {
        call: "contacts#getFee",
        args: {}
    };
    library.sandbox.sendMessage(n, t)
},
Contacts.prototype.onBind = function(t) {
    modules = t
},
module.exports = Contacts;