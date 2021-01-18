const ConnectionFactory = require("../connect");
const TodoFactory = require("../todos");
const { logger } = require("../logger");
const winston = require('winston');
const { v4 } = require('uuid')
const config = require("config");


logger
    .clear()
    .add(new winston.transports.Console({ level: 'info' }))

const CONNECTION_STRING = config.get('Db.conn_str');
let { connect, disconnect } = ConnectionFactory(logger, CONNECTION_STRING);
let Todo;
let Tag;
let connection;
let repository;

describe("TodoApp Store Tests", () => {
    beforeAll(async () => {
        const conn = await connect();
        Todo = conn.Todo;
        Tag = conn.Tag;
        connection = conn.connection;
        repository = TodoFactory(Todo, Tag);
        await Todo.remove({});
        await Tag.remove({});
    })

    afterAll(async () => {
        await disconnect(connection);
    });

    afterEach(async () => {
        await Todo.remove({});
        await Tag.remove({});
    });

    test("Add todo test", async () => {
        const id = v4()
        await repository.addTodo(id, "todo", [], new Date(), false);
        const todoFromDb = await Todo.findOne({ id: id })
        expect(todoFromDb).not.toBeNull();
        expect(todoFromDb.todo).toBe("todo");
    });
    test("Add todo with non existing tags is not creating new tags", async () => {
        await repository.addTodo("1", "todo", ["1", "2", "3"], new Date(), false);
        const todoFromDb = await Todo.findOne({ id: "1" }).lean();
        expect(todoFromDb.tags).toEqual([]);
    });
    test("Add todo with few existing tags", async () => {
        await repository.addTag("1", "#tag1", "#000");
        await repository.addTag("2", "#tag2", "#000");
        await repository.addTodo("1", "todo", ["1", "2", "3"], new Date(), false);
        const todoFromDb = await Todo.findOne({ id: "1" }).lean();
        expect(todoFromDb.tags).toContain("1");
        expect(todoFromDb.tags).toContain("2");
    });
    test("get todos test", async () => {
        await repository.addTodo(v4(), "todo-1", [], new Date(), false);
        await repository.addTodo(v4(), "todo-2", [], new Date(), false);
        await repository.addTodo(v4(), "todo-3", [], new Date(), false);
        const todos = await repository.getTodos();
        const todosFromDb = await Todo.find({})
        expect(todos.length).toEqual(todosFromDb.length);
        expect(todos[0].todo).toEqual("todo-1");
        expect(todos[1].todo).toEqual("todo-2");
        expect(todos[2].todo).toEqual("todo-3");
    });
    test("remove todo test", async () => {
        const id = v4()
        await repository.addTodo(id, "todo", [], new Date(), false);
        await repository.removeTodo(id);
        const todoFromDb = await Todo.findOne({ id: id });
        const todosFromDb = await Todo.find({});
        expect(todoFromDb).toBeNull();
        expect(todosFromDb).toEqual([]);
    });
    test("update todo test", async () => {
        const id = v4()
        await repository.addTodo(id, "todo", [], new Date(), false);
        await repository.updateTodo(id, "todo-new", []);
        const todoFromDb = await Todo.findOne({ id: id });
        expect(todoFromDb.todo).toEqual("todo-new");
    });
    test("update todo test with non existing tags", async () => {
        const id = v4()
        await repository.addTodo(id, "todo", [], new Date(), false);
        await repository.updateTodo(id, "todo-new", ["1", "2", "3"]);
        const todoFromDb = await Todo.findOne({ id: id }).lean();
        expect(todoFromDb.tags).toEqual([]);
    });
    test("update todo test with existing tags", async () => {
        const id = v4()
        await repository.addTodo(id, "todo", [], new Date(), false);
        await repository.addTag("1", "#tag", "#000");
        await repository.updateTodo(id, "todo-new", ["1", "2", "3"]);
        const todoFromDb = await Todo.findOne({ id: id }).lean();
        expect(todoFromDb.tags).toEqual(["1"]);
    });
    test("Add tag for todo", async () => {
        await repository.addTag("1", "#tag", "#000");
        await repository.addTodo("1", "todo", [], new Date(), false);
        await repository.addTagForTodo("1", "1");
        const todoFromDb = await Todo.findOne({ id: "1" }).lean();
        expect(todoFromDb.tags).toEqual(["1"]);
    });
    test("Add non existing tag for todo", async () => {
        // await repository.addTag("1", "#tag", "#000");
        await repository.addTodo("1", "todo", [], new Date(), false);
        await repository.addTagForTodo("1", "1");
        const todoFromDb = await Todo.findOne({ id: "1" }).lean();
        expect(todoFromDb.tags).toEqual([]);
    });
    test("Remove tag for todo", async () => {
        await repository.addTag("1", "#tag1", "#000");
        await repository.addTag("2", "#tag2", "#000");
        await repository.addTodo("1", "todo", ["1", "2"], new Date(), false);
        let todoFromDb = await Todo.findOne({ id: "1" }).lean();
        expect(todoFromDb.tags).toContain("1");
        expect(todoFromDb.tags).toContain("2");
        await repository.removeTagForTodo("1", "1");
        todoFromDb = await Todo.findOne({ id: "1" }).lean();
        expect(todoFromDb.tags).toEqual(["2"]);
        // await repository.addTagForTodo("1", "1");
    });
    test("Remove non existing tag for todo", async () => {
        await repository.addTag("1", "#tag1", "#000");
        await repository.addTag("2", "#tag2", "#000");
        await repository.addTodo("1", "todo", ["1", "2"], new Date(), false);
        await repository.removeTagForTodo("1", "33");
        let todoFromDb = await Todo.findOne({ id: "1" }).lean();
        expect(todoFromDb.tags.length).toBe(2);
        expect(todoFromDb.tags).toContain("1");
        expect(todoFromDb.tags).toContain("2");
    });
    test("add tag test", async () => {
        await repository.addTag("1", "#tag", "#000");
        const tagFromDb = await Tag.findOne({ id: "1" })
        expect(tagFromDb).not.toBeNull();
        expect(tagFromDb.tag).toBe("#tag");
        expect(tagFromDb.color).toBe("#000");
    });
    test("update tag test", async () => {
        await repository.addTag("1", "#tag", "#000");
        await repository.updateTag("1", "#new-tag", "#AAA");
        const tagFromDb = await Tag.findOne({ id: "1" })
        expect(tagFromDb).not.toBeNull();
        expect(tagFromDb.tag).toBe("#new-tag");
        expect(tagFromDb.color).toBe("#AAA");
    });
    test("update non existing tag test", async () => {
        await repository.addTag("1", "#tag", "#000");
        await repository.updateTag("2", "#new-tag", "#AAA");
        const tagFromDb = await Tag.findOne({ id: "1" })
        const tagsFromDb = await Tag.find({});
        expect(tagFromDb).not.toBeNull();
        expect(tagFromDb.tag).toBe("#tag");
        expect(tagFromDb.color).toBe("#000");
        expect(tagsFromDb.length).toBe(1);
    });

    test("get all tags test", async () => {
        await repository.addTag("1", "#tag1", "#00A");
        await repository.addTag("2", "#tag2", "#0AB");
        await repository.addTag("3", "#tag3", "#AB0");
        const tagsFromDb = await repository.getTags();
        expect(tagsFromDb.length).toBe(3);
    });

    test("remove tag/from all todos", async () => {
        await repository.addTag("1", "#tag1", "#00A");
        await repository.addTag("2", "#tag2", "#0AB");
        await repository.addTag("3", "#tag-to-delete", "#AB0");
        await repository.addTodo("1", "todo-1", ["1", "2"], new Date(), false);
        await repository.addTodo("2", "todo-2", ["2", "3"], new Date(), false);
        await repository.addTodo("3", "todo-3", ["1", "2", "3"], new Date(), false);

        await repository.removeTag("3");
        const tagsFromDb = await repository.getTags();
        const todosFromDb = await repository.getTodos();

        expect(tagsFromDb.length).toBe(2);

        expect(todosFromDb[0].tags.length).toBe(2);
        expect(todosFromDb[0].tags).toContain("1");
        expect(todosFromDb[0].tags).toContain("2");
        expect(todosFromDb[0].tags).not.toContain("3");

        expect(todosFromDb[1].tags.length).toBe(1);
        expect(todosFromDb[1].tags).toContain("2");
        expect(todosFromDb[0].tags).not.toContain("3");

        expect(todosFromDb[2].tags.length).toBe(2);
        expect(todosFromDb[2].tags).toContain("1");
        expect(todosFromDb[2].tags).toContain("2");
        expect(todosFromDb[0].tags).not.toContain("3");
    });
});