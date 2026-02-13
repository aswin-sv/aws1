const tinyLinkModel = require("../model/tinyLink");
const db = require("../config/db");
const tinyLinkDal = new Object();

tinyLinkDal.addTinyLink = async (data) =>{
    try {
        let result = await tinyLinkModel.create(data);
        if(result){
            return { status : true  , message : "Tiny link Created Successfully" , data : result}
        }
        else{
            return { status : false  , message : "Tiny link not Created Successfully" , data : result}
        }
    } catch (error) {
        return { status : false  , message : "Tiny link not Created Successfully" , data : error}
    }
}

tinyLinkDal.findByCode = async (code) => {
  try {
    const query = `
      SELECT * FROM tinylink
      WHERE custom_code = $1 AND deleted = false
      LIMIT 1
    `;

    const result = await db.pool.query(query, [code]);

    if (result.rows.length > 0) {
      return { status: true, message: "Tiny link fetched successfully", data: result.rows[0]   };
    } else {
      return { status: false, message: "Tiny link not found",data: null};
    }

  } catch (error) {
    return { status: false, message: "Error fetching tiny link", data: error };
  }
};


tinyLinkDal.updateClickCount = async (code) => {
    try{
     const query = `
        UPDATE tinylink 
        SET click = click + 1, updated_at = NOW()
        WHERE custom_code = $1
    `;
    let result = await db.pool.query(query, [code]);
    if(result){
        return { status : true  , message : "Tiny link Created Successfully" , data : result.rows}
       }
       else{
        return { status : false  , message : "Tiny link not Created Successfully" , data : result}
       }
    }catch(error){
        return { status : false  , message : "Tiny link not Created Successfully" , data : error}
    }
}
tinyLinkDal.getTinyLink = async (data) =>{
    try{
        const query = ` SELECT * FROM tinylink WHERE deleted = false ORDER BY created_at DESC `;
       let result = await db.pool.query(query);
       if(result){
        return { status : true  , message : "Tiny link Created Successfully" , data : result.rows}
       }
       else{
        return { status : false  , message : "Tiny link not Created Successfully" , data : result}
       }

    }catch(error){
        return { status : false  , message : "Tiny link not Created Successfully" , data : error}
    }
}

tinyLinkDal.getTinyLinkById = async (id) =>{
    try{
        const query = `SELECT * FROM tinylink WHERE id = $1 AND deleted = false LIMIT 1`;
       let result = await db.pool.query(query,[id]);
       if(result){
        return { status : true  , message : "Tiny link Created Successfully" , data : result.rows}
       }
       else{
        return { status : false  , message : "Tiny link not Created Successfully" , data : result}
       }

    }catch(error){
        return { status : false  , message : "Tiny link not Created Successfully" , data : error}
    }
}

tinyLinkDal.DeleteTinyLinkById = async (id) =>{
    try{
        const query = ` UPDATE tinylink SET deleted = true, updated_at = NOW() WHERE id = $1  RETURNING *;`;
       let result = await db.pool.query(query,[id]);
       if(result){
        return { status : true  , message : "Tiny link Created Successfully" , data : result.rows}
       }
       else{
        return { status : false  , message : "Tiny link not Created Successfully" , data : result}
       }

    }catch(error){
        return { status : false  , message : "Tiny link not Created Successfully" , data : error}
    }
}




module.exports = tinyLinkDal