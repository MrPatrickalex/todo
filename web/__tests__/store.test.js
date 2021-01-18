import {
    addTodo,
    removeTodo,
    editTodo,
    completeTodo,
    showCompleted,
    fetchTodos,
    addTag,
    removeTag,
    editTag,
    addTagForTodo,
    removeTagForTodo,
} from "../src//app//redux/actionCreaters";
import { createStore } from 'redux'
import rootReducer from "../src/app/redux/reducers2";

const initialState = {
    showCompleted: true,
    isFetching: false,
    todos: [],
    tags: []
};
let store;

describe("TodoApp Store Tests", () => {
    beforeEach(() => {
        store = createStore(rootReducer, initialState);
    });
    test("Add 3 todo", () => {
        store.dispatch(addTodo("todo-1"));
        store.dispatch(addTodo("todo-2"));
        store.dispatch(addTodo("todo-3"));
        expect(store.getState().todos.length).toEqual(3);
    });
    test("Test clear store from test to test", () => {
        expect(store.getState().todos.length).toEqual(0);
    });
    test("Remove todo", () => {
        store.dispatch(addTodo("todo-1"));
        store.dispatch(addTodo("todo-2"));
        store.dispatch(addTodo("todo-3"));
        const todo1 = store.getState().todos[0];
        const todo2 = store.getState().todos[1];
        const todo3 = store.getState().todos[2];
        store.dispatch(removeTodo(todo2.id));
        expect(store.getState().todos[0].id).toEqual(todo1.id);
        expect(store.getState().todos[1].id).toEqual(todo3.id);
    });
    test("Edit todo", () => {
        store.dispatch(addTodo("todo-1"));
        expect(store.getState().todos[0].todo).toBe("todo-1");
        const todoToEdit = store.getState().todos[0];
        store.dispatch(editTodo(todoToEdit.id, "todo-edit"));
        expect(store.getState().todos[0].todo).toBe("todo-edit");
    });
    test("Hash tag add test", () => {
        store.dispatch(addTag("#tag", "#000"));
        expect(store.getState().tags.length).toBe(1);
        expect(store.getState().tags[0].tag).toBe("#tag");
        expect(store.getState().tags[0].color).toBe("#000");
    });
    test("Add hash tag to existing todo", () => {
        store.dispatch(addTodo("todo-1"));
        const todo = store.getState().todos[0];
        store.dispatch(addTagForTodo(todo.id, "123"))
        expect(store.getState().todos[0].tags[0]).toBe("123");
        expect(store.getState().todos[0].tags.length).toBe(1);
    });
    test("Remove hash tag from existing todo", () => {
        store.dispatch(addTodo("todo-1", ["123", "456"]));
        const todo = store.getState().todos[0];
        store.dispatch(removeTagForTodo(todo.id, "456"))
        expect(store.getState().todos[0].tags.length).toBe(1);
        expect(store.getState().todos[0].tags[0]).toBe("123");
        expect(store.getState().todos[0].tags[1]).toBe(undefined);
    });
    test("Remove hash tag for all todos", () => {
        store.dispatch(addTodo("todo-1", ["a123", "345-to-delete-567", "a345"]));
        store.dispatch(addTodo("todo-2", ["b123", "b345"]));
        store.dispatch(addTodo("todo-3", ["c123", "345-to-delete-567"]));
        store.dispatch(removeTag("345-to-delete-567"));

        expect(store.getState().todos[0].tags.length).toBe(2);
        expect(store.getState().todos[0].tags[0]).toBe("a123");
        expect(store.getState().todos[0].tags[1]).toBe("a345");

        expect(store.getState().todos[1].tags.length).toBe(2);
        expect(store.getState().todos[1].tags[0]).toBe("b123");
        expect(store.getState().todos[1].tags[1]).toBe("b345");

        expect(store.getState().todos[2].tags.length).toBe(1);
        expect(store.getState().todos[2].tags[0]).toBe("c123");
    });

    test("Edit hash tag", () => {
        store.dispatch(addTag("test-to-edit", "#000"))
        const tag = store.getState().tags[0];

        store.dispatch(editTag(tag.id, "test-to-new", "#A234"));

        expect(store.getState().tags[0].tag).toBe("test-to-new");
        expect(store.getState().tags[0].color).toBe("#A234");
    });
});