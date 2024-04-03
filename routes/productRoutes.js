const express = require('express');
const router = express.Router();
const axios = require('axios');

const BASE_URL = 'http://localhost:8081/products';

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(BASE_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get a product by ID
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/${productId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
