import express from "express";

import subCategoryController from "./../app/controllers/subCategory.controller";
const router = express.Router();

// list
router.get("/subcategory", subCategoryController.list);

// add
router.post("/add-subcategory", subCategoryController.add);

// get id
router.param("id", subCategoryController.getId);

// remove
router.delete("/delete-subcategory/:id", subCategoryController.remove);

// update
router.put("/update-subcategory/:id", subCategoryController.update);

export default router;
