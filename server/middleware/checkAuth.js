const checkAuth = (req,res,next) =>{
    let token; 
   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
        token = req.headers.authorization.split('')[1];
        console.log(token)
    } catch (error) {
            }
   }


    next();

}

export default checkAuth;