import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()


const secretKey = process.env.SECRET_JWT
const createToken = async (user)=>{
try{
    const token = jwt.sign(
        //payload = user info
        {
            id:user._id,
            role:user.role
        },
        // secret key = signature 
        secretKey,
        //options 
        {
            expiresIn:'100d', //when this token will expire or become useless
            issuer:"Vishoo's Project",
            algorithm:"HS256"
        }
    )

    return token
}
catch(err){
    throw new Error(err.message)
}
}




//verifying jwt token
const verifyToken = async (req, res, next)=>{
    try{
        //extract the token from the req header 
        let token = req.headers.authorization;
        // token = "Bearer eeoeyoye.bfi9yj.eofgohfgogfh"
        // ["Bearer", "token"]
        
        if(!token){
            return res.status(500).json({
                message:"Access Denied"
            })
        }
        token = token.split(" ")[1]

        // token will be verified and this middleware will continue to further functions
        const decoded = jwt.verify(
            token, 
            secretKey
        )
        console.log(decoded)
        req.user = decoded
        next();
    }
    catch(err){
        res.status(500).send(err.message)
    }
}


export {
    createToken,
    verifyToken
}