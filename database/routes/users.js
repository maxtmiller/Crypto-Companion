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


module.exports = router;
