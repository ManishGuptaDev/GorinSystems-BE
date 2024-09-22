import { Router, Request, Response } from "express";

const router = Router();

// import categoryController from "../modules/category/category.route";

router.get("/health", (req: Request, res: Response) => {
  // #swagger.tags = ['Health']
  // #swagger.description = 'Responds with 200 OK if the service is up'
  // #swagger.summary = 'Get health status'

  return res.sendStatus(200);
});

router.get("/v1/helloWorld", async (req: Request, res: Response) => {
  /**
   * #swagger.tags = ['HelloWorld']
   * #swagger.summary = 'Get Hello World message'
   */
  return res.status(200).json({
    message: "Hello World from v1 with AWS CI/CD with .env file!!",
  });
});

// router.use("/v1/categories", categoryController);

export default router;
