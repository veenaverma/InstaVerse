import jwt from "jsonwebtoken";

const authentication = async(request,response,next)=>{
    try{
        const token=request.headers.authorization.split(' ')[1];
        console.log(token);
        if(token)
        {
            let decodedData = jwt.verify(token,"1234");
            request.userId=decodedData?.id;
            console.log(request.userId);
        }
        next();
    }
    catch(error){
        console.log(error);
    }
}

export default authentication;