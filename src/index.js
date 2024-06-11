const express=require("express");
const app=express();
const apiRoutes=require("./routes/index")
const {PORT}=require("./config/serverConfig")

const prepareAndStartServer=async()=>{

    app.use(express.json());
    app.use('/api',apiRoutes)
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
}

prepareAndStartServer();