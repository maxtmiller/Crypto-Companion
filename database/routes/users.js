const express = require('express');
const Model = require('../models/userModel');
const router = express.Router();

// Register (create user) Method
router.post('/register', async (req, res) => {
    const { userid, username } = req.body;

    try {
        const possibleUser = await Model.findOne({ username });

        if (possibleUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const data = new Model({
            userid,
            username,
            history: [],
            portfolio: []
        });

        await data.save();
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get Portfolio (by userid)
router.get('/:userid/portfolio', async (req, res) => {
    const { userid } = req.params;

    try {
        const user = await Model.findOne({ userid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ portfolio: user.portfolio });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get History (by userid)
router.get('/:userid/history', async (req, res) => {
    const { userid } = req.params;

    try {
        const user = await Model.findOne({ userid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ history: user.history });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Add/Subtract (by userid)
router.put('/:userid/portfolio', async (req, res) => {
    const { userid } = req.params;
    const { name, amount } = req.body;

    if (!name || amount === undefined) {
        return res.status(400).json({ message: "Both 'name' and 'amount' fields are required." });
    }

    try {
        const user = await Model.findOne({ userid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update portfolio
        const portfolio = user.portfolio;
        const stockIndex = portfolio.findIndex(stock => stock[0] === name);

        if (stockIndex === -1 && amount > 0) {
            // Add new stock
            portfolio.push([name, amount]);
        } else if (stockIndex !== -1) {
            // Update existing stock
            portfolio[stockIndex][1] = Number(portfolio[stockIndex][1]) + Number(amount);

            // Remove stock if the quantity becomes 0 or less
            if (portfolio[stockIndex][1] <= 0) {
                portfolio.splice(stockIndex, 1);
            }
        } else {
            return res.status(400).json({ message: "Cannot subtract from non-existing amount" });
        }

        // Save updated portfolio
        user.portfolio = portfolio;
        await user.save();

        res.status(200).json({ message: "Portfolio updated successfully", portfolio });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update user's history with portfolio value
router.post('/:userid/history/update', async (req, res) => {
    const { userid } = req.params;

    try {
        // Fetch the user
        const user = await Model.findOne({ userid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract cryptocurrency names from the user's portfolio
        const cryptoIds = user.portfolio.map(([crypto]) => crypto).join(',');

        let totalValue = 0;

        if (cryptoIds) {
            // Fetch current prices from CoinGecko
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': process.env.GECKO_KEY,
                },
            };
            
            const response = await fetch(url, options);

            if (response.ok) {
                const priceData = await response.json();

                // map prices
                const priceMap = {};
                priceData.forEach((coin) => {
                    priceMap[coin.id] = coin.current_price;
                });

                // calculate total portfolio value
                user.portfolio.forEach(([crypto, quantity]) => {
                    const price = priceMap[crypto];
                    if (price !== undefined) {
                        totalValue += quantity * price;
                    }
                });
            } else {
                console.error("Failed to fetch prices from CoinGecko:", response.statusText);
            }
        }

        // Append current date and total value to history
        const currentDate = new Date().toISOString();
        user.history.push([currentDate, totalValue]);

        // Save updated user to the database
        await user.save();

        res.status(200).json({
            message: "History updated successfully",
            portfolioValue: totalValue,
            history: user.history
        });
    } catch (error) {
        console.error("Error updating history:", error.message);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
