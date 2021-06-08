import express from "express";

import slideController from "./../app/controllers/slide.controller";
const router = express.Router();

// list
router.get("/slide", slideController.list);

// get id
router.param("id", slideController.getId);

// add
router.post("/add-slide", slideController.add);

// remove
router.delete("/delete-slide/:id", slideController.remove);

// get img
router.get("/slide/img/:id", slideController.getImg);

// edit
router.put("/update-slide/:id", slideController.update);

// detail
router.get("/slide/:id", slideController.detail);
export default router;
