module.exports ={
     apiResponse: (resStatusCode = 200, resStatus = true, resMessageKey = "", resData = {}) => {
    return {
      code: resStatusCode,
      status: resStatus,
      message: resMessageKey,
      data: resData,
    };
  },
}