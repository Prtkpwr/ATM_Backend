'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let cardsSchema = new Schema({
card_number: {
    type: String,
    default:'',
    unique:true
},
pin: {
    type: Number,
    default:'',
    unique:false
},
balance: {
    type: Number,
    default:'',
    unique:false
}
});


mongoose.model('Cards', cardsSchema);