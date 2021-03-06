"use strict";
function beginEpochTime() {
    return new Date(Date.UTC(2018, 9, 12, 12, 0, 0, 0))
}
function getEpochTime(e) {
    void 0 === e && (e = (new Date).getTime());
    var t = beginEpochTime().getTime();
    return Math.floor((e - t) / 1e3)
}
module.exports = {
    interval: 3,
    delegates: 1,
    getTime: function(e) {
        return getEpochTime(e)
    },
    getRealTime: function(e) {
        void 0 === e && (e = this.getTime());
        var t = beginEpochTime();
        return 1e3 * Math.floor(t.getTime() / 1e3) + 1e3 * e
    },
    getNow: function() {
        return getEpochTime((new Date).getTime())
    },
    getSlotNumber: function(e) {
        return void 0 === e && (e = this.getTime()),
        Math.floor(e / this.interval)
    },
    getSlotTime: function(e) {
        return e * this.interval
    },
    getNextSlot: function() {
        return this.getSlotNumber() + 1
    },
    getLastSlot: function(e) {
        return e + this.delegates
    },
    roundTime: function(e) {
        Math.floor(e.getTime() / 1e3)
    },
    round: function(e) {
        return Math.floor(e / this.delegates) + (e % this.delegates > 0 ? 1 : 0)
    },
    setDelegatesNumber: function(e) {
        this.delegates = e
    }
};
