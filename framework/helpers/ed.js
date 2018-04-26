"use strict";
var sodium = require("sodium").api;
module.exports = {
    MakeKeypair: function(e) {
        var r = sodium.crypto_sign_seed_keypair(e);
        return {
            publicKey: r.publicKey,
            privateKey: r.secretKey
        }
    },
    Sign: function(e, r) {
        return sodium.crypto_sign_detached(e, Buffer.from(r.privateKey, "hex"))
    },
    Verify: function(e, r, i) {
        return sodium.crypto_sign_verify_detached(r, e, i)
    }
};