"use strict";
var private_ = {},
self = null,
library = null,
modules = null;
function Background(n, o) {
    library = o,
    n(null, self = this)
}
Background.prototype.onBind = function(n) {
    modules = n
},
Background.prototype.onMessage = function(n) {},
module.exports = Background;