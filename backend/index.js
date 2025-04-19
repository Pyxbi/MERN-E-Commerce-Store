// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


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


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "backend/uploads")));


// Serve static files from the frontend build folder
const frontendDir = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDir));

// Test API route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working' });
});

// Serve index.html for all other routes (for client-side routing)
app.get('*', (req, res) => {
  const filePath = path.join(frontendDir, 'index.html');
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Frontend build not found. Please run npm run build in the frontend directory.');
  }
  res.sendFile(filePath);
});
app.listen(port, () => console.log(`Server running on port: ${port}`));
