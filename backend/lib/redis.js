import dotenv from 'dotenv';
dotenv.config();
import { Redis } from '@upstash/redis';

// Initialize Redis instance
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});