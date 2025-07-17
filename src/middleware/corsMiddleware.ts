import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const allowedOriginsEnv = process.env.CORS_ALLOWED_ORIGINS;

const allowedOrigins = allowedOriginsEnv === '*'
  ? '*'
  : allowedOriginsEnv ? allowedOriginsEnv.split(',').map(origin => origin.trim()) : [];

const corsMiddleware = cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
});

export default corsMiddleware; 