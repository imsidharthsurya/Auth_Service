const express=require("express");
const app=express();
const apiRoutes=require("./routes/index")
const {SYNC_DB,PORT}=require("./config/serverConfig")
const db=require("./models/index")

const prepareAndStartServer=async()=>{

    app.use(express.json());
    app.use('/api',apiRoutes)
    
    app.listen(PORT,async()=>{
        if(SYNC_DB){
            await db.sequelize.sync({ alter: true });
        }
        console.log(`server is running on port ${PORT}`)
    })
}

prepareAndStartServer();