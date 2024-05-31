const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();  // Add this line to load environment variables

const app = express();
const PORT = process.env.PORT || 3000; // Set a default port if PORT environment variable is not specified
const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const API_KEY = process.env.HUGGINGFACE_API_KEY;  // Use environment variable

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/summarize', async (req, res) => {
    const { text } = req.body;

    try {
        const response = await axios.post(API_URL, { inputs: text }, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error summarizing text');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
