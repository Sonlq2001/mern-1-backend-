import express from "express";
const router = express.Router();

import commentController from "./../app/controllers/comment.controller";

// list
router.get("/comment", commentController.list);

// add
router.post("/add-comment", commentController.add);

// get id
router.param("id", commentController.getId);
// delete
router.delete("/delete-comment/:id", commentController.remove);

export default router;
