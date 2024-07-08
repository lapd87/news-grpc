const { MongoClient } = require('mongodb');
const {mongoUri} = require('../config');

let db;

async function connectDB() {
    if (!db) {
        const client = new MongoClient(mongoUri);
        await client.connect();
        db = client.db();
    }
    return db;
}


module.exports = { connectDB };
