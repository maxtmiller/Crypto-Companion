require("dotenv").config();
const express = require("express");
const path = require("path");
const multer = require('multer');
const fs = require('fs');
const { MongoClient, ServerApiVersion, GridFSBucket, ObjectId } = require("mongodb");
const { auth } = require("express-openid-connect");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));


const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
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


app.use(express.static(path.join(__dirname, 'public')));

const config = {
    authRequired: true,
    auth0Logout: true,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    secret: process.env.AUTH0_CLIENT_SECRET
};

app.use(auth(config));


app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        const userName = req.oidc.user.name;

        res.render('home', { userName });
    } else {
        res.redirect('/login');
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});