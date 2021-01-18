const _ = require('lodash');

const getTodos = Todo => async () => {
    const todos = await Todo.find({}).lean();
    todos.forEach(todo => {
        console.log('TCL:', typeof todo.time);
    });
    return todos.map(todo => ({
        id: todo.id,
        title: todo.todo,
        done: todo.completed,
        progress: todo.progress,
        time: todo.time,
        tags: todo.tags
    }))
}

const addTodo = (Todo) => async (id, todo, tags = [], time = new Date(), completed = false, progress = 0) => {

    if (id === undefined)
        throw new Error("Todo Id not specifed");
    if (todo === undefined)
        throw new Error("Todo not specifed");

    const model = new Todo({
        id: id,
        todo: todo,
        tags: tags,
        time: time,
        completed: completed,
        progress: progress
    })

    return await model.save()
}

const removeTodo = (Todo) => async (id) => {

    if (id === undefined)
        throw new Error("Todo Id not specifed");

    return await Todo.findOneAndDelete({ id: id });
}

const updateTodo = (Todo) => async (id, newTodo, newTags) => {

    if (id === undefined)
        throw new Error("Todo Id not specifed");
    if (newTodo === undefined)
        throw new Error("New Todo not specifed");
    if (newTags === undefined)
        throw new Error("New tags not specifed");

    return await Todo.findOneAndUpdate({ id: id }, {
        todo: newTodo,
        tags: newTags
    });
}

const completeTodo = (Todo) => async (id, completed) => {

    if (id === undefined)
        throw new Error("Todo Id not specifed");
    if (completed === undefined)
        throw new Error("Completed not specifed");

    return await Todo.findOneAndUpdate({ id: id }, { completed: completed });
}

const addTagForTodo = (Todo) => async (todoId, tagId) => {

    if (todoId === undefined)
        throw new Error("Todo Id not specifed");
    if (tagId === undefined)
        throw new Error("Tag Id not specifed");

    const todo = await Todo.findOne({ id: todoId });

    return await Todo.findOneAndUpdate(
        { id: todoId },
        {
            tags: _.union(todo.tags, [tagId])
        });
}

const removeTagForTodo = (Todo) => async (todoId, tagId) => {

    if (todoId === undefined)
        throw new Error("Todo Id not specifed");
    if (tagId === undefined)
        throw new Error("Id not specifed");

    const todo = await Todo.findOne({ id: todoId });

    return await Todo.findOneAndUpdate(
        { id: todoId },
        {
            tags: todo.tags.filter(t => t !== tagId)
        });
}

const setTimeForTodo = (Todo) => async (todoId, newTime) => {

    if (todoId === undefined)
        throw new Error("Todo Id not specifed");
    if (newTime === undefined)
        throw new Error("Time not specifed");

    const todo = await Todo.findOne({ id: todoId });

    return await Todo.findOneAndUpdate(
        { id: todoId },
        {
            time: newTime
        });
}

const setProgressForTodo = (Todo) => async (todoId, newProgress) => {

    if (todoId === undefined)
        throw new Error("Todo Id not specifed");
    if (newProgress === undefined)
        throw new Error("Progress not specifed");

    const todo = await Todo.findOne({ id: todoId });

    return await Todo.findOneAndUpdate(
        { id: todoId },
        {
            progress: newProgress
        });
}

const getTags = (Tag) => async () => {

    const tags = await Tag.find({}).lean();

    return tags.map(tag => ({
        id: tag.id,
        tag: tag.tag,
        color: tag.color
    }));
}

const addTag = (Tag) => async (id, tag, color = "#000") => {

    if (id === undefined)
        throw new Error("Tag Id not specifed");
    if (tag === undefined)
        throw new Error("Tag not specifed");

    const model = new Tag({
        id: id,
        tag: tag,
        color: color,
    })

    return await model.save();
}

const removeTag = (Todo, Tag) => async (tagId) => {

    if (tagId === undefined)
        throw new Error("Tag Id not specifed");

    const removedTag = await Tag.findOneAndDelete({ id: tagId });

    const todos = await Todo.find({});

    await Promise.all(todos.map(async (todo) => {
        // todo.tags = todo.tags.filter(tag => tag !== tagId);
        await todo.save();
    }));

    return removedTag;
}

const updateTag = (Tag) => async (tagId, newTag, newColor) => {

    if (tagId === undefined)
        throw new Error("Tag Id not specifed");
    if (newTag === undefined)
        throw new Error("NEw Tag not specifed");
    if (newColor === undefined)
        throw new Error("New color not specifed");

    return await Tag.findOneAndUpdate({ id: tagId }, { tag: newTag, color: newColor });
}

module.exports = (Todo, Tag) => ({
    getTodos: getTodos(Todo),
    addTodo: addTodo(Todo),
    removeTodo: removeTodo(Todo),
    updateTodo: updateTodo(Todo),
    completeTodo: completeTodo(Todo),
    addTagForTodo: addTagForTodo(Todo),
    removeTagForTodo: removeTagForTodo(Todo),
    setTimeForTodo: setTimeForTodo(Todo),
    setProgressForTodo: setProgressForTodo(Todo),
    getTags: getTags(Tag),
    addTag: addTag(Tag),
    removeTag: removeTag(Todo, Tag),
    updateTag: updateTag(Tag)
})