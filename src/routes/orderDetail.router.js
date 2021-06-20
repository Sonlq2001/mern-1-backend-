import express from "express";
const router = express.Router();

import orderDetailController from "./../app/controllers/orderDetail.controller";

// list
router.get("/order-detail", orderDetailController.list);

// add
router.post("/add-order-detail", orderDetailController.add);

// get id
// router.param("id", orderDetailController.getId);

// update
router.put("/update-order-detail/:id", orderDetailController.update);

export default router;
