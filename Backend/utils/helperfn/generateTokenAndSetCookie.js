import  Jwt from "jsonwebtoken"




const genrateTokenAndSetCookie=(userId,res)=>{
    const token =Jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"15d",
})

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*60,
        httpOnly:true,
        sameSite:"strict",
    })

    return token
}

export default genrateTokenAndSetCookie