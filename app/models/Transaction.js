'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let transactionSchema = new Schema({
card_number: {
    type: String,
    default:'',
    unique:true
},
debit: {
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


mongoose.model('Transaction', transactionSchema);