let config = new Object();

config = {
    app :{
        port : process.env.APP_PORT ? parseInt(process.env.APP_PORT,10) : 3000,
    },
    database : {
      url: process.env.PG_URL || 'postgresql://neondb_owner:npg_Sf4HwIP6GsKd@ep-lingering-base-a4jhikz8-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    },
};


module.exports = config;