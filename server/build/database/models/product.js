"use strict";
const { Schema, model } = require(mongoose);
new Schema({
    product_name: [
        {
            name: String,
            description: String,
            presentation: [
                {
                    presentation: String,
                    price: Number,
                    delivery: String
                }
            ],
            adds: [
                {
                    add_name: String,
                    add_description: String,
                    add_price: Number
                }
            ]
        }
    ]
});
