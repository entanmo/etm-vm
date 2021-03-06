"use strict";
module.exports = {
    table: "transactions",
    tableFields: [{
        name: "id",
        type: "String",
        length: 64,
        not_null: !0,
        unique: !0,
        primary_key: !0
    },
    {
        name: "timestamp",
        type: "BigInt",
        not_null: !0,
        index: !0
    },
    {
        name: "senderId",
        type: "String",
        length: 50,
        not_null: !0,
        index: !0
    },
    {
        name: "senderPublicKey",
        type: "String",
        length: 64,
        not_null: !0
    },
    {
        name: "fee",
        type: "String",
        length: 50,
        not_null: !0
    },
    {
        name: "signature",
        type: "String",
        length: 128,
        not_null: !0
    },
    {
        name: "type",
        type: "Number",
        not_null: !0,
        index: !0
    },
    {
        name: "args",
        type: "Text"
    },
    {
        name: "height",
        type: "BigInt",
        not_null: !0,
        index: !0
    }]
};