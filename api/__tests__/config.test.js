const config = require("config");

describe("TodoApp Store Tests", () => {
    test("test config getting normaly ", () => {
        const CONNECTION_STRING = config.get('Db.conn_str');
        const PORT = config.get('Server.port');
        expect(CONNECTION_STRING).toBeDefined();
        expect(PORT).toBeDefined();
        expect(CONNECTION_STRING).toBe("mongodb+srv://mrpatrickalex:superparol20@cluster0.pgyzl.mongodb.net/todos_test?retryWrites=true&w=majority")
        expect(PORT).toBe(3002);
    });
});