// Import .env file & mongodb database url
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { CohereClientV2 } = require('cohere-ai');
const mongoString  = process.env.DATABASE_URL

const apiKey = process.env.COHERE_API_KEY;
const cohere = new CohereClientV2({
    token: apiKey,
});

// Connect to database
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})
// set up express app
const app = express();
app.use(express.json());        // allows data in JSON format

app.use(cors());                // allow all origins for now

// add routes
const userRoutes = require('./routes/users');
app.use('/user', userRoutes);

app.post('/cohere-chat', async (req, res) => {
    try {

        const { userMessage } = req.body;
        if (!userMessage) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const systemMessage = `## Task and Context
        You are a specialist in all things finance, especially crypto and stocks.

        ## Style Guide
        Respond in short, clear, and concise sentences. Provide only the necessary information and avoid over-explaining. Dont reponse in markdown.
        Don't argue with the user. If the user is wrong, provide the correct information in a polite manner.`;

        const messages = [
            { role: "system", content: systemMessage },
            { role: "user", content: userMessage },
        ];

        const response = await cohere.chat({
            model: "command-r-plus-08-2024",
            messages: messages,
        });

        const responseMessage = response.message.content[0].text;

        res.json({ responseMessage });
    } catch (error) {
        console.error(`112: Error occurred: ${error.message}`);
        res.status(500).json({ error: "An error occurred while processing your message." });
    }
});

app.post('/cohere-suggestion', async (req, res) => {
    try {

        const { userMessage } = req.body;
        if (!userMessage) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const systemMessage = `## Task and Context
        You are a specialist in all things finance, especially crypto and stocks.

        ## Style Guide
        Respond in a very short, and concise reponse. 
        Suggest 2 actions for the user to take to improve their portfolio, either including buying or selling for each.
        Explain why the user should take these actions.
        Make these customized so that each one is unique.
        Use markdown to format your response and each action on a different line.
        Don't include a title in your response.`;

        const messages = [
            { role: "system", content: systemMessage },
            { role: "user", content: userMessage },
        ];

        const response = await cohere.chat({
            model: "command-r-plus-08-2024",
            messages: messages,
        });

        const responseMessage = response.message.content[0].text;

        res.json({ responseMessage });
    } catch (error) {
        console.error(`112: Error occurred: ${error.message}`);
        res.status(500).json({ error: "An error occurred while processing your message." });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
