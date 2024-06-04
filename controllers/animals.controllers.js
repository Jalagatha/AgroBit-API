import { Category, PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();
//all user
//get quote by id
const getProducts = async (req, res) => {
  try {
    const id = +req.params.id;
    const product = await prisma.product.findMany({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    res.status(StatusCodes.CREATED).json({
      message: "Request successfully",product,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Can't get Products!" });
  }
};


const getProductById = async (req, res) => {
  try {
    const id = +req.params.id;
    const pdt = await prisma.product.findUnique({
      where: {
        id:id,
      },
      
    });
    res.status(StatusCodes.CREATED).json({
      message: "successfully",
       pdt,
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Can't get Product!" });
  }
  
  

     
}

const createProduct = async (req, res) => {



  // const id=+req.params.id
  try {
    const newPdt  = await prisma.product.create({
      
      // data: {
      //   name:req.body.name,
      //   price:req.body.price,
        
      // }
      data: req.body
  })
  res.status(StatusCodes.CREATED).json({message: "Product created", newPdt});
  
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({message: "Failure"});
  }
  }


//update Product
const updateProduct = async (req, res) => {
    const id = +req.params.id;
    try {
      const updatePdt = await prisma.product.update({
        where: {
          id
        },data:{
          name:req.body.name,
          price:req.body.price,
          
        }
      });
      res.json({ message: " Record Updated", data: updatePdt });
    } catch (err) {
      res.json({ message: "Product Not Updated", data: err });
    }

};
//delete author

const deleteProduct = async (req, res) => {
  const id = +req.params.id;
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });
    res.json({ message: " Record Deleted", data: deleteProduct });
  } catch (err) {
    res.json({ message: "Product Not Deleted", data: err });
  }

};

export const products={
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,

};
