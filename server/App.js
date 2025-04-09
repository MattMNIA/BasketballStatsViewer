const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// NCAA basketball scoreboard endpoint


// Get scoreboard data
app.get('/api/games/mens/today', async (req, res) => {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const NCAA_API_URL = `https://data.ncaa.com/casablanca/scoreboard/basketball-men/d1/${year}/${month}/${day}/scoreboard.json`;

        try {
            const response = await axios.get(NCAA_API_URL);
            res.json(response.data);
        } catch (apiError) {
            // Check if it's a 404 error from NCAA API
            if (apiError.response && apiError.response.status === 404) {
                // Return empty games array instead of 404
                res.json({ games: [] });
            } else {
                // For other API errors, re-throw
                throw apiError;
            }
        }
    } catch (error) {
        console.error('Error fetching scoreboard data:', error);
        res.status(500).json({ error: 'Failed to fetch scoreboard data' });
    }
});

// Get scoreboard data
app.get('/api/games/mens/:year/:month/:day', async (req, res) => {
    try {
        const { year, month, day } = req.params;
        const NCAA_API_URL = `https://data.ncaa.com/casablanca/scoreboard/basketball-men/d1/${year}/${month}/${day}/scoreboard.json`;
        
        try {
            const response = await axios.get(NCAA_API_URL);
            res.json(response.data);
        } catch (apiError) {
            // Check if it's a 404 error from NCAA API
            if (apiError.response && apiError.response.status === 404) {
                // Return empty games array instead of 404
                res.json({ games: [] });
            } else {
                // For other API errors, re-throw
                throw apiError;
            }
        }
    } catch (error) {
        console.error('Error fetching scoreboard data:', error);
        res.status(500).json({ error: 'Failed to fetch scoreboard data' });
    }
});

// Get scoreboard data
app.get('/api/games/mens/test', async (req, res) => {
    
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const NCAA_API_URL = `https://data.ncaa.com/casablanca/scoreboard/basketball-men/d1/2025/04/01/scoreboard.json`;
        const response = await axios.get(NCAA_API_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching scoreboard data:', error);
        res.status(500).json({ error: 'Failed to fetch scoreboard data' });
    }
});

// Get scoreboard data
app.get('/api/games/womens/today', async (req, res) => {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const NCAA_API_URL = `https://data.ncaa.com/casablanca/scoreboard/basketball-women/d1/${year}/${month}/${day}/scoreboard.json`;

        try {
            const response = await axios.get(NCAA_API_URL);
            res.json(response.data);
        } catch (apiError) {
            // Check if it's a 404 error from NCAA API
            if (apiError.response && apiError.response.status === 404) {
                // Return empty games array instead of 404
                res.json({ games: [] });
            } else {
                // For other API errors, re-throw
                throw apiError;
            }
        }
    } catch (error) {
        console.error('Error fetching scoreboard data:', error);
        res.status(500).json({ error: 'Failed to fetch scoreboard data' });
    }
});

// Get scoreboard data
app.get('/api/games/womens/:year/:month/:day', async (req, res) => {
    try {
        const { year, month, day } = req.params;
        const NCAA_API_URL = `https://data.ncaa.com/casablanca/scoreboard/basketball-women/d1/${year}/${month}/${day}/scoreboard.json`;
        
        try {
            const response = await axios.get(NCAA_API_URL);
            res.json(response.data);
        } catch (apiError) {
            // Check if it's a 404 error from NCAA API
            if (apiError.response && apiError.response.status === 404) {
                // Return empty games array instead of 404
                res.json({ games: [] });
            } else {
                // For other API errors, re-throw
                throw apiError;
            }
        }
    } catch (error) {
        console.error('Error fetching scoreboard data:', error);
        res.status(500).json({ error: 'Failed to fetch scoreboard data' });
    }
});


// Get game stats
app.get('/api/stats/game/:id/:view', async (req, res) => {
    try {
        const { id, view } = req.params;
        const NCAA_API_URL = `https://ncaa-api.henrygd.me/game/${id}/${view}`;
        
        const response = await axios.get(NCAA_API_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching game stats:', error);
        res.status(500).json({ error: 'Failed to fetch game stats' });
    }
});

// Get game stats
app.get('/api/stats/game/:id/', async (req, res) => {
    try {
        const { id } = req.params;
        const NCAA_API_URL = `https://ncaa-api.henrygd.me/game/${id}/`;
        
        const response = await axios.get(NCAA_API_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching game stats:', error);
        res.status(500).json({ error: 'Failed to fetch game stats' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});