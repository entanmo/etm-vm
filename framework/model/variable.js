"use strict";
module.exports = {
    table: "variables",
    tableFields: [{
        name: "key",
        type: "String",
        length: 256,
        not_null: !0,
        primary_key: !0
    },
    {
        name: "value",
        type: "String",
        length: 256,
        not_null: !0
    }]
};