const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const {grpcUri} = require('./config');


const newsProtoPath = path.join(__dirname, '../server/protos/news.proto');
const newsProtoDefinition = protoLoader.loadSync(newsProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const newsProto = grpc.loadPackageDefinition(newsProtoDefinition).news;

const client = new newsProto.NewsService(grpcUri, grpc.credentials.createInsecure());


// Example usage of the client
const currentTime = new Date().toISOString();
const news = {
    date: currentTime,
    title: 'New Title - ' + currentTime,
    shortDescription: 'Braking news. - ' + currentTime,
    text: 'Detailed description of the news. - ' + currentTime
};

await client.CreateNews(news, (err, response) => {
    if (err) console.error(err);
    else console.log('News created with id: ', response.id);
});


const filterRequest = {
    sortBy: 'date',
    sortOrder: 'asc',
    filterBy: 'title',
    filterValue: 'New'
};

await client.GetNews(filterRequest, (err, response) => {
    if (err) console.error(err);
    else console.log('Filtered news: ', response.news);
});
