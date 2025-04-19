import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fs from "fs";
import { fileURLToPath } from "url"; // Add this for ESM path resolution

// Utilities
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

// ESM path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Serve uploads directory (create if it doesn't exist)
const uploadDir = path.join(__dirname, "backend/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// Serve static files from the frontend build folder
const frontendDir = path.resolve(__dirname, '../frontend/dist');
if (!fs.existsSync(frontendDir)) {
  console.error(`Frontend dist directory not found at ${frontendDir}`);
}
app.use(express.static(frontendDir));

// Debug endpoint to check frontend directory
app.get('/debug', (req, res) => {
  const frontendBaseDir = path.join(__dirname, '../frontend');
  const distDir = path.join(__dirname, '../frontend/dist');
  fs.readdir(frontendBaseDir, (err, frontendFiles) => {
    if (err) return res.send({ error: 'Frontend dir not found', message: err.message });
    fs.readdir(distDir, (err, distFiles) => {
      if (err) return res.send({ frontendFiles, distError: err.message });
      res.send({ frontendFiles, distFiles });
    });
  });
});

// Test API route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working' });
});

// Serve index.html for all other routes (for client-side routing)
app.get('*', (req, res) => {
  const filePath = path.join(frontendDir, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error(`Frontend index.html not found at ${filePath}`);
    return res.status(404).send('Frontend build not found. Please run npm run build in the frontend directory.');
  }
  res.sendFile(filePath);
});

app.listen(port, () => console.log(`Server running on port: ${port}`));