import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    labo: {
      type: String,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },

    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
