const mongoose = require('mongoose');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const transController = require("./../../app/controllers/transController");
const check = require('../libs/checkLib')

/* Models */
const CardsModel = mongoose.model('Cards')


//PUT to Edit Card
let editCard = (req, res) => {
    var update = req.body;

    // findOneAndUpdate
    CardsModel.findOneAndUpdate({
        "card_number": req.body.card_number
    }, update, function (err, result) {

        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'Failed To Edit Card Details', 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Card Details Changed Successfully', 200, result);
            res.send(apiResponse);
        }

    }); // findOneAndUpdate ends

} // end of //PUT to Edit Card

let CardValidateAndLogin = (req, res) => {
    CardsModel.find({ "card_number": req.body.card_number, "pin": req.body.pin }, function (err, result) {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'Failed To Find Card Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'Please Enter Correct Details', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Card Details Found', 200, result);
            res.send(apiResponse);
        }
    });
}
let checkCardBalance = (req, res) => {
    CardsModel.find({ "card_number": req.body.card_number }, function (err, result) {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'Failed To Find Card Details', 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Card Details Found', 200, result);
            res.send(apiResponse);
        }
    });
}
let withdrawMoney = (req, res) => {
    CardsModel.find({ "card_number": req.body.card_number }, function (err, result) {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'Failed To Find Card Details', 500, null)
            res.send(apiResponse)
        } else {
            let data = {}
            data.countone = 0;
            data.counttwo = 0;
            data.countfive = 0;
            data.new_balance = 0;
            data.message = "";
            console.log("this is result", result[0])
            if (result[0].balance >= req.body.amount) {
                let value = req.body.amount;
                console.log(req.body.amount)
                let remainder = value % 100;
                if (remainder == 0) {
                    while (value > 0) {
                        if ((value / 2000) >= 1) {
                            data.counttwo += Math.floor(value / 2000)
                            value = value - Math.floor(value / 2000) * 2000
                        }
                        else if ((value / 500) >= 1) {
                            data.countfive += Math.floor(value / 500)
                            value = value - Math.floor(value / 500) * 500
                        }
                        else if ((value / 100) >= 1) {
                            data.countone += Math.floor(value / 100)
                            value = value - Math.floor(value / 100) * 100
                        }
                    }
                    data.new_balance = result[0].balance - req.body.amount
                    let update = {
                        balance: data.new_balance
                    }
                    CardsModel.findOneAndUpdate({
                        "card_number": req.body.card_number
                    }, update, function (err, result) {

                        if (err) {
                            console.log(err)
                        } else {
                            console.log("done")
                        }

                    });
                }
                else {
                    data.message = "Please Enter Amount Multiple of 100"
                }

                res.send(data);
            }
            else {
                res.send({
                    "status": 400,
                    "message": "Not Sufficient Balance"
                })
            }
        }
    });
}



module.exports = {

    editCard: editCard,
    CardValidateAndLogin: CardValidateAndLogin,
    checkCardBalance: checkCardBalance,
    withdrawMoney: withdrawMoney
}// end exports