const tinyLinkController = require("../controller/tinylinkController");
const express = require("express");
const tinyLinkrouter = express.Router();

tinyLinkrouter.get("/code/:code", (req, res) => {
    tinyLinkController.redirectTinyLink(req, res);
});

tinyLinkrouter.route("/").post(async(req,res)=>{
    let result = await tinyLinkController.addTinyLink(req);
    res.status(result.code).send(result);
})

tinyLinkrouter.route("/").get(async(req,res)=>{
    let result = await tinyLinkController.getTinyLink(req);
    res.status(result.code).send(result);
})
tinyLinkrouter.route("/:id").get(async(req,res)=>{
    let result = await tinyLinkController.getTinyLinkById(req);
    res.status(result.code).send(result);
})
tinyLinkrouter.route("/:id").delete(async(req,res)=>{
    let result = await tinyLinkController.DeleteTinyLinkById (req);
    res.status(result.code).send(result);
})

module.exports = tinyLinkrouter
