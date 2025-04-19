// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Utiles
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Enable CORS
app.use(cors({
  origin: "http://localhost:5174", // Allow frontend URL (adjust if needed)
  credentials: true, // Allow cookies to be sent (if needed)
}));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "backend/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));
