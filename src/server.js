import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://willowy-alpaca-5c6fb2.netlify.app/",
    ],
  }),
);
app.use(express.json());
app.use("/api/note", noteRoutes);

const PORT = process.env.PORT || 3001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`just testing ${PORT}`);
  });
});
