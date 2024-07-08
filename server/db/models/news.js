const { connectDB } = require('../../db');


const getNewsCollection = async () => {
    const db = await connectDB();
    return db.collection('news');
};

const createNews = async (news) => {
    const collection = await getNewsCollection();
    const result = await collection.insertOne(news);

    return result.insertedId;
};

const getNews = async (filter = {}, sort = {}) => {
    const collection = await getNewsCollection();

    return await collection.find(filter).sort(sort).toArray();
};


module.exports = { createNews, getNews };
