"use strict";
var bignum = require("bignumber");
module.exports = {
    validate: function(t) {
        if ("string" != typeof t) return "Invalid amount type";
        if (!/^[1-9][0-9]*$/.test(t)) return "Amount should be integer";
        var n;
        try {
            n = bignum(t)
        } catch(t) {
            return "Failed to convert"
        }
        return n.lt(1) || n.gt("1e48") ? "Invalid amount range": null
    },
    calcRealAmount: function(t, n) {
        for (var r = bignum(t); n > 0;) r = n > 8 ? r.div(Math.pow(10, 8)) : r.div(Math.pow(10, n)),
        n -= 8;
        return r.toString()
    }
};