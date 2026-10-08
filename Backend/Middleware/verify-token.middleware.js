import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next){
    let token = req.cookies.token
    if(!token){
        res.status(401).json({success: false, message: "Login necessary"})
    }else{
        try{
            let decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodedToken
            next()
        }catch(err){
            res.status(401).json({success: false, message: "Please re-login"})
        }
    }
}