"use strict";
var bignum = require("bignumber"),
ByteBuffer = require("bytebuffer"),
private_ = {},
self = null,
library = null,
modules = null;
function Block(e, t) {
    library = t,
    e(null, self = this)
}
private_.types = {},
Block.prototype.getBytes = function(e, t) {
    var r = new ByteBuffer(1, !0);
    r.writeString(e.prevBlockId || "0"),
    r.writeLong(e.height),
    r.writeInt(e.timestamp),
    r.writeInt(e.payloadLength);
    for (var i = new Buffer(e.payloadHash, "hex"), o = 0; o < i.length; o++) r.writeByte(i[o]);
    var a = new Buffer(e.delegate, "hex");
    for (o = 0; o < a.length; o++) r.writeByte(a[o]);
    if (r.writeString(e.pointId || "0"), r.writeLong(e.pointHeight || 0), r.writeInt(e.count), !t && e.signature) for (a = new Buffer(e.signature, "hex"), o = 0; o < a.length; o++) r.writeByte(a[o]);
    return r.flip(),
    r.toBuffer()
},
Block.prototype.verifyId = function(e) {
    var t = self.getBytes(e);
    return e.id === modules.api.crypto.getId(t)
},
Block.prototype.verifySignature = function(e) {
    var t = self.getBytes(e, !0);
    return !! modules.api.crypto.verify(e.delegate, e.signature, t)
},
Block.prototype.save = function(e, t) {
    modules.api.sql.insert({
        table: "blocks",
        values: {
            id: e.id,
            timestamp: e.timestamp,
            height: e.height,
            payloadLength: e.payloadLength,
            payloadHash: e.payloadHash,
            prevBlockId: e.prevBlockId,
            pointId: e.pointId,
            pointHeight: e.pointHeight,
            delegate: e.delegate,
            signature: e.signature,
            count: e.count
        }
    },
    t)
},
Block.prototype.normalize = function(e) {
    for (var t in e) null !== e[t] && void 0 !== e[t] || delete e[t];
    if (!library.validator.validate(e, {
        type: "object",
        properties: {
            id: {
                type: "string"
            },
            timestamp: {
                type: "integer"
            },
            payloadLength: {
                type: "integer"
            },
            payloadHash: {
                type: "string",
                format: "hex"
            },
            prevBlockId: {
                type: "string"
            },
            pointId: {
                type: "string"
            },
            pointHeight: {
                type: "integer"
            },
            delegate: {
                type: "string",
                format: "publicKey"
            },
            signature: {
                type: "string",
                format: "signature"
            },
            count: {
                type: "integer"
            }
        },
        required: ["id", "timestamp", "payloadLength", "payloadHash", "delegate", "signature", "count"]
    })) throw new Error(library.validator.getLastError().details[0].message)
},
Block.prototype.dbRead = function(e) {
    return {
        id: e.b_id,
        height: e.b_height,
        timestamp: e.b_timestamp,
        payloadLength: e.b_payloadLength,
        payloadHash: e.b_payloadHash,
        prevBlockId: e.b_prevBlockId,
        pointId: e.b_pointId,
        pointHeight: e.b_pointHeight,
        delegate: e.b_delegate,
        signature: e.b_signature,
        count: e.b_count
    }
},
Block.prototype.onBind = function(e) {
    modules = e
},
module.exports = Block;