"use strict";
var self = null,
library = null,
modules = null;
function Loader(o, s) {
    library = s,
    o(null, self = this)
}
Loader.prototype.status = function(o) {
    library.sandbox.sendMessage({
        call: "loader#status",
        args: {}
    },
    o)
},
Loader.prototype.sync = function(o) {
    library.sandbox.sendMessage({
        call: "loader#sync",
        args: {}
    },
    o)
},
Loader.prototype.onBind = function(o) {
    modules = o
},
module.exports = Loader;