import express from "express";

import categoryController from "./../app/controllers/category.controller";
import {
	requireSignin,
	isAdmin,
	isAuth,
} from "./../app/controllers/auth.controller";

import { userId } from "./../app/controllers/user.controller";

const router = express.Router();

// get id
router.param("id", categoryController.getId);

// get list
router.get("/category", categoryController.list);

// add
router.post(
	"/add-category/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	categoryController.add
);

// remove
router.delete(
	"/delete-category/:id/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	categoryController.remove
);

// get img
router.get("/category/img/:id", categoryController.getImg);

// edit
router.put(
	"/update-category/:id/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	categoryController.update
);

// id user
router.param("userId", userId);

export default router;
