import { connect } from 'http2'
import prisma from '../db'

export const getOneUpdate = async (req,res)=>{
    const update = await prisma.update.findUnique({
        where:{
            id:req.params.id
        }
    })
    res.json({data:update})
}

export const getUpdates = async (req,res)=>{
    const products = await prisma.product.findMany({
        where:{
            belongsToId:req.user.id
        },
        include:{
            updates:true
        }
    })
    
    const updates = products.reduce((allUpdates,product)=>{
        return [...allUpdates,...product.updates]
    },[])
    res.json({data:updates})
}

export const createUpdate = async (req,res)=>{
    const product = await prisma.product.findUnique({
        where:{
            id:req.params.id
        }
    })
    if(!product){
        res.json({message:'Product not found'})
    }
    const update = await prisma.update.create({
        data:{
            title:req.body.title,
            body:req.body.body,
            product:{connect:product}
        },
    })

    res.json({data:update})
}

export const updateUpdate = async (req,res)=>{
   const products = await prisma.product.findMany({
        where:{
            belongsToId:req.user.id
        },
        include:{
            updates:true
        }
    })

    const updates = products.reduce((allUpdates,product)=>{
        return [...allUpdates,...product.updates]
    },[])

    const update = updates.find(update=>update.id===req.params.id)
    if(!update){
        res.json({message:'Update not found'})
    }
    const updateToUpdate = await prisma.update.update({
        where:{
            id:req.params.id
        },
        data:req.body
    })
}

export const deleteUpdate = async (req,res)=>{
    const products = await prisma.product.findMany({
        where:{
            belongsToId:req.user.id
        },
        include:{
            updates:true
        }
    })

    const updates = products.reduce((allUpdates,product)=>{
        return [...allUpdates,...product.updates]
    },[])

    const update = updates.find(update=>update.id===req.params.id)
    if(!update){
        res.json({message:'Update not found'})
    }
    const updateToDelete = await prisma.update.delete({
        where:{
            id:req.params.id
        }
    })
    res.json({data:updateToDelete})
}