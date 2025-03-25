import { validationResult } from "express-validator"

export const handleInputErros = (req,res,next)=>{
    const errors = validationResult(req)
 
   if(!errors.isEmpty()){
    res.status(401)
    res.json({message: errors.array()})
   }else{
    next()
   }
}