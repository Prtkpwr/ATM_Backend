const mongoose = require('mongoose');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')

/* Models */
const TransactionsModel = mongoose.model('Transaction')


// Create Transaction 
let createTransaction = (req, res) => {
    var newTransaction = new TransactionsModel({

        card_number: req.body.card_number,
        debit: req.body.debit,
        balance: req.body.balance
    });

    // save 
    newTransaction.save(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send({
                status: 200
            });
        }
    });

}// end of Create Tans  



module.exports = {

    createTransaction: createTransaction


}// end exports