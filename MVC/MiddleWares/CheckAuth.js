const jwt  = require('jsonwebtoken');


module.exports = (req,res,next)=>{
   try {
     const token  = req.headers.authorization.split(" ")[1];
     const verify = jwt.verify(token,'this is login data');
     req.userId = verify._id;
     req.roleId = verify.roleId;
     next();
   } catch (error) {
    return res.status(401).json({
        message:"Unauthorized request"
    });
   }
}