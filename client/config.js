module.exports = {
    grpcUri: process.env.GRPC_URI || require("../server/config").grpcUri || "127.0.0.1:50051",
};
