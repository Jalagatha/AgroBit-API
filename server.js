import express from "express";
import cors from "cors";
import userRouter from "./routes/user.router.js";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import productsRouter from "./routes/products.router.js";

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
app.use("api/v1/products",productsRouter);
// app.use("/api/v1/sales", );
// app.use("/api/v1/purchases", );
// app.use("/api/v1/animals", );

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Welcome to the AgroBit API" });
});

export default app;
