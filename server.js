require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const { MongoClient, ServerApiVersion, GridFSBucket, ObjectId } = require("mongodb");
const { auth } = require("express-openid-connect");
const { CohereClientV2 } = require('cohere-ai');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken'); // Install this package if not already installed

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

app.use(cors());

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


// Load API key from environment variables
const apiKey = process.env.COHERE_API_KEY;
const cohere = new CohereClientV2({
    token: apiKey,
});


async function connectToDatabase() {
    try {
        if (!client.isConnected) {
            await client.connect();
            console.log("Successfully connected to MongoDB!");
        }
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    secret: process.env.AUTH0_CLIENT_SECRET
};

app.use(auth(config));


app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        const userName = req.oidc.user.sub;

        res.redirect('http://localhost:3001/?name=' + userName);

    } else {
        res.redirect('/login');
    }
});

// app.get('/', (req, res) => {
//     if (req.oidc.isAuthenticated()) {
//       const userName = req.oidc.user.sub;
  
//       // Set the cookie with the user information
//       res.cookie('userName', userName, { httpOnly: true, secure: true, sameSite: 'Strict' });
  
//       // Send a redirect to the frontend without the user info in the URL
//       res.redirect('http://localhost:3001');
//     } else {
//       res.redirect('/login');
//     }
//   });

app.post('/cohere-chat', async (req, res) => {
    try {

        const { userMessage } = req.body;
        if (!userMessage) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Define the system message context
        const systemMessage = `## Task and Context
        You are a specialist in all things finance, especially crypto and stocks.

        ## Style Guide
        Respond in short, clear, and concise sentences. Provide only the necessary information and avoid over-explaining. Dont reponse in markdown.
        Don't argue with the user. If the user is wrong, provide the correct information in a polite manner.`;

        // Construct the list of messages
        const messages = [
            { role: "system", content: systemMessage },
            { role: "user", content: userMessage },
        ];

        // Call Cohere's API
        const response = await cohere.chat({
            model: "command-r-plus-08-2024",
            messages: messages,
        });

        const responseMessage = response.message.content[0].text;

        // // Return the assistant's message as a JSON response
        res.json({ responseMessage });
    } catch (error) {
        console.error(`112: Error occurred: ${error.message}`);
        res.status(500).json({ error: "An error occurred while processing your message." });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});