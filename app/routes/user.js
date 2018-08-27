const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/user`;

    // defining routes.

    app.get(`${baseUrl}/list`, userController.getAllUsers);
    app.post(`${baseUrl}/create`, userController.createUser);
    app.put(`${baseUrl}/edit/:Id`, userController.editUser);
    app.post(`${baseUrl}/validate`, userController.userValidateAndLogin);
    app.delete(`${baseUrl}/delete/:Id`, userController.deleteUser);
    app.get(`${baseUrl}/:Id`, userController.getSingleUser);

}
