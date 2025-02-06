import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT:z.string(),
    MONGO_DB_URL: z.string(),
    CLIENT_URL:z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const envVars = envSchema.parse(process.env);

export const envconfig = {
    port:Number(envVars.PORT)||3232,
    mongo_db_url: envVars.MONGO_DB_URL,
    nodeEnv: envVars.NODE_ENV,
    client_url:envVars.CLIENT_URL
};
