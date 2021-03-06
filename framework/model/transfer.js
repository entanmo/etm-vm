"use strict";
module.exports = {
    table: "transfers",
    tableFields: [{
        name: "tid",
        type: "String",
        length: 64,
        not_null: !0,
        unique: !0,
        primary_key: !0
    },
    {
        name: "senderId",
        type: "String",
        length: 50,
        not_null: !0,
        index: !0
    },
    {
        name: "recipientId",
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
        name: "amount",
        type: "String",
        length: 50,
        not_null: !0
    }]
};