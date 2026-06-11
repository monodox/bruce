import express from 'express'
import cors from 'cors'
import apiRoutes from './api/routes.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'bruce-backend', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api', apiRoutes)

app.listen(PORT, () => {
  console.log(`Bruce Backend listening on port ${PORT}`)
})
