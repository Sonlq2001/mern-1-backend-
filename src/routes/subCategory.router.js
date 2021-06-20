import express from "express";

import subCategoryController from "./../app/controllers/subCategory.controller";
const router = express.Router();

import {
	requireSignin,
	isAuth,
	isAdmin,
} from "./../app/controllers/auth.controller";
import { userId } from "./../app/controllers/user.controller";

// list
router.get("/subcategory", subCategoryController.list);

// add
router.post(
	"/add-subcategory/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	subCategoryController.add
);

// get id
router.param("id", subCategoryController.getId);

// remove
router.delete(
	"/delete-subcategory/:id/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	subCategoryController.remove
);

// update
router.put(
	"/update-subcategory/:id/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	subCategoryController.update
);

// user id
router.param("userId", userId);

export default router;
