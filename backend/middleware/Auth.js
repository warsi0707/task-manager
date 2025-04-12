const jwt = require('jsonwebtoken');
const { USER_JWT_SECRET } = require('../Config/Config');

async function Auth(req, res, next) {
    const token = req.cookies.token;
    try{
        if(!token){
            return res.status(404).json({
                message: "Login required"
            })
        }
        const decode = jwt.verify(token, USER_JWT_SECRET)
        if(!decode ){
            return res.status(404).json({
                message: "Login Required"
            })
        }
        req.user = decode.userId 
        next()
    }catch(error){
        return res.status(404).json({
            message: error.message
        })
    }
}

module.exports = {
    Auth
}