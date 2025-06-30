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
app.use(cors());

app.use('/api/v1', router);

// app.get('/', (req: Request, res: Response) => {
//   res.send(`🚀 Server is running on port ${config.port}`);
// });


app.get('/', (req: Request, res: Response) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Server Status</title>
  <style>
    body {
      background: linear-gradient(135deg, #1e3c72, #2a5298);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      overflow: hidden;
      color: #fff;
    }

    .container {
      text-align: center;
      background: rgba(255, 255, 255, 0.08);
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 8px 20px rgba(255, 136, 0, 0.3);
      animation: pulse 2s infinite ease-in-out, float 4s ease-in-out infinite;
      position: relative;
    }

    .container::before,
    .container::after {
      content: '';
      position: absolute;
      width: 6px;
      height: 6px;
      background: orange;
      border-radius: 50%;
      animation: fire 1s infinite ease-in-out;
      opacity: 0.8;
    }

    .container::before {
      left: 20%;
      bottom: -10px;
      animation-delay: 0.2s;
    }

    .container::after {
      right: 20%;
      bottom: -10px;
      animation-delay: 0.6s;
    }

    h1 {
      font-size: 2.2rem;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      margin: 0;
    }

    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 20px rgba(255, 136, 0, 0.4);
        transform: scale(1);
      }
      50% {
        box-shadow: 0 0 30px rgba(255, 136, 0, 0.8);
        transform: scale(1.02);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }

    @keyframes fire {
      0% {
        transform: translateY(0) scale(1);
        opacity: 0.9;
      }
      50% {
        transform: translateY(-15px) scale(1.3);
        opacity: 0.5;
      }
      100% {
        transform: translateY(-30px) scale(0.8);
        opacity: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔥 Server is Running!</h1>
    <p>Listening on port <strong>${config.port}</strong></p>
  </div>
</body>
</html>
  `);
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
