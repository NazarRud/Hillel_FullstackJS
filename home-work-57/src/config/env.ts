import process from "node:process";

export const env = {
    port: Number(process.env.PORT) || 3000,
    maxBodySize: Number(process.env.MAX_BODY_SIZE) || 1024 * 1024 
};