import express from "express";
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import cors from "cors";

import db from "./config/db/connectDB";

import authRouter from "./routes/auth.router";
import categoryRouter from "./routes/category.router";
import productRouter from "./routes/product.router";
import slideRouter from "./routes/slide.router";
import subCategoryRouter from "./routes/subCategory.router";
import commentRouter from "./routes/comment.router";
import userRouter from "./routes/user.router";
import cartRouter from "./routes/cart.router";
import orderRouter from "./routes/order.router";
import orderDetailRouter from "./routes/orderDetail.router";

// connect db
db.connect();

const app = express();
const port = 4000;

app.use(expressValidator());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", slideRouter);
app.use("/api", subCategoryRouter);
app.use("/api", commentRouter);
app.use("/api", userRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", orderDetailRouter);
// app.get("/", (req, res) => {
// 	res.send("le quang son");
// });

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
