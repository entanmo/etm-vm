"use strict";
module.exports = {
    table: "round_fees",
    tableFields: [{
        name: "round",
        type: "Number",
        not_null: !0,
        index: !0
    },
    {
        name: "currency",
        type: "String",
        length: 30,
        not_null: !0
    },
    {
        name: "amount",
        type: "String",
        length: 50,
        not_null: !0
    }]
};