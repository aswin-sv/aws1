const e = require("express");
const tinyLinkDal  = require ("../dal/tinyLinkDal");
const appHelper = require("../helper/helper");
const tinyLinkModel = require("../model/tinyLink");
const tinyLinkController = new Object();


tinyLinkController.addTinyLink = async (req, res) => {
    try {
        let body = req.body;
        // console.log(body,"jino1")

        // Validate longUrl
        if (!body.longUrl) {
        return appHelper.apiResponse(400, false, "longUrl is required", null);
        }

       const baseUrl = "https://tinylink-ozci.onrender.com";

        // Generate short URL
        body.shortUrl = `${baseUrl}/${body.customCode}`;

        let result  = await tinyLinkDal.addTinyLink(body);
        // console.log(result,"jino")
        if (result){
          return appHelper.apiResponse(200, true, "Tiny link Created Successfully", result.data);
        }
         return appHelper.apiResponse(400, false, "Tiny link not Created Successfully", result);
    } catch (error) {
        return appHelper.apiResponse(500, false, "Tiny link not Created Successfully", error);
    }
}
tinyLinkController.redirectTinyLink = async (req, res) => {
  try {
    const code = req.params.code;

    const link = await tinyLinkDal.findByCode(code);
    console.log(link, "jino11");

    if (!link) {
      return  appHelper.apiResponse(404, false, "Tiny link not found", null);
    }

    let updateresult = await tinyLinkDal.updateClickCount(code);
    console.log(updateresult, "jino");
    if(updateresult) {
       return res.redirect(link.data.long_url);
    }
    return appHelper.apiResponse(404, false, "Tiny link not found", null);
     
  } catch (err) {
    console.log(err);
    return appHelper.apiResponse(500, false, "Tiny link not Created Successfully", err);
  }
};



tinyLinkController.getTinyLink = async (req, res) => {
    try {
        let result  = await tinyLinkDal.getTinyLink(req);
        console.log(result,"jino")
        if (result){
          return appHelper.apiResponse(200, true, "Tiny link Created.... Successfully", result.data);
        }
         return appHelper.apiResponse(400, false, "Tiny link not Created Successfully", result);
    } catch (error) {
        return appHelper.apiResponse(500, false, "Tiny link not Created Successfully", error);
    }
}
tinyLinkController.getTinyLinkById = async (req, res) => {
    try {
        let id = req.params.id
        let result  = await tinyLinkDal.getTinyLinkById(id);
        console.log(result,"jino")
        if (result){
          return appHelper.apiResponse(200, true, "Tiny link Created.... Successfully", result.data);
        }
         return appHelper.apiResponse(400, false, "Tiny link not Created Successfully", result);
    } catch (error) {
        return appHelper.apiResponse(500, false, "Tiny link not Created Successfully", error);
    }
}
tinyLinkController.DeleteTinyLinkById  = async (req, res) => {
    try {
        let id = req.params.id
        let result  = await tinyLinkDal.DeleteTinyLinkById (id);
        console.log(result,"jino")
        if (result){
          return appHelper.apiResponse(200, true, "Tiny link Created.... Successfully", result.data);
        }
         return appHelper.apiResponse(400, false, "Tiny link not Created Successfully", result);
    } catch (error) {
        return appHelper.apiResponse(500, false, "Tiny link not Created Successfully", error);
    }
}

module.exports = tinyLinkController