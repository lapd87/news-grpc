const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const {grpcUri} = require('./config');
const newsService = require('./services/news');


const newsProtoPath = path.join(__dirname, 'protos', 'news.proto');
const newsProtoDefinition = protoLoader.loadSync(newsProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const newsProto = grpc.loadPackageDefinition(newsProtoDefinition).news;

const server = new grpc.Server();
server.addService(newsProto.NewsService.service, newsService);

server.bindAsync(grpcUri, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`gRPC server running at ${grpcUri}`);
});