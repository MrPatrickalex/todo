const { v4 } = require('uuid');

const tags = [
    { id: "1", tag: "#tag1", color: "#F33" },
    { id: "2", tag: "#tag2", color: "#000" },
    { id: "3", tag: "#tag3", color: "#E2b" },
]

const todos = [
    {
        id: "1",
        todo: "todo-1 asdfasdfsadg dsf fdfgsdf dsfg dsfgf asd asdfsadf asdfsadf fsadf df dsf sdffasdf asdf",
        tags: [tags[0].id, tags[1].id],
        time: new Date(),
        completed: false
    },
    // {
    //     id: v4(),
    //     todo: "todo-2 asdfasdfg dsf fdfgs",
    //     tags: [tags[1], tags[2], tags[3]],
    //     time: new Date(),
    //     completed: false
    // },
    // {
    //     id: v4(),
    //     todo: "todo-1 asdfasdfsadg dsf fdfgsdf dsfg dsfgf asd asdfsadf asdfsadf fsadf df dsf sdffasdf asdf",
    //     tags: [tags[0], tags[2], tags[4]],
    //     time: new Date(),
    //     completed: false
    // },
    // {
    //     id: v4(),
    //     todo: "todo-2 asdfasdfg dsf fdfgs",
    //     tags: [tags[1], tags[2], tags[3]],
    //     time: new Date(),
    //     completed: false
    // }
]

module.exports = {
    tags: tags,
    todos: todos
}
