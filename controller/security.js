require('dotenv').config();

const jwt = require('jsonwebtoken');

// This is only for the token saving...
// const secret = require('crypto').randomBytes(64).toString('hex');
// console.log(secret);

// console.log(process.env.TOKEN_SECRET);

generateAccessToken = (data) => {
    // const token = jwt.sign(data.name, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
    //// this is the full syntax...

    const token = jwt.sign(data.name, process.env.TOKEN_SECRET)
    return token;
}

authenticateToken = (req, res, next) => {
    if(req.headers.cookie){
        const token = req.headers.cookie.split("=")[1]
        const decode = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user_token = decode;
        next()
    }else{
        next(res.sendStatus(403))
        console.log('Token not found');
    }
}


module.exports = {generateAccessToken, authenticateToken}