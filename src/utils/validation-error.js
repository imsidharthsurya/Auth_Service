const AppErrors=require("./error-handler");
const {StatusCodes}=require("http-status-codes")

class ValidationError extends AppErrors{
    constructor(errorObj){
        let explanation=[];
        errorObj.errors.map((err)=>{
            explanation.push(err.message);
        })
        super(errorObj.name,'Unable to validate the data',explanation,StatusCodes.BAD_REQUEST)
    }
}

module.exports=ValidationError