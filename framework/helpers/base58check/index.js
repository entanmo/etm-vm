"use strict";
var assert = require("assert"),
crypto = require("crypto"),
base58 = require("./bs58.js");
function sha256x2(e) {
    var r = crypto.createHash("sha256").update(e).digest();
    return crypto.createHash("sha256").update(r).digest()
}
function encode(e) {
    var r = sha256x2(e);
    return base58.encode(Buffer.concat([e, r], e.length + 4))
}
function decodeRaw(e) {
    var r = e.slice(0, -4),
    c = e.slice( - 4),
    a = sha256x2(r);
    if (! (c[0] ^ a[0] | c[1] ^ a[1] | c[2] ^ a[2] | c[3] ^ a[3])) return r
}
function decodeUnsafe(e) {
    var r = base58.decodeUnsafe(e);
    if (r) return decodeRaw(r)
}
function decode(e) {
    var r = decodeRaw(base58.decode(e));
    if (!r) throw new Error("Invalid checksum");
    return r
}
module.exports = {
    encode: encode,
    decode: decode,
    decodeUnsafe: decodeUnsafe
};