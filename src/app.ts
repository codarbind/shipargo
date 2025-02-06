import express, {Request,Response} from "express";

import { envconfig } from "./config/env";

import cors from "cors"
import { costController } from "./controllers/costcontroller";
import dbConnection from "./config/db";

const app = express()
app.use(express.json())
app.use(cors( {
  origin: envconfig.client_url,
  credentials:true
}))

dbConnection()


// health
app.get("/health",(req:Request, res:Response)=>{

  res.send('server running ok')
  return;
 
});


//cost Routes
app.post("/cargo/cost", costController);


export default app;