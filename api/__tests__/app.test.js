const app = require('../app');
const request = require('supertest');
const config = require("config");
const { logger, loggerMiddleware } = require("../services/logger");
const ConnectionFactory = require("../services/connect");
const TodoFactory = require("../services/todos");
const TodosRoutesFactory = require('../routes/todos');
const TagsRoutesFactory = require('../routes/tags');
const { fake, mock } = require('sinon');

const CONNECTION_STRING = config.get('Db.conn_str');
const PORT = config.get('Server.port');

logger
    .clear()
    .add(new winston.transports.Console({ level: 'info' }))

app.use(loggerMiddleware);

const todo = { id: "1", todo: "todo-1", completed: false, tags: [] };
const tag = { id: "1", tag: "#tag", color: "#000" };

const todoService = {}

// const { connect, disconnect } = ConnectionFactory(logger, CONNECTION_STRING);
// const { connection, Todo, Tag } = connect();
// const todoService = TodoFactory(Todo, Tag);

const todosRouter = TodosRoutesFactory(todoService, logger);
const tagsRouter = TagsRoutesFactory(todoService, logger);

describe("App API tests", () => {
    let server;
    beforeAll(() => {
        server = app.listen(PORT);
    });
    afterAll(() => {
        server.close(done);
    });
    describe("/todos API tests", () => {
        test("get /todos", async () => {
            todoService.getTodos = fake.returns([todo, todo, todo]);

            const res = await request(app)
                .get('/todos')

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('todos');
            expect(res.body.todos.length).toEqual(3);
        });

        test("post todo regular return 200", async () => {
            todoService.addTodo = fake.returns(todo);
            const res = await request(app)
                .post('/todos')
                .send({
                    id: "1",
                    todo: "todo-test",
                    tags: [],
                    time: new Date(),
                    completed: false
                });
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('todo');
        });
        test("post empty todo return 500", async () => {
            todoService.addTodo = fake.throws("id not specifed")
            const res = await request(app)
                .post('/todos')
                .send({});
            expect(res.statusCode).toEqual(500)
            expect(res.body).not.toHaveProperty('todo');
        });
        test("delete todo with specified id", async () => {
            todoService.removeTodo = fake.returns(todo);
            const res = await request(app)
                .delete('/todos/1');

            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('todo');
            expect(res.body.todo.todo).toEqual(todo.todo);
        });
        test("delete non existing todo", async () => {
            todoService.removeTodo = fake.returns(undefined);
            const res = await request(app)
                .delete('/todos/999');
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('todo');
            expect(res.body.todo).toBe(undefined);
        });
        test("delete todo with not specifed id", async () => {
            todoService.removeTodo = fake.throws("id not specified");
            const res = await request(app)
                .delete('/todos');
            expect(res.statusCode).toEqual(500)
        });
        test("update existing todo", async () => {
            todoService.updateTodo = fake.returns(todo);
            const res = await request(app)
                .put('/todos/1');
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('todo');
            expect(res.body.todo).toBe(todo.todo);
        });
        test("update non existing todo", async () => {
            todoService.updateTodo = fake.returns(undefined);
            const res = await request(app)
                .put('/todos/999');
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('todo');
            expect(res.body.todo).toBe(undefined);
        });
        test("update todo with not specifed id", async () => {
            todoService.updateTodo = fake.throws("asdasd");
            const res = await request(app)
                .put('/todos');
            expect(res.statusCode).toEqual(500)
        });
        test("complete existing todo", async () => {
            todoService.completeTodo = fake.returns(todo);
            const res = await request(app)
                .put('/todos/completed/1/true');
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('todo');
            expect(res.body.todo).toBe(todo.todo);
        });
        test("complete non existing todo", async () => {
            todoService.completeTodo = fake.returns(undefined);
            const res = await request(app)
                .put('/todos/completed/999/true');
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('todo');
            expect(res.body.todo).toBe(undefined);
        });
        test("complete non existing todo", async () => {
            todoService.completeTodo = fake.throws("asdasd");
            const res = await request(app)
                .put('/todos/completed/999/');
            expect(res.statusCode).toEqual(500)
        });
        test("add tag for todo", async () => {
            todoService.addTagForTodo = fake.returns(todo);
            const res = await request(app)
                .put('/tags/1/2/');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('todo');
            expect(res.body.todo).toBe(todo.todo);
        });
        test("add tag for todo not specifed todoId and tagId", async () => {
            todoService.addTagForTodo = fake.throws("sad");
            const res = await request(app)
                .put('/tags/');
            expect(res.statusCode).toEqual(500);
        });
        test("add tag for todo not specifed tagId", async () => {
            todoService.addTagForTodo = fake.throws("sad");
            const res = await request(app)
                .put('/tags/1/');
            expect(res.statusCode).toEqual(500);
        });
        test("remove tag for todo", async () => {
            todoService.removeTagForTodo = fake.returns(todo);
            const res = await request(app)
                .delete('/tags/1/2/');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('todo');
            expect(res.body.todo).toBe(todo.todo);
        });
        test("remove tag for todo not specifed todoId and tagId", async () => {
            todoService.removeTagForTodo = fake.throws("sad");
            const res = await request(app)
                .delete('/tags/');
            expect(res.statusCode).toEqual(500);
        });
        test("remove tag for todo not specifed tagId", async () => {
            todoService.removeTagForTodo = fake.throws("sad");
            const res = await request(app)
                .delete('/tags/1/');
            expect(res.statusCode).toEqual(500);
        });
    });

    describe("/tags API tests", () => {
        test("get /tags", async () => {
            todoService.getTags = fake.returns([tag, tag, tag]);

            const res = await request(app)
                .get('/tags')

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('tags');
            expect(res.body.todos.length).toEqual(3);
        });
        test("post tag regular return 200", async () => {
            todoService.addTag = fake.returns(tag);
            const res = await request(app)
                .post('/tags')
                .send({
                    id: "1",
                    tag: "#tag",
                    color: "#000"
                });
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('tag');
            expect(res.body.tag).toBe(tag.tag);
        });
        test("post tag with empty req body return 500", async () => {
            todoService.addTag = fake.throws("");
            const res = await request(app)
                .post('/tags')
                .send({});
            expect(res.statusCode).toEqual(500)
        });
        test("update tag normaly returns 200", async () => {
            todoService.updateTag = fake.returns({
                id: 1,
                newTag: "#newtag",
                newColor: "#A68"
            });
            const res = await request(app)
                .put('/tags/1')
                .send({
                    newTag: "#newtag",
                    newColor: "#A68"
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('tag');
            expect(res.body.tag.tag).toBe("#newtag");
            expect(res.body.tag.color).toBe("#A68");
        });
        test("update tag empty body 500", async () => {
            todoService.updateTag = fake.throws("asd");
            const res = await request(app)
                .put('/tags/1')
                .send({});
            expect(res.statusCode).toEqual(500);
        });
        test("update tag empty id 500", async () => {
            todoService.updateTag = fake.throws("asd");
            const res = await request(app)
                .put('/tags')
                .send({});
            expect(res.statusCode).toEqual(500);
        });
        test("delete tag normaly 200", async () => {
            todoService.removeTag = fake.returns(tag);
            const res = await request(app)
                .delete('/tags/1');
            expect(res.statusCode).toEqual(200);
            expect(res.body.tag).toBe(tag.tag);
        });
        test("delete non existing tag 200", async () => {
            todoService.removeTag = fake.returns(undefined);
            const res = await request(app)
                .delete('/tags/999');
            expect(res.statusCode).toEqual(200);
            expect(res.body).not.toBeDefined();
        });
        test("delete tag not specifed id", async () => {
            todoService.removeTag = fake.throws("asd");
            const res = await request(app)
                .delete('/tags');
            expect(res.statusCode).toEqual(500);
        });
    });
});