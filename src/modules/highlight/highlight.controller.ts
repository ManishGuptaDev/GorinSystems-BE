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
}
