const jwt = require('jsonwebtoken')

const authenticate = (req, res, next)=>{
    const token = req.headers['authorization']?.split(" ")[1];
    console.log('Authorization token: ', token ? '[Token existed]' : '[No token]');
    if(!token){
        console.log("No token found");
        return res.status(401).json({message: "Access denied, Not found provided token"})
    }
        
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded: ", decoded);
        
        req.user = {id: decoded.id, roleName: decoded.roleName};
        console.log(`User Authenticated: ${req.user.id} User Role: ${req.user.roleName}`);
        
        next()
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: "Invalid token"})
    }
}

const authorize = (allowedRole)=>(req, res, next)=> {
    if(!allowedRole.includes(req.user.roleName)){
        res.status(403).json("Access denied")
    }
    next();
}

module.exports = {authenticate, authorize}