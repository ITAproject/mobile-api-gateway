const express = require('express');
const router = express.Router();
const axios = require('axios');

const BASE_URL = 'http://localhost:8080/notifications';

// Route za pridobivanje vseh obvestil
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(BASE_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route za pridobivanje obvestil preko jms
router.get('/jms', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/jms/notifications');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route za pridobivanje obvestila po ID-ju
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
