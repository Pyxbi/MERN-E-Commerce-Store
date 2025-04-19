import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/productModel.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const sampleProducts = [
  {
    name: "Bánh Sữa chua",
    image: "/uploads/anh1.jpg",
    brand: "China",
    quantity: 50,
    category: new mongoose.Types.ObjectId(), // replace with actual Category _id if needed
    description: "Bánh ngon mềm ngọt",
    price: 500,
    countInStock: 10,
    rating: 4.8,
    numReviews: 12,
  },
  {
    name: "Bánh trứng",
    image: "/uploads/anh2.jpg",
    brand: "China",
    quantity: 50,
    category: new mongoose.Types.ObjectId(), // replace with actual Category _id if needed
    description: "Bánh trứng giòn tan ngọt lịm",
    price: 100,
    countInStock: 100,
    rating: 4.8,
    numReviews: 12,
  },
  {
    name: "Socola",
    image: "/uploads/anh3.jpg",
    brand: "China",
    quantity: 50,
    category: new mongoose.Types.ObjectId(), // replace with actual Category _id if needed
    description: "Socola ngon tuyệt vời",
    price: 500,
    countInStock: 10,
    rating: 4.8,
    numReviews: 12,
  },
  {
    name: "Mochi socola",
    image: "/uploads/anh4.jpg",
    brand: "China",
    quantity: 40,
    category: new mongoose.Types.ObjectId(),
    description: "Mochi mềm ụm ngon tuyệt",
    price: 129,
    countInStock: 8,
    rating: 4.6,
    numReviews: 9,
  },
  {
    name: "Xiên que",
    image: "/uploads/anh5.jpg",
    brand: "China",
    quantity: 40,
    category: new mongoose.Types.ObjectId(),
    description: "Que xiên cay cay ngon tuyệt",
    price: 89,
    countInStock: 8,
    rating: 4.6,
    numReviews: 9,
  },
];

const insertData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("🌱 Sample product data inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

insertData();
