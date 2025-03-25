import { Router } from 'express'
import {body, oneOf, validationResult} from 'express-validator'
import {handleInputErros} from './modules/middlewares' 
import {getProducts, getOneProduct, createNewProduct, updateProduct, deleteProduct} from './handlers/product'
import {getOneUpdate, getUpdates, createUpdate, updateUpdate, deleteUpdate} from './handlers/updates'
import { get } from 'http'

const router = Router()

router.get('/product',getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErros,updateProduct) 
router.post('/product', body('name').isString(), handleInputErros, createNewProduct)
router.delete('/product/:id',deleteProduct)


router.get('/update',getUpdates)
router.get('/update/:id',(req,res)=>{

})
router.put('/update/:id',body('title').optional(),
                         body('body').optional(),
                         body('status').isIn(['IN_PROGRESS', 'SHIPPED','DEPRECATED']),
                         body('version').optional(), 
                         handleInputErros,
                         getOneUpdate)
router.post('/update',body('title').exists().isString(),
                      body('body').exists().isString(),
                      body('productId').exists().isString(),
                      handleInputErros,
                      createUpdate)
router.delete('/update/:id',deleteUpdate)


router.get('/updatepoint',(req,res)=>{

})
router.get('/updatepoint/:id',(req,res)=>{

})
router.put('/updatepoint/:id',body('name').optional().isString(),
                              body('description').optional(),
                              handleInputErros,(req,res)=>{

})
router.post('/updatepoint',body('name').exists().isString(),
                           body('description').exists().isString(),
                           body('updateId').exists().isString(),
                           handleInputErros,(req,res)=>{

})
router.delete('/updatepoint/:id',(req,res)=>{
    
})

export default router

