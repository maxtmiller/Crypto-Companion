// Import .env file
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// set up express app
const app = express();
app.use(express.json());        // allows data in JSON format

app.use(cors());                // allow all origins for now

// add routes
import updatesRoutes from './routes/updates.js';
app.use('/updates', updatesRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
