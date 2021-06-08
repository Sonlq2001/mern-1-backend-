import express from "express";

import productController from "./../app/controllers/product.controller";

const router = express.Router();

// get id
router.param("id", productController.getId);

// get list
router.get("/products", productController.list);

// add
router.post("/add-product", productController.add);

// get img
router.get("/product/img/:id", productController.getImg);

// remove
router.delete("/delete-product/:id", productController.remove);

// update
router.put("/update-product/:id", productController.update);

// detail
router.get("/product/:id", productController.detail);

export default router;
