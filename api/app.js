const express = require('express');
const path = require("path");
const cors = require('cors')
const config = require("config");
// const todos = require('./routes/todos');
// const tags = require('./routes/tags');

// const PORT = config.get('Server.port');
// const CONNECTION_STRING = 
// process.env.MONGODB_URI = 

const app = express();
app.use(express.json());
app.use(cors());
// app.use(loggerMiddleware);
app.use(express.static(path.join(__dirname, '..', 'web', 'build')));
// app.use('/todos', todos);
// app.use('/tags', tags);

// logger
//     .clear()
//     .add(new winston.transports.Console())
//     .add(new winston.transports.File({ filename: 'app.log' }));

// app.listen(PORT, () => { logger.info(`Server started on port ${PORT}`) });

module.exports = app;