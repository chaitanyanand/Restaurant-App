var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    no_of_guest: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('Table', TableSchema);