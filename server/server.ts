import express from 'express';
import { parse } from 'url';
import next from 'next';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';

// Extract port and environment settings
const port = parseInt(process.env['PORT'] || '3000', 10);
const dev = process.env.NODE_ENV !== 'production'; // Check if in development mode
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Enable response compression to improve performance
  server.use(compression());
  // TODO: Config Security middleware for HTTP headers with strict settings
  server.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"], // Allow resources from the same origin
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // Only use this if inline scripts are needed; try to avoid
          "'unsafe-eval'", // Sometimes required for frameworks like Next.js in dev mode
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'", // Allow inline styles (required for Next.js SSR styles)
        ],
        fontSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'], // Allow images from the same origin and inline images (data URIs)
        connectSrc: ["'self'"], // Allow WebSocket connections in development
      },
    }),
  );
  // TODO: Config CORS middleware with strict origin control
  server.use(
    cors({
      origin: process.env['ALLOWED_ORIGINS'] || 'http://localhost:3000', // Allow only specified origins
      credentials: true, // Allow credentials like cookies to be sent with requests
      methods: 'GET',
    }),
  );

  // HTTP request logging middleware for monitoring
  server.use(morgan('combined'));
  server.disable('x-powered-by');
  // Handle all routes and forward to Next.js request handler
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Start the server and handle potential startup errors
  server
    .listen(port, () => {
      console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
    })
    .on('error', (err) => {
      console.error('Failed to start server:', err);
    });
});
