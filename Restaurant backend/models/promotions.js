const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const promoSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: ''
        },
        price: {
            type: String,
            required: true,
            min: 0
        },
        featured: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);


const promos = mongoose.model('promotion', promoSchema);

module.exports = promos;