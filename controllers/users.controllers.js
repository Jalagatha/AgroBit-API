import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

/**
 * @param
 * @returns array of users.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        l_name: true,
        f_name:true,
        phone: true,
        salesId:true,
        purchasesId:true,
        title: true,
      },
    });
    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    await prisma.$disconnect();
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Error getting Users", error });
  }
};

/**
 * @route GET /author/:id
 * @desc Get Author with ID number
 * @returns a author given ID.
 */
const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide Author ID!" });
  }
  try {
    // Query the database.
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        l_name: true,
        f_name:true,
        phone: true,
        salesId:true,
        purchasesId:true,
        title: true,
      },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "user not Found!" });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    await prisma.$disconnect();
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Error getting user", error });
  }
};

/**
 * TODO: Return error if name is not unique.
 * @route PATCH /authors
 * @description Update a author
 * @returns String
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { l_name,f_name, age, title } = req.body;
  if (!id) {
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ msg: "Please Provide User ID!" });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not Found." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        l_name,
        f_name,
        age,
        title,
      },
    });

    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    await prisma.$disconnect();
    return res.status(StatusCodes.NOT_FOUND).json({ error });
  }
};

/**
 * TODO: Return error if name is not unique.
 * @route POST /users
 * @description Create a users
 * @returns String
 */
const createUser = async (req, res) => {
  if (!req.body) {
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ msg: " Author Data not provided!" });
  }
  try {
    let { phone, password } = req.body;
    const user = await prisma.author.findUnique({
      where: { phone: phone },
    });

    if (user != null && user.phone === phone) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User already exists." });
    }
    let saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    const data = {
      ...req.body,
      password: hashed,
    };

    const newUser = await prisma.user.create({
      data: data,
    });
    return res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    await prisma.$disconnect();
    return res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ msg: "Please provide User ID!" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User not found" });
    }

    await prisma.author.delete({
      where: { id: Number(id) },
    });

    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    await prisma.$disconnect();
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const userLogin = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send("Please provide Username & Password!");
  }
  try {
    const user = await prisma.user.findUnique({
      where: { phone:phone },
    });
    let userDBPassword = await bcrypt.compare(password, user.password);

    if (userDBPassword) {
      const payload = {
        phone,
        password: user.password,
        title: user.title,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res
        .status(StatusCodes.OK)
        .json({ message: "Login Successful", token });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Access denied Password is incorrect!" });
    }
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json(error);
  }
};

const userRegister = async (req, res) => {
  const { password, phone, age } = req.body;
  let saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);

  const payload = {
    phone:phone,
    password: hashed,
   title: "worker",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const data = { l_name, f_name,age,title, password: hashed };
  try {
    const newUser = await prisma.user.create({
      data,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User Created", token, newUser });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ error, message: "Failed to create User" });
  }
};
export const users = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  userLogin,
  userRegister,
};