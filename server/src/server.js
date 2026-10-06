import "dotenv/config";
import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "TaskFlow API" }));
app.use("/api/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`TaskFlow API running at http://localhost:${port}`));
