const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const res = require('express/lib/response');
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

async function run() {

    try {
        const serviceCollection = client.db('rhPhotography').collection('services');
        const reviewCollection = client.db('rhPhotography').collection('reviews');


        // get all data using Find Multiple option
        app.get('/services', async (req, res) => {
            const size = parseInt(req.query.size);
            const query = {}
            const cursor = serviceCollection.find(query).sort({ date: -1 });
            const services = await cursor.limit(size).toArray();
            res.send(services);
        });
        // loaded single data
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query)
            res.send(service);
        });

        // review get or read data 
        app.get('/reviews', async (req, res) => {
            const query = {}
            const cursor = reviewCollection.find(query).sort({ date: -1 });
            const review = await cursor.toArray();
            res.send(review);
        });

        // add review data post or create
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { serviceId: id }
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        });

        // add Myreview data post or create
        // myReviews/${user.uid}
        app.get('/myReviews/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { userUid: id }
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        });

        // --------------------POST DATA---------------------------//
        // create post with add new service
        app.post('/services', async (req, res) => {
            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        });

        // review data post or create
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });

        // Delete item
        app.delete('/reviews/:id', async (req, res) => {
            const { id } = req.params;
            const result = await reviewCollection.deleteOne({ _id: ObjectId(id) });
            res.send(result);
        });


        // 04.Update or Edit review data
        app.get('/review/:id', async (req, res) => {
            const { id } = req.params;
            const result = await reviewCollection.findOne({ _id: ObjectId(id) });
            res.send(result)
        })
    }

    finally {

    }
}

run().catch(err => console.error(err));


// Basic initial setup
app.get('/', (req, res) => {
    res.send('RH-Photography is running');
})

app.listen(port, () => {
    console.log(`RH-Photography is running: ${port}`.cyan.bold);
})

