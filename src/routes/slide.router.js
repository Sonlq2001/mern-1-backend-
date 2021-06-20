import express from "express";

import slideController from "./../app/controllers/slide.controller";
const router = express.Router();

import {
	requireSignin,
	isAuth,
	isAdmin,
} from "./../app/controllers/auth.controller";
import { userId } from "./../app/controllers/user.controller";

// list
router.get("/slide", slideController.list);

// get id
router.param("id", slideController.getId);

// add
router.post(
	"/add-slide/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	slideController.add
);

// remove
router.delete(
	"/delete-slide/:id/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	slideController.remove
);

// get img
router.get("/slide/img/:id", slideController.getImg);

// edit
router.put(
	"/update-slide/:id/:userId",
	requireSignin,
	isAuth,
	isAdmin,
	slideController.update
);

// detail
router.get("/slide/:id", slideController.detail);

// id user
router.param("userId", userId);
export default router;
