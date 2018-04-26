"use strict";
var ed = require("../helpers/ed.js"),
crypto = require("crypto"),
bignum = require("bignumber"),
self = null,
library = null,
modules = null;
function Crypto(e, t) {
    library = t,
    e(null, self = this)
}
Crypto.prototype.keypair = function(e) {
    var t = crypto.createHash("sha256").update(e, "utf8").digest();
    return ed.MakeKeypair(t)
},
Crypto.prototype.sign = function(e, t) {
    var r = crypto.createHash("sha256").update(t).digest();
    return ed.Sign(r, e).toString("hex")
},
Crypto.prototype.verify = function(e, t, r) {
    var o = crypto.createHash("sha256").update(r).digest(),
    p = new Buffer(t, "hex"),
    n = new Buffer(e, "hex");
    return ed.Verify(o, p, n)
},
Crypto.prototype.getId = function(e) {
    return crypto.createHash("sha256").update(e).digest().toString("hex")
},
Crypto.prototype.getHash = function(e, t) {
    return crypto.createHash(e).update(t).digest()
},
Crypto.prototype.onBind = function(e) {
    modules = e
},
module.exports = Crypto;