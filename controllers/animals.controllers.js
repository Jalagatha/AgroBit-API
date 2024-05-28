import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();
//all user

const getProducts = async (req, res) => {
  try {
    const product = await prisma.product.findMany();
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error, message: "Error No Results Found" });
  }
};
//get product by id
const getProductByID = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "No Products Found" });
  }
};

const createProduct = async (req, res) => {
        let pdt = await prisma.product.create({
            data: req.body
            
        })
        res.status(StatusCodes.CREATED).json({message: "Product created", pdt})
        console.log(pdt);
    
};
//update Product
const updateProduct = async (req, res) => {
    const id = +req.params.id;
    try {
      const updateProduct = await prisma.product.delete({
        where: {
          id:id
        },include:{


        }
      });
      res.json({ message: " Record Deleted", data: deleteProduct });
    } catch (err) {
      res.json({ message: "Product Not Deleted", data: err });
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
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct,

};
