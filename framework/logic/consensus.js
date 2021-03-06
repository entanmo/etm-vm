"use strict";
var _setImmediate2 = require("babel-runtime/core-js/set-immediate"),
_setImmediate3 = _interopRequireDefault(_setImmediate2);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var assert = require("assert"),
crypto = require("crypto"),
ByteBuffer = require("bytebuffer"),
ip = require("ip"),
bignum = require("bignumber"),
ed = require("../helpers/ed.js"),
slots = require("../helpers/slots.js"),
library = null;
function Consensus(e, t) {
    library = t,
    this.pendingBlock = null,
    this.pendingVotes = null,
    this.votesKeySet = {},
    e && (0, _setImmediate3.
default)(e, null, this)
}
Consensus.prototype.createVotes = function(e, t) {
    var r = this.getVoteHash(t.height, t.id),
    s = {
        height: t.height,
        id: t.id,
        signatures: []
    };
    return e.forEach(function(e) {
        s.signatures.push({
            key: e.publicKey.toString("hex"),
            sig: ed.Sign(r, e).toString("hex")
        })
    }),
    s
},
Consensus.prototype.verifyVote = function(e, t, r) {
    try {
        var s = this.getVoteHash(e, t),
        n = new Buffer(r.sig, "hex"),
        i = new Buffer(r.key, "hex");
        return ed.Verify(s, n, i)
    } catch(e) {
        return ! 1
    }
},
Consensus.prototype.getVoteHash = function(e, t) {
    var r = new ByteBuffer;
    return r.writeLong(e),
    r.writeString(t),
    r.flip(),
    crypto.createHash("sha256").update(r.toBuffer()).digest()
},
Consensus.prototype.hasEnoughVotes = function(e) {
    return e && e.signatures && e.signatures.length > 2 * slots.delegates / 3
},
Consensus.prototype.hasEnoughVotesRemote = function(e) {
    var t = Math.min(6, 2 * slots.delegates / 3);
    return e && e.signatures && e.signatures.length >= t
},
Consensus.prototype.getPendingBlock = function() {
    return this.pendingBlock
},
Consensus.prototype.hasPendingBlock = function(e) {
    return !! this.pendingBlock && slots.getSlotNumber(this.pendingBlock.timestamp) == slots.getSlotNumber(e)
},
Consensus.prototype.setPendingBlock = function(e) {
    this.pendingVotes = null,
    this.votesKeySet = {},
    this.pendingBlock = e
},
Consensus.prototype.clearState = function() {
    this.pendingVotes = null,
    this.votesKeySet = {},
    this.pendingBlock = null
},
Consensus.prototype.addPendingVotes = function(e) {
    if (!this.pendingBlock || this.pendingBlock.height != e.height || this.pendingBlock.id != e.id) return this.pendingVotes;
    for (var t = 0; t < e.signatures.length; ++t) {
        var r = e.signatures[t];
        this.votesKeySet[r.key] || this.verifyVote(e.height, e.id, r) && (this.votesKeySet[r.key] = !0, this.pendingVotes || (this.pendingVotes = {
            height: e.height,
            id: e.id,
            signatures: []
        }), this.pendingVotes.signatures.push(r))
    }
    return this.pendingVotes
},
Consensus.prototype.createPropose = function(e, t, r) {
    assert(e.publicKey.toString("hex") == t.delegate);
    var s = {
        height: t.height,
        id: t.id,
        timestamp: t.timestamp,
        generatorPublicKey: t.delegate,
        address: r
    },
    n = this.getProposeHash(s);
    return s.hash = n.toString("hex"),
    s.signature = ed.Sign(n, e).toString("hex"),
    s
},
Consensus.prototype.getProposeHash = function(e) {
    var t = new ByteBuffer;
    t.writeLong(e.height),
    t.writeString(e.id);
    for (var r = new Buffer(e.generatorPublicKey, "hex"), s = 0; s < r.length; s++) t.writeByte(r[s]);
    t.writeInt(e.timestamp);
    var n = e.address.split(":");
    return assert(2 == n.length),
    t.writeInt(ip.toLong(n[0])),
    t.writeInt(Number(n[1])),
    t.flip(),
    crypto.createHash("sha256").update(t.toBuffer()).digest()
},
Consensus.prototype.normalizeVotes = function(e) {
    if (!library.validator.validate(e, {
        type: "object",
        properties: {
            height: {
                type: "integer"
            },
            id: {
                type: "string"
            },
            signatures: {
                type: "array",
                minLength: 1,
                maxLength: 101
            }
        },
        required: ["height", "id", "signatures"]
    })) throw Error(library.validator.getLastError());
    return e
},
Consensus.prototype.acceptPropose = function(e) {
    var t = this.getProposeHash(e);
    if (e.hash != t.toString("hex")) return app.logger.warn("Propose hash is not correct"),
    !1;
    try {
        var r = new Buffer(e.signature, "hex"),
        s = new Buffer(e.generatorPublicKey, "hex");
        return !! ed.Verify(t, r, s) || (app.logger.warn("Invalid propose signature", e), !1)
    } catch(e) {
        return app.logger.debug("Verify signature exception: ", e),
        !1
    }
},
module.exports = Consensus;