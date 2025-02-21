import { config } from "dotenv";
// Load environment variables from the correct .env file
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
// Properly destructure all required environment variables
const { PORT, NODE_ENV, MONGO_URI } = process.env; 
// Ensure MONGO_URI is correctly exported
export default {
    PORT,
    NODE_ENV,
    MONGO_URI,
};
export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const JWT_EXPIRE = process.env.JWT_EXPIRE|| '1d'