const jwt = require("jsonwebtoken");
const adminModel = require("../Model/adminModel");

module.exports = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        console.log(authHeader, "Middleware One");
        const authToken = authHeader && authHeader.split(" ")[1];
        console.log(authToken, "Middleware Two");

        if(!authToken){
            return res
            .json({
                loginFail: true,
                status: false,
                message: "No auth token",
            });
        }
            const decode = jwt.verify(authToken, "JWT");

            const user = await adminModel.findOne({_id: decode.id});

            if(!user){
                return res
                .json({
                    message: "Unauthorized access",
                    status: false,
                    loginFail: true,
                });
            }

            req.user = user;
            next();
        
    } catch(error){
        console.log(error);
        return res
        .json({
            message: "unauthorized access",
            status: false,
            loginFail: true,
        });
    }
};