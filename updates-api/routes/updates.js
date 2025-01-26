import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/crypto-updates', async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({ error: 'Please provide an array of cryptocurrency IDs in the "ids" query parameter.' });
    }

    // Convert the array into a comma-separated string
    const cryptoIds = Array.isArray(ids) ? ids.join(',') : ids;

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&ids=${cryptoIds}&price_change_percentage=24h`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.GECKO_KEY,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    // map data
    const result = data.reduce((map, coin) => {
      map[coin.name] = `${coin.price_change_percentage_24h > 0 ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%`;
      return map;
    }, {});

    res.json(result); 
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;
