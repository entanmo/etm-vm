"use strict";
module.exports = function(r) {
    for (var e = {},
    n = r.length,
    t = r.charAt(0), o = 0; o < r.length; o++) {
        var f = r.charAt(o);
        if (void 0 !== e[f]) throw new TypeError(f + " is ambiguous");
        e[f] = o
    }
    function a(r) {
        if (0 === r.length) return Buffer.allocUnsafe(0);
        for (var o = [0], f = 0; f < r.length; f++) {
            var a = e[r[f]];
            if (void 0 === a) return;
            for (var u = 0,
            h = a; u < o.length; ++u) h += o[u] * n,
            o[u] = 255 & h,
            h >>= 8;
            for (; h > 0;) o.push(255 & h),
            h >>= 8
        }
        for (var i = 0; r[i] === t && i < r.length - 1; ++i) o.push(0);
        return Buffer.from(o.reverse())
    }
    return {
        encode: function(e) {
            if (0 === e.length) return "";
            for (var t = [0], o = 0; o < e.length; ++o) {
                for (var f = 0,
                a = e[o]; f < t.length; ++f) a += t[f] << 8,
                t[f] = a % n,
                a = a / n | 0;
                for (; a > 0;) t.push(a % n),
                a = a / n | 0
            }
            for (var u = "",
            h = 0; 0 === e[h] && h < e.length - 1; ++h) u += r[0];
            for (var i = t.length - 1; i >= 0; --i) u += r[t[i]];
            return u
        },
        decodeUnsafe: a,
        decode: function(r) {
            var e = a(r);
            if (e) return e;
            throw new Error("Non-base" + n + " character")
        }
    }
};