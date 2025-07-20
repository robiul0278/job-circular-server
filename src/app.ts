import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import router from './app/routes';
import cookieParser  from "cookie-parser";
import config from './config';


// parsers
const app = express();
app.use(express.json());
app.use(cookieParser())

const corsOptions = {
  origin: '*', // ✅ must be a specific origin, not '*'
  //origin: 'http://localhost:3000', // ✅ must be a specific origin, not '*'
  //origin: 'https://diplomajobsbd.netlify.app', // ✅ must be a specific origin, not '*'
  credentials: true,               // ✅ allow cookies to be sent
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`🚀 Server is running on port ${config.port}`);
});


// Catch-all route for unsupported methods
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Can't find this ${req.originalUrl} on the server!`);
  (error as any).statusCode = 405;
  next(error); // Pass global error handler
});


// Global error handling middleware
app.use(globalErrorHandler)

export default app;
