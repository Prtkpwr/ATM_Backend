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
    unique:false
},
debit: {
    type: String,
    default:'',
    unique:false
},
balance: {
    type: Number,
    default:'',
    unique:false
},
createdOn :{
    type:Date,
    default:Date.now
  }
});


mongoose.model('Transaction', transactionSchema);