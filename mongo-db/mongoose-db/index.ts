import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});