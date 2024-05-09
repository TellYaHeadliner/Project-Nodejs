const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

const authCookies = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const email = jwt.verify(token, process.env.KEYSERCET );
        req.email = email;
        next();
    } catch (err){
        res.clearCookie("token");
        return res.redirect("/");
    }
}

module.exports = authCookies;
