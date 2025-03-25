import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import {protect} from './modules/auth'
import {createNewUser, signIn} from './handlers/user'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{

})

app.get('/' ,(req,res,next)=>{
  setTimeout(()=>{
    next(new Error('oops'))
  },1000)
  res.status(200)
  res.json({message:'Hello World'})
})

app.use('/api',protect, router)
app.post('/user', createNewUser)
app.post('/signin', signIn)

app.use((err,req,res,next)=>{
  if (err.type === 'auth'){
    res.status(401).json({message:"unauthorized"})
  }
  if(err.type==='input'){
    res.status(400).json({message:"invalid input"})
  }
  else{
   res.status(500).json({message:"server error"})
  }
})


export default app