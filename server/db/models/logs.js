const { connectDB } = require('../../db');


const getLogsCollection = async () => {
    const db = await connectDB();
    return db.collection('logs');
};

const createLog = async (log) => {
    const collection = await getLogsCollection();
    await collection.insertOne(log);
};


module.exports = { createLog };
