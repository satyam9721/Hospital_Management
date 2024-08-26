//to catch the async errors
export const catchAsyncErrors = (theFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(theFunction(req,res,next)).catch(next);
    }
}