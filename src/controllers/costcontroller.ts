import { Request, Response } from "express";
import { CostServices } from "../services/costservice";
import { ShippingCost } from "../models/costSchema";
import validateCargoCostRequest from "../validations/costrequest";


export const costController =[validateCargoCostRequest, async (req: Request, res: Response) => {

  const { volume, weight, distance, cargoType } = req.body;

  const cost = CostServices.calculateShippingCost( distance, cargoType,weight,volume);

  const shippingCost = new ShippingCost({ weight, distance, cargoType, cost, volume});
  await shippingCost.save();

  res.json(shippingCost );
}]