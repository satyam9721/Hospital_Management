class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


//creating all type of error handler message,It helps from server down.

export const errorMiddleware= (err,req,res,next)=>{
    err.message=err.message || "Internal Server Error";
    err.statusCode=err.statusCode|| 500;
if(err.code ===11000){
    const message =`Duplicate ${Object.keys(err.keyValue)} Entered`;
    err=new ErrorHandler(message,400);
}

if(err.name ==="JsonWebTokenError"){
    const message = "Json web Token is invalid, Try again";
    err=new ErrorHandler(message,400);
}
if(err.name ==="TokenExpiredError"){
    const message = "Json web Token is Expired, Try again";
    err=new ErrorHandler(message,400);
}
//cast error is like type error,you write string in place of integer

if(err.name === "CastError"){
    const message=`Invalid ${err.path}`;
    err = new ErrorHandler(message,400);
}

//this below line removes,"message": "Message validation failed: email:
const errorMessage = err.errors ? Object.values(err.errors).map((error) => error.message).join(" "): err.message;



return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
});


}

export default ErrorHandler;