const express = require('express');
const router = express.Router();
const transController = require("./../../app/controllers/transController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/transaction`;

    // defining routes.

    app.post(`${baseUrl}/create`, transController.createTransaction);

}