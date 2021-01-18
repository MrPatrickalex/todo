const ConnectionFactory = require("../connect");
const winston = require('winston');
const { logger } = require("../logger");
const config = require("config");

logger
    .clear()
    .add(new winston.transports.Console({ level: 'debug' }))

describe("TodoApp Store Tests", () => {
    test("connect test with no uri provided must failed", async () => {
        const { connect, disconnect } = ConnectionFactory(logger, "");
        try {
            await connect();
        } catch (error) {
            expect(error).not.toBeNull();
        }
    });
    test("connect test with uri ", async () => {
        const CONNECTION_STRING = config.get('Db.conn_str');
        console.log('TCL:', CONNECTION_STRING);
        const { connect, disconnect } = ConnectionFactory(logger, CONNECTION_STRING);
        const { connection, Todo, Tag } = await connect();

        expect(connection).not.toBeNull();
        expect(Todo).not.toBeNull();
        expect(Tag).not.toBeNull();

        await disconnect(connection);
    });

    // test("test query to mongo ", async () => {
    //     const CONNECTION_STRING = config.get('Db.conn_str');
    //     const { connect, disconnect } = ConnectionFactory(logger, CONNECTION_STRING);
    //     const { connection, Todo, Tag } = await connect();

    //     const model = new Todo({
    //         id: "1",
    //         todo: "todo",
    //         tags: [],
    //         time: new Date(),
    //         completed: false
    //     })

    //     await model.save();

    //     const todo = await Todo.findOne({ id: "1" });

    //     expect(todo).not.toBeNull();
    //     expect(todo.todo).toBe("todo");

    //     await Todo.remove({});
    //     await Tag.remove({});

    //     await disconnect(connection);
    // });
});