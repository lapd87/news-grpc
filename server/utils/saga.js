const { createLog } = require('../db/models/logs');


const logRequest = async (requestInfo) => {
    const log = {
        date: new Date().toISOString(),
        endpoint: requestInfo.endpoint,
        method: requestInfo.method,
        headers: requestInfo.headers,
        parameters: requestInfo.parameters,
        status: requestInfo.status,
        error: requestInfo.error || null,
        responseTime: requestInfo.responseTime
    };
    await createLog(log);
};


module.exports = { logRequest };
