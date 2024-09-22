import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import httpStatus from 'http-status';

import routes from "./routes";
import swaggerDocument from "./lib/swagger/swagger.json";
import prisma from "./lib/prismaClient"; // Import your Prisma Client instance
import { ApiError } from "@/lib/errors";
import { errorConverter, errorHandler } from '@/middlewares/error-handler';

// Setup .env variables for app usage
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app: Application = express();

/** Middlewares */
app.use(express.json()); // built-in middleware to parse the request body
app.use(morgan("tiny")); // used to log the HTTP requests
app.use(express.static("public")); // used to serve the static files

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// Start the server
const server = app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// Graceful shutdown
const shutdown = async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect(); // Disconnect Prisma Client
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

// Handle termination signals
process.on("SIGINT", shutdown); // Ctrl+C
process.on("SIGTERM", shutdown); // Termination signal
