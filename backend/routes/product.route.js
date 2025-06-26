import express from "express";
import {getAllProduct, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts, getProductByCategory, toggleFeaturedProducts} from "../controllers/product.controller.js";
import {protectRoute, adminRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProduct); //should only be accesable to admin
router.get("/featured", getFeaturedProducts);  
router.get("/category/:category", getProductByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProducts)//patch when only a portion of document(what is a document ? ) to be updated , put when whole document to be updated
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;