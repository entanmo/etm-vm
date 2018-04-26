"use strict";
module.exports = {
    table: "balances",
    tableFields: [{
        name: "address",
        type: "String",
        length: 50,
        not_null: !0,
        index: !0
    },
    {
        name: "currency",
        type: "String",
        length: 30,
        not_null: !0,
        index: !0
    },
    {
        name: "balance",
        type: "String",
        length: 50,
        not_null: !0
    }]
};