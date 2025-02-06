
import { describe, it } from "node:test";
import { CargoType } from "../models/costSchema";
import { CostServices } from "../services/costservice";
import assert from "node:assert";

describe("CostServices.calculateShippingCost", () => {
  it("should calculate the shipping cost based on volume for ContainerCargo", () => {
    const distance_km = 200;
    const cargoType = CargoType.ContainerCargo;
    const weight_kg = 0; 
    const volume_ltr = 10;
    
    const expectedCost = 110;
    const result = CostServices.calculateShippingCost(distance_km, cargoType, weight_kg, volume_ltr);

    assert.strictEqual(result,expectedCost);
  });

  it("should calculate the shipping cost based on weight for DryBulk", () => {
    const distance_km = 200;
    const cargoType = CargoType.DryBulk;
    const weight_kg = 50;
    const volume_ltr = 0;
    
    const expectedCost = 400; 
    const result = CostServices.calculateShippingCost(distance_km, cargoType, weight_kg, volume_ltr);

    assert.strictEqual(result,expectedCost);
  });

  it("should calculate the shipping cost based on weight or volume for Breakbulk", () => {
    const distance_km = 200;
    const cargoType = CargoType.Breakbulk;
    const weight_kg = 30;
    const volume_ltr = 0;
    
    const expectedCost = 300; 
    const result = CostServices.calculateShippingCost(distance_km, cargoType, weight_kg, volume_ltr);

    assert.strictEqual(result,expectedCost);
  });
});
