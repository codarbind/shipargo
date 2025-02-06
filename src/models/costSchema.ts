import { model, Schema } from "mongoose";

export enum CargoType {
  ContainerCargo = "container",
  LiquidBulk = "liquid_bulk",
  DryBulk = "dry_bulk",
  Breakbulk = "breakbulk",
  Livestock = "livestock",
  Roro = "ro_ro",
  RefrigeratedCargo = "refrigerated"
}


export interface IShippingCost extends Document {
  weight_kg: number;
  volume_ltr: number;
  distance_km: number;
  cargoType: CargoType;
  cost_usd: number;
}


const ShippingCostSchema = new Schema<IShippingCost>({
  weight_kg: { type: Number, required: true, default:0 },
  volume_ltr: { type: Number, required: true, default:0 },
  distance_km: { type: Number, required: true },
  cargoType: { type: String, enum: Object.values(CargoType), required: true },
  cost_usd: { type: Number, required: true }
});


ShippingCostSchema.index({ volume:1, weight: 1, distance: 1, cargoType: 1 });


export const ShippingCost = model<IShippingCost>('ShippingCost', ShippingCostSchema);