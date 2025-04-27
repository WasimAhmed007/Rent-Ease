const express = require('express');
const app = express();
app.use(express.json());
app.get('/api', (req, res) => res.json({ message: 'Hello from backend!' }));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Or, configure CORS for specific origins
app.use(cors({
  origin: 'https://example.com', // Allow only this origin
  methods: ['GET', 'POST'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true // Allow credentials (cookies, etc.)
}));

// Example route
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
const cors = require('cors');
app.use(cors());