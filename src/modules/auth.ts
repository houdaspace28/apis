import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const createJWT = (user) => {
  const token = jwt.sign({id:user.id, username:user.username},
                         process.env.JWT_SECRET)
  return token
}

export const protect = (req,res,next)=>{
    const bearer = req.headers.authorization
    
    if(!bearer){
        res.status(401)
        res.send({message:'Unauthorized'})
        return
    }

    const [, token] = bearer.split(' ') 

    if(!token){
        res.status(401)
        res.send({message:'Invalid token'})
        return 
    }

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    }catch (e){
        console.log(e)
        res.status(401)
        res.send({message:'Invalid token'})
        return 
    }
}

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}