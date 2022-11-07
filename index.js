const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('colors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// Basic initial setup
app.get('/', (req, res) => {
    res.send('RH-Photography is running');
})

app.listen(port, () => {
    console.log(`RH-Photography is running: ${port}`.cyan.bold);
})

