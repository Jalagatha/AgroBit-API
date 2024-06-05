import express from "express";
import cors from "cors";
import userRouter from "./routes/user.router.js";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import animalRouter from "./routes/products.router.js";

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use( cors({
    origin: "*",
    methods: "GET,PATCH,POST,DELETE,PUT",
    credentials: true,
  })
);

//ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products",animalRouter);
app.get("/api/v1/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Welcome to the Agro-Bit API" });
});

export default app;
