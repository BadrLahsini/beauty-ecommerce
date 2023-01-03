import express from "express";
import {
  getProductById,
  getSubCategory,
  getCategory,
  getProductsInfo,
  getProductCategoryDetails,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProductsInfo);

router.get("/category/:id", getCategory);
router.get("/subcategory/:id", getSubCategory);
router.get("/:id", getProductById);
router.get("/categorydetails/:id", getProductCategoryDetails);

export default router;
