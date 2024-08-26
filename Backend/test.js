

export const errorMiddleware= (req,res,next)=>{
    err.message=err.message || "Internal server error";
    err.statuscode = err.statuscode||500;

    if(err.name==="JsonWebtokenerror"){
        const message="invalid json web token"
    }

}

