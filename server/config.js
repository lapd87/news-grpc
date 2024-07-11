module.exports = {
    mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/newsGRPC',
    grpcUri: process.env.GRPC_URI || '127.0.0.1:50051',
};
