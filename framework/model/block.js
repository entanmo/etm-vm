"use strict";
module.exports = {
    table: "blocks",
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
        not_null: !0
    },
    {
        name: "height",
        type: "BigInt",
        not_null: !0,
        index: !0
    },
    {
        name: "payloadLength",
        type: "BigInt",
        not_null: !0
    },
    {
        name: "payloadHash",
        type: "String",
        length: 64,
        not_null: !0
    },
    {
        name: "prevBlockId",
        type: "String",
        length: 64
    },
    {
        name: "pointId",
        type: "String",
        length: 64
    },
    {
        name: "pointHeight",
        type: "BigInt"
    },
    {
        name: "delegate",
        type: "String",
        length: 64,
        not_null: !0,
        index: !0
    },
    {
        name: "signature",
        type: "String",
        length: 128,
        not_null: !0
    },
    {
        name: "count",
        type: "BigInt",
        not_null: !0
    }]
};