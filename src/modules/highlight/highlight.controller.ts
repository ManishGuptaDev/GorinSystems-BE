import { type NextFunction, type Request } from "express";
import httpStatus from 'http-status';

import Api from "@/lib/api";
import { HightlightResponse } from "@/types/common.type";
import HighlightService from "./highlight.service";
import { Highlight } from "@prisma/client";

export default class HighlightController extends Api {
  private readonly highlightService = new HighlightService();

  public getAll = async (req: Request, res: HightlightResponse<Highlight>, next: NextFunction) => {
    try {
      const items = await this.highlightService.getAll();
      this.send(res, items, httpStatus.OK, true, "items retrieved successfully");
    } catch (error) {
      next(error)
    }
  };  

  public create = async (req: Request, res: HightlightResponse<Highlight>, next: NextFunction) => {
    try {
      const { text, order } = req.body;
      const item = await this.highlightService.post(text, order);
      this.send(res, item, httpStatus.OK, true, "item created successfully");
    } catch (error) {
      next(error)
    }
  };

  public update = async (req: Request, res: HightlightResponse<Highlight>, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { text, order } = req.body;
      const item = await this.highlightService.updateById(parseInt(id), text, order);
      this.send(res, item, httpStatus.OK, true, "item updated successfully");
    } catch (error) {
      next(error)
    }
  };

}
