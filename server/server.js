// server.js

import express from 'express';
import cors from 'cors';

import apiV1 from './src/api/v1/centralv1api/centralv1api.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'BookQubit API is running.',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1', apiV1);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.',
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BookQubit API listening on port ${PORT}`);
});