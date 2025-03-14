// require("dotenv").config();
// const express = require("express");
// const path = require("path");
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { auth } = require("express-openid-connect");
// const { CohereClientV2 } = require('cohere-ai');

// const app = express();
// app.use(bodyParser.json());

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'public', 'views'));


// const corsOptions = {
//     origin: 'https://crypto-companion-three.vercel.app',
//     credentials: true,
// };
// app.use(cors(corsOptions));


// const apiKey = process.env.COHERE_API_KEY;
// const cohere = new CohereClientV2({
//     token: apiKey,
// });


// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     baseURL: process.env.AUTH0_BASE_URL,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     issuerBaseURL: process.env.AUTH0_DOMAIN,
//     secret: process.env.AUTH0_CLIENT_SECRET
// };

// app.use(auth(config));


// app.get('/', (req, res) => {
//     if (req.oidc.isAuthenticated()) {
//         const userSub = req.oidc.user.sub;
//         const userID = userSub.split('|')[1];
//         const userName = req.oidc.user.nickname;

//         res.redirect('https://crypto-companion-three.vercel.app/?name=' + userName + '&userId=' + userID);

//     } else {
//         res.redirect('/login');
//     }
// });


// app.post('/cohere-chat', async (req, res) => {
//     try {

//         const { userMessage } = req.body;
//         if (!userMessage) {
//             return res.status(400).json({ error: 'Message is required' });
//         }

//         const systemMessage = `## Task and Context
//         You are a specialist in all things finance, especially crypto and stocks.

//         ## Style Guide
//         Respond in short, clear, and concise sentences. Provide only the necessary information and avoid over-explaining. Dont reponse in markdown.
//         Don't argue with the user. If the user is wrong, provide the correct information in a polite manner.`;

//         const messages = [
//             { role: "system", content: systemMessage },
//             { role: "user", content: userMessage },
//         ];

//         const response = await cohere.chat({
//             model: "command-r-plus-08-2024",
//             messages: messages,
//         });

//         const responseMessage = response.message.content[0].text;

//         res.json({ responseMessage });
//     } catch (error) {
//         console.error(`112: Error occurred: ${error.message}`);
//         res.status(500).json({ error: "An error occurred while processing your message." });
//     }
// });

// app.post('/cohere-suggestion', async (req, res) => {
//     try {

//         const { userMessage } = req.body;
//         if (!userMessage) {
//             return res.status(400).json({ error: 'Message is required' });
//         }

//         const systemMessage = `## Task and Context
//         You are a specialist in all things finance, especially crypto and stocks.

//         ## Style Guide
//         Respond in a very short, and concise reponse. 
//         Suggest 2 actions for the user to take to improve their portfolio, either including buying or selling for each.
//         Explain why the user should take these actions.
//         Make these customized so that each one is unique.
//         Use markdown to format your response and each action on a different line.
//         Don't include a title in your response.`;

//         const messages = [
//             { role: "system", content: systemMessage },
//             { role: "user", content: userMessage },
//         ];

//         const response = await cohere.chat({
//             model: "command-r-plus-08-2024",
//             messages: messages,
//         });

//         const responseMessage = response.message.content[0].text;

//         res.json({ responseMessage });
//     } catch (error) {
//         console.error(`112: Error occurred: ${error.message}`);
//         res.status(500).json({ error: "An error occurred while processing your message." });
//     }
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });