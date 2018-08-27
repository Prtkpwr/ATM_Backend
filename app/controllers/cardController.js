const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')

/* Models */
const UserModel = mongoose.model('User')


// Get All Users

let getAllUsers = (req, res) => {

    UserModel.find(function (err, result) {

        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

}// Get All Users

// Create User 
let createUser = (req, res) => {
    var newUser = new UserModel({

        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    // save 
    newUser.save(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send({
                status: 200
            });
        }
    });

}// end of Create User  

////PUT to Edit user
let editUser = (req, res) => {
    var update = req.body;
    console.log("req.params.Id", req.params)

    // findOneAndUpdate
    UserModel.findOneAndUpdate({
        "_id": req.params.Id
    }, update, function (err, result) {

        if (err) {
            res.send(err);
        } else {
            console.log(result);
            res.send({
                status: 200
            });
        }

    }); // findOneAndUpdate ends

} // end of //PUT to Edit user

let userValidateAndLogin = (req, res) => {
    UserModel.find({ "username": req.body.username }, function (err, result) {

        if (result.length == 1 && result[0].username == req.body.username && result[0].password == req.body.password) {
            if (err) {
                res.send(err);
            } else if (result[0].userType == "user") {
                res.send({
                    user: "user",
                    status: 200
                });
            } else if (result[0].userType == "admin") {
                res.send({
                    user: "admin",
                    status: 200
                });
            }
            else {
                res.send(err)
            }
        }
        else {
            res.send({
                status: 400,
                text: "Wrong Username or Password"
            })
        }
    });
}

// POST request to Delete 
let deleteUser = (req, res) => {
    UserModel.remove({
        _id: req.params.Id
    }, function (err, result) {


        if (err) {
            res.send(err);
        } else {
            res.send({
                status: 200
            });
        }

    }); //  remove blog ends
}

//GET request to find a particular
let getSingleUser = (req, res) => {
    UserModel.findOne({
        '_id': req.params.Id
    }, function (err, result) {
        if (err) {
            console.log("Error");
            res.send(err);
        } else {
            res.send(result);
        }
    });
}


module.exports = {

    getAllUsers: getAllUsers,
    createUser: createUser,
    editUser: editUser,
    userValidateAndLogin:userValidateAndLogin,
    deleteUser:deleteUser,
    getSingleUser:getSingleUser


}// end exports