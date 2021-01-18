const app = require('./app');
const config = require("config");
const winston = require('winston');
const { logger, loggerMiddleware } = require("./services/logger");
const ConnectionFactory = require("./services/connect");
const TodoFactory = require("./services/todos");
const TodosRoutesFactory = require('./routes/todos');
const TagsRoutesFactory = require('./routes/tags');

const CONNECTION_STRING = config.get('Db.conn_str');
const PORT = config.get('Server.port');

logger
    .clear()
    .add(new winston.transports.Console({ level: 'info' }))
    .add(new winston.transports.File({ filename: 'app.log' }));

app.use(loggerMiddleware);

const { connect, disconnect } = ConnectionFactory(logger, CONNECTION_STRING);


async function run() {
    try {
        const { connection, Todo, Tag } = await connect();

        const todoService = TodoFactory(Todo, Tag);

        const todosRouter = TodosRoutesFactory(todoService, logger);
        const tagsRouter = TagsRoutesFactory(todoService, logger);

        app.use('/todos', todosRouter);
        app.use('/tags', tagsRouter);

        server = app.listen(PORT, () => { logger.info(`Server started on port ${PORT}`) });
    } catch (error) {
        logger.error(`connection error: ${error}`);
        await disconnect(connection);
    }
}

run();