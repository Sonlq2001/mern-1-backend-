import express from "express";
const router = express.Router();

import orderDetailController from "./../app/controllers/orderDetail.controller";
import { userId } from "./../app/controllers/user.controller";

import {
	requireSignin,
	isAuth,
	isAdmin,
} from "./../app/controllers/auth.controller";

// list
router.get("/order-detail", orderDetailController.list);

// add
router.post("/add-order-detail", orderDetailController.add);

// get id
// router.param("id", orderDetailController.getId);

// update
router.put(
	"/update-order-detail/:id/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	orderDetailController.update
);

// user id
router.param("userId", userId);

// remove
router.delete("/delete-order-detail/:id", orderDetailController.remove);

export default router;
