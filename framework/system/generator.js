"use strict";
var _stringify = require("babel-runtime/core-js/json/stringify"),
_stringify2 = _interopRequireDefault(_stringify);
function _interopRequireDefault(e) {
    return e && e.__esModule ? e: {
    default:
        e
    }
}
var private_ = {},
self = null,
library = null,
modules = null;
function Generator(e, r) {
    library = r,
    e(null, self = this)
}
Generator.prototype.onBind = function(e) { (modules = e).api.dapps.getGenesis(function(e, r) {
        if (e) return app.logger.error("Failed to get genesis block", e);
        var t = modules.blockchain.accounts.getExecutor();
        if (!t) return app.logger.warn("Secret is null");
        r.authorId,
        t.address;
        var i = {
            delegate: t.keypair.publicKey,
            height: 1,
            pointId: r.pointId,
            pointHeight: r.pointHeight,
            count: 0,
            transactions: []
        },
        n = modules.logic.block.getBytes(i);
        i.id = modules.api.crypto.getId(n),
        i.signature = modules.api.crypto.sign(t.keypair, n),
        app.logger.debug((0, _stringify2.
    default)(i, null, 2))
    })
},
module.exports = Generator;