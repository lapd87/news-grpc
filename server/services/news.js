const grpc = require('@grpc/grpc-js');
const {createNews, getNews} = require('../db/models/news');
const {validator, newsSchema, querySchema} = require('../utils/validation');
const {logRequest} = require('../utils/saga');


const NewsService = {
    CreateNews: async (call, callback) => {
        const start = Date.now();
        const newsData = call.request;
        const {error} = validator(newsSchema, newsData);

        const createNewsLogObject = {
            endpoint: 'CreateNews',
            method: 'gRPC',
            headers: call.metadata.getMap(),
            parameters: newsData,
        };

        if (error) {
            await logRequest({
                ...createNewsLogObject,
                status: 'ERROR',
                error: error.details[0].message,
                responseTime: Date.now() - start
            });
            return callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: error.details[0].message
            });
        }

        try {
            const newsId = await createNews(newsData);
            await logRequest({
                ...createNewsLogObject,
                status: 'SUCCESS',
                responseTime: Date.now() - start
            });
            callback(null, {id:newsId});
        } catch (err) {
            await logRequest({
                ...createNewsLogObject,
                status: 'ERROR',
                error: err.message,
                responseTime: Date.now() - start
            });
            callback({
                code: grpc.status.INTERNAL,
                message: 'Internal server error'
            });
        }
    },
    GetNews: async (call, callback) => {
        const start = Date.now();
        const queryData = call.request;
        const {error} = validator(querySchema, queryData);

        const getNewsLogObject = {
            endpoint: 'GetNews',
            method: 'gRPC',
            headers: call.metadata.getMap(),
            parameters: queryData,
        };

        if (error) {
            await logRequest({
                ...getNewsLogObject,
                status: 'ERROR',
                error: error.details[0].message,
                responseTime: Date.now() - start
            });
            return callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: error.details[0].message
            });
        }

        const {filterBy, filterValue, sortBy, sortOrder} = queryData;
        const filter = {};
        const sort = {};

        if (filterBy && filterValue) {
            filter[filterBy] = new RegExp(filterValue, 'i');
        }

        if (sortBy) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        try {
            const newsList = await getNews(filter, sort);

            await logRequest({
               ...getNewsLogObject,
                status: 'SUCCESS',
                responseTime: Date.now() - start
            });

            callback(null, {news: newsList});
        } catch (err) {
            const responseTime = Date.now() - start;
            await logRequest({
                ...getNewsLogObject,
                status: 'ERROR',
                error: err.message,
                responseTime
            });

            callback({
                code: grpc.status.INTERNAL,
                message: 'Internal server error'
            });
        }
    }
};


module.exports = NewsService;
