import jwt from "jsonwebtoken"

const auth=(req,res,next)=>{
    try {
        const token =req.headers.authorization.split(" ")[1];
        let decodedata=jwt.verify(token,process.env.JWT_SECRET)
        req.userid=decodedata?.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        console.log(error)
    }
}
export default auth;