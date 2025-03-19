import prisma from '../db'
import { hashPassword , createJWT , comparePasswords } from '../modules/auth'

export const createNewUser  = async (req,res) => {
  const user = await prisma.user.create({
    data: {
        username: req.body.username,
        password: await hashPassword(req.body.password)
    }
  }) 

  const token = createJWT(user)
  res.json({token})
}

export const signIn  = async (req,res) => {
  const username = req.body.username
  const password = req.body.password

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if(!user){
    res.status(401)
    res.send({message:'User not found'})
    return
  }

  if(! await comparePasswords(password, user.password)){
    res.status(401)
    res.send({message:'Invalid password'})
    return 
  }

  const token = createJWT(user)
  return res.json({token})
} 