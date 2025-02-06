import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { CargoType } from '../models/costSchema';

const cargoCostBodySchema = z.object({
    weight_kg: z.number().positive("Weight must be a positive number").optional(),
    volume_ltr: z.number().positive("Volume must be a positive number").optional(),
    distance_km: z.number().positive("Distance must be a positive number"),
    cargoType: z.nativeEnum(CargoType)
}).strict().refine(data => {
    // Ensure the right unit of measurement is sent based on the cargo type
    const cargoType = data.cargoType;
    if (cargoType === CargoType.ContainerCargo && !data.volume_ltr) return false;
    if (cargoType === CargoType.LiquidBulk && !data.volume_ltr) return false;
    if (cargoType === CargoType.DryBulk && !data.weight_kg) return false;
    if (cargoType === CargoType.Breakbulk && (!data.weight_kg && !data.volume_ltr)) return false;
    if (cargoType === CargoType.Livestock && !data.weight_kg) return false;
    if (cargoType === CargoType.Roro && !data.weight_kg) return false;
    if (cargoType === CargoType.RefrigeratedCargo && !data.volume_ltr) return false;
    return true;
}, {
    message: "Invalid unit of measurement for the specified cargo type",
    path: ["cargoType"]
});


export type CargoCostRequestType = z.infer<typeof cargoCostBodySchema>;

const validateCargoCostRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        cargoCostBodySchema.parse(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({
            message: "Validation failed",
            errors: error.errors,
        });
        return;
    }
};

export default validateCargoCostRequest;
