import express from "express";
const router = express.Router();

import orderController from "./../app/controllers/order.controller";

router.get("/order", orderController.list);

router.post("/add-order", orderController.add);

router.delete("/delete-order/:id", orderController.remove);

export default router;
