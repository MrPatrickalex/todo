import { v4 } from "uuid";

const tags = [
    { id: v4(), tag: "#tag1", color: "#F33" },
    { id: v4(), tag: "#tag2", color: "#000" },
    { id: v4(), tag: "#tag3", color: "#E2b" },
    { id: v4(), tag: "#tag4", color: "#F332" },
    { id: v4(), tag: "#tag5", color: "#AE2" },
]

const todos = [
    {
        id: v4(),
        todo: "todo-1 asdfasdfsadg dsf fdfgsdf dsfg dsfgf asd asdfsadf asdfsadf fsadf df dsf sdffasdf asdf",
        tags: [tags[0].id, tags[2].id, , tags[4].id]
    },
    {
        id: v4(),
        todo: "todo-2 asdfasdfg dsf fdfgs",
        tags: [tags[1].id, tags[2].id, tags[3].id]
    },
    {
        id: v4(),
        todo: "todo-1 asdfasdfsadg dsf fdfgsdf dsfg dsfgf asd asdfsadf asdfsadf fsadf df dsf sdffasdf asdf",
        tags: [tags[0].id, tags[2].id, , tags[4].id]
    },
    {
        id: v4(),
        todo: "todo-2 asdfasdfg dsf fdfgs",
        tags: [tags[1].id, tags[2].id, tags[3].id]
    },
]

// export default {
//     showCompleted: true,
//     isFetching: false,
//     todos: todos,
//     tags: tags
// }

export default {
    showCompleted: true,
    isFetching: false,
    isSyncing: false,
    isSyncRequired: false,
    todos: [],
    tags: []
}
