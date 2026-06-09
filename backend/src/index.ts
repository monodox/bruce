import express from 'express';
import apiRoutes from './api/routes';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'bruce-backend' });
});

// Mount API routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Bruce Backend service listening on port ${PORT}`);
});
