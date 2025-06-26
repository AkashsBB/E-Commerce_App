import express from "express"
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import paymentRoutes from "./routes/payment.route.js";

import {connectDB} from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); //root of application

app.use(cors({
  origin: ["http://localhost:5173"], // allow your frontend dev server
  credentials: true, // allow cookies to be sent/received
}));

app.use(express.json({limit: "10mb"})); // allows parse body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cart", cartRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (_req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);

  connectDB();
});