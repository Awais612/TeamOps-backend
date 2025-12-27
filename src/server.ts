import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import chalk from "chalk";
import * as swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger";
import { animateText } from "./utils/loggers/starLogger";
import healthRoute from "./routes/health.route";

dotenv.config();
import { connectDB } from "./config/db";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use("/", healthRoute);

const startServer = async () => {
  try {
    const stopAnimation = animateText("bzc 7262");

    await connectDB();

    stopAnimation();

    console.log(chalk.greenBright("\n✅ MongoDB connected successfully!"));

    const PORT = process.env.PORT || 3030;
    app.listen(PORT, () => {
      console.log(chalk.cyanBright(`🚀 Server running on port ${PORT}`));
    });
  } catch (err) {
    console.error(chalk.red("❌ Failed to start server"), err);
    process.exit(1);
  }
};

startServer();
