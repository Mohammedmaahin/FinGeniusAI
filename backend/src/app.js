import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import compression from "compression";
import rateLimit from "express-rate-limit";
import financialScoreRoutes from "./routes/financialScore.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import testRoutes from "./routes/test.routes.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(compression());
app.use(limiter);

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use(errorHandler);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/goals", goalRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/financial-score",financialScoreRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/test", testRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "FinGeniusAI API Running"
    });
});

export default app;