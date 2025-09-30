// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const url = process.env.MONGO_URI
const client = new MongoClient(url)

await client.connect()

const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json());

app.get('/', async(req, res) => {
    const db = client.db('passly')
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray(); 
    res.json(findResult);
})

app.post('/', async(req, res) => {
    const password = req.body;
    const db = client.db('passly')
    const collection = db.collection('passwords');
    await collection.insertOne(password);
    res.send({success:true});
})

app.delete('/:id', async(req, res) => {
    let id = req.params.id;
    const db = client.db('passly')
    const collection = db.collection('passwords');
    // console.log(JSON.stringify(password));
    await collection.deleteOne({id});
    res.send({success:true});
})


app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedPassword = req.body;

    try {
        const db = client.db('passly');
        const collection = db.collection('passwords');

        await collection.updateOne(
            { id: id }, // filter 
            { $set: updatedPassword } // update 
        );

        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})