import express from "express";
const router = express.Router();

import cartController from "./../app/controllers/cart.controller";

// list
router.get("/cart", cartController.list);

// add to cart
router.post("/add-cart", cartController.add);

// get id
router.param("id", cartController.getId);

// update cart
router.put("/update-cart/:id", cartController.update);

// remove cart
router.delete("/delete-cart/:id", cartController.remove);
export default router;
