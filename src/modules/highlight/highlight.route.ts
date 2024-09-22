import express, { Router, Request, Response } from "express";
import Controller from "./highlight.controller";

const highlight: Router = express.Router();
const controller = new Controller();

// Middleware to add Swagger annotations
const swaggerMiddleware = (req: Request, res: Response, next: Function) => {
  /**
   * #swagger.tags = ['Highlight']
   */
  next(); // Call the next middleware or route handler
};

highlight.get("/", swaggerMiddleware, async (req, res, next) => {

  return controller.getAll(req, res, next);
});


highlight.post("/", swaggerMiddleware, async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Not Implemented" });
});


highlight.delete("/{id}", swaggerMiddleware, async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Not Implemented" });
});

export default highlight;
