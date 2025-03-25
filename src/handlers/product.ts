import prisma from '../db'

export const getProducts = async (req,res)=>{
  const user = prisma.user.findUnique({
    where:{
        id:req.user.id
    },
    include:{
        products:true
    }
  })

  res.json({data: user.products})
}

export const getOneProduct = async (req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        }
    })
    const product = await prisma.product.findUnique({
        where:{
            belongsToId:user.id,
            id:req.params.id
        }
    })
    res.json({data:product})
}

export const createNewProduct = async (req,res) => {
   const name = req.body.name
   const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        }
    })
   const product = await prisma.product.create({
       data:{
           name,
           belongsToId:user.id
       }
   })
   res.json({data:product})
}

export const updateProduct = async (req,res) =>{
    const product = await prisma.product.update({
        where:{
            id:req.params.id
        },
        data:{
            name:req.body.name
        }
    })
    res.json({data:product})
}

export const deleteProduct = async (req,res) =>{
    const product = await prisma.product.delete({
        where:{
            id:req.params.id,
            belongsToId:req.user.id
        }
    })
    res.json({data:product})
}