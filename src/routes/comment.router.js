import express from "express";
const router = express.Router();

import commentController from "./../app/controllers/comment.controller";

// list
router.get("/comment", commentController.list);

// add
router.post("/add-comment", commentController.add);

export default router;
