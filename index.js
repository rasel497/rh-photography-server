const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
require('colors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// connect database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mpr3cem.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function runDbConnect() {
    try {
        await client.connect();
        console.log('Database connected'.yellow.italic);
    }
    catch (error) {
        console.log(error.name.bgRed, error.message.bold, error.stack);
    }
}
runDbConnect();


// Basic initial setup
app.get('/', (req, res) => {
    res.send('RH-Photography is running');
})

app.listen(port, () => {
    console.log(`RH-Photography is running: ${port}`.cyan.bold);
})

