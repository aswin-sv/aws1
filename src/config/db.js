const { Pool } = require('pg');
const config = require('./config');

const db = new Object()

db.establishConnection = async () => {
    try{
      db.pool = new Pool({
        connectionString: config.database.url,
        ssl: {
          rejectUnauthorized: false
        },
     })
     await db.pool.query('SELECT NOW()')
     console.log("Connected to PostgreSQL")
    }catch(error){
        console.log("Error connecting to PostgreSQL:", error)
         process.exit(1);
    }

}

module.exports = db
