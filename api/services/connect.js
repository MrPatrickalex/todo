const mongoose = require("mongoose");

const connect = (logger, conn_str) => async () => {
    try {
        const connection = await mongoose.createConnection(conn_str);
        connection.on('error', (e) => logger.error("MongoDb error: " + e));
        connection.once('open', () => logger.info("Successfully connected to MongoDb"));
        connection.on('close', () => logger.info("Connection closed"));
        connection.on('disconnected', () => logger.info('Disconected from mongo'));

        const Todo = connection.model('Todo', require('../models/TodoSchema'));
        const Tag = connection.model('Tag', require('../models/TagSchema'));

        return {
            connection: connection,
            Todo: Todo,
            Tag: Tag
        };
    } catch (error) {
        logger.error(error);
    }
}

const disconnect = logger => async (connection) => {
    logger.info("Disconecting from mongo...")
    await connection.close();
}

module.exports = (logger, conn_str) => ({
    connect: connect(logger, conn_str),
    disconnect: disconnect(logger, conn_str)
});