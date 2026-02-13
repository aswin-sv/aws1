const express = require("express");
const appRoute = express.Router();
const tinyLinkroute = require("./tinyLinkRoute");


const baseUrl = '/api'

appRoute.initialize = (app) => {
   app.use(`${baseUrl}/tinylink`, tinyLinkroute);
}


module.exports = appRoute;