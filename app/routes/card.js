const express = require('express');
const router = express.Router();
const cardController = require("./../../app/controllers/cardController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/cards`;

    // defining routes.

    app.put(`${baseUrl}/edit`, cardController.editCard);
    app.post(`${baseUrl}/validate`, cardController.CardValidateAndLogin);
    app.post(`${baseUrl}/check_balance`, cardController.checkCardBalance);
    app.post(`${baseUrl}/withdraw`, cardController.withdrawMoney);
}
