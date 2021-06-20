import express from "express";

import productController from "./../app/controllers/product.controller";
import {
	requireSignin,
	isAuth,
	isAdmin,
} from "./../app/controllers/auth.controller";
import { userId } from "./../app/controllers/user.controller";

const router = express.Router();

// get id
router.param("id", productController.getId);

// get list
router.get("/products", productController.list);

// add
router.post(
	"/add-product/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	productController.add
);

// get img
router.get("/product/img/:id", productController.getImg);

// remove
router.delete(
	"/delete-product/:id/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	productController.remove
);

// update
router.put(
	"/update-product/:id/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	productController.update
);

// detail
router.get("/product/:id", productController.detail);

// get id user
router.param("userId", userId);
export default router;
