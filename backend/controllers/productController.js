import Product from "../models/product.js";
import asyncHandler from "express-async-handler";

const getProductsInfo = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  var result = [];
  for (var i = 0; i < categories.length; i++) {
    const sub = await Product.distinct("subCategory", {
      category: categories[i],
    });
    result.push({
      nom: categories[i],
      subCategories: sub,
    });
  }
  res.json(result);
});

const getProductCategory = async (req, res, filter) => {
  const pageSize = 40;
  const page = Number(req.query.page) || 1;

  let keyword = req.query.keyword
    ? {
        nom: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : filter;

  if (req.query.marque) {
    keyword = { ...keyword, labo: req.query.marque };
  }

  if (req.query.subCategory) {
    keyword = { ...keyword, subCategory: req.query.subCategory };
  }

  console.log(keyword);

  let sortQuery = {};
  if (req.query.sort) {
    switch (req.query.sort) {
      case "nom":
        sortQuery = { nom: 1 };
        break;
      case "nomdesc":
        sortQuery = { nom: -1 };
        break;
      case "prix":
        sortQuery = { prix: 1 };
        break;
      case "prixdesc":
        sortQuery = { prix: -1 };
        break;
    }
  }

  const count = await Product.countDocuments(keyword);
  console.log(count);
  const products = await Product.find(keyword)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sortQuery);

  if (products) {
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("categorie non disponible");
  }
};

const getCategory = asyncHandler(async (req, res) => {
  getProductCategory(req, res, { category: req.params.id });
});

const getSubCategory = asyncHandler(async (req, res) => {
  getProductCategory(req, res, { subCategory: req.params.id });
});

const getProductCategoryDetails = asyncHandler(async (req, res) => {
  const filter = req.query.isSub
    ? {
        subCategory: req.params.id,
      }
    : req.query.keyword
    ? {
        nom: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {
        category: req.params.id,
      };
  console.log(filter);

  const subCategories = await Product.distinct("subCategory", filter);
  const marques = await Product.distinct("labo", filter);
  if (marques || subCategories) {
    res.json({ subCategories, marques });
  } else {
    res.status(404);
    throw new Error("marques et preoccupations non disponible");
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Produit non disponible");
  }
});

export {
  getProductById,
  getSubCategory,
  getCategory,
  getProductsInfo,
  getProductCategoryDetails,
};
