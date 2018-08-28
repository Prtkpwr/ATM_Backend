const mongoose = require('mongoose');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
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
    CardsModel.find({ "card_number": req.body.card_number,"pin":req.body.pin }, function (err, result) {
        if(err){
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
    CardsModel.find({ "card_number": req.body.card_number}, function (err, result) {
        if(err){
            console.log(err)
            let apiResponse = response.generate(true, 'Failed To Find Card Details', 500, null)
            res.send(apiResponse)
        }  else {
            let apiResponse = response.generate(false, 'Card Details Found', 200, result);
            res.send(apiResponse);
        }
    });
}



module.exports = {

    editCard: editCard,
    CardValidateAndLogin:CardValidateAndLogin,
    checkCardBalance:checkCardBalance


}// end exports