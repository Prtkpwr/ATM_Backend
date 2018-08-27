'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    default:'',
    unique:true
},
password: {
    type: String,
    default:'',
    unique:false
},
firstName: {
    type: String,
    default:'',
    unique:false
},
lastName: {
    type: String,
    default:'',
    unique:false
},
email: {
    type: String,
    default:'',
    unique:false
},
userType:{
    type:String,
    default:'user',
    unique:false
},
  createdOn :{
    type:Date,
    default:Date.now
  }
});


mongoose.model('User', userSchema);