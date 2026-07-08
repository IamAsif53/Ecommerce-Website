import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config({ path: "./.env" });
const updateProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const result = await Product.updateMany(
      {},
      {
        $set: {
          sold: 0,
          rating: 0,
          numReviews: 0,
          discount: 0,
          featured: false,
          isActive: true,
          brand: "",
        },
      },
    );

    console.log("=================================");
    console.log("Products Updated Successfully");
    console.log(result);
    console.log("=================================");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

updateProducts();
