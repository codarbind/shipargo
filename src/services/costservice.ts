import { CargoType } from "../models/costSchema";


export const CostServices= {
   
  calculateShippingCost : (distance_km: number, cargoType: CargoType,weight_kg: number,volume_ltr:number=1 ): number => {

    const baseRates: { [key in CargoType]: number } = {
        [CargoType.ContainerCargo]: 1.1,
        [CargoType.LiquidBulk]: 1.3,
        [CargoType.DryBulk]: 0.8,
        [CargoType.Breakbulk]: 1.0,
        [CargoType.Livestock]: 1.5,
        [CargoType.Roro]: 1.2,
        [CargoType.RefrigeratedCargo]: 1.4
    };

 
    const baseRate = baseRates[cargoType];
    const volumeBasedCargoTypes = [CargoType.ContainerCargo, CargoType.LiquidBulk, CargoType.RefrigeratedCargo];
    const weightBasedCargoTypes = [CargoType.DryBulk, CargoType.Livestock, CargoType.Roro]

    let cost = 0;
    if (volumeBasedCargoTypes.includes(cargoType)) {
        cost = baseRate * (volume_ltr as number) * distance_km * 0.05; // Volume-based calculation
    } else if (weightBasedCargoTypes.includes(cargoType)) {
        cost = baseRate * (weight_kg as number) * distance_km * 0.05; // Weight-based calculation
    } else if (cargoType === CargoType.Breakbulk) {
        cost = baseRate * ((weight_kg || volume_ltr) as number) * distance_km * 0.05; // Weight or Volume-based calculation


  }
      return cost;
  }
}
