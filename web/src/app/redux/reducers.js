import {
    ADD_TODO,
    ADD_TODOS,
    EDIT_TODO,
    REMOVE_TODO,
    COMPLETE_TODO,
    SHOW_COMPLTED_TODOS,
    IS_FETCHING,
    ADD_TAG,
    ADD_TAGS,
    REMOVE_TAG,
    EDIT_TAG,
    ADD_TAG_FOR_TODO,
    REMOVE_TAG_FOR_TODO,
    SYNC_DATA,
    IS_SYNC_REQUIRED
} from "./actions";
import { v4 } from "uuid";

function todo(state = {}, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                id: action.id,
                time: action.date,
                completed: action.completed,
                todo: action.todo,
                tags: action.tags
            }
        case EDIT_TODO:
            return { ...state, todo: action.newTodo, tags: action.newTags }
        case COMPLETE_TODO:
            return { ...state, completed: action.completed }
        case ADD_TAG_FOR_TODO:
            return { ...state, tags: [...state.tags, action.tagId] }
        case REMOVE_TAG_FOR_TODO:
            return { ...state, tags: state.tags.filter(t => t !== action.tagId) }
    }
    return state;
}


function tag(state = {}, action) {
    switch (action.type) {
        case ADD_TAG:
            return {
                id: action.id,
                tag: action.tag,
                color: action.color
            }
        case EDIT_TAG:
            return {
                ...state,
                tag: action.newTag,
                color: action.newColor
            }
    }
    return state;
}


function rootReducer(state = {}, action) {
    switch (action.type) {
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SHOW_COMPLTED_TODOS:
            return {
                ...state,
                showCompleted: action.showCompleted
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    todo({}, action)
                ]
            }
        case ADD_TODOS:
            return {
                ...state,
                todos: action.todos
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(t => t.id !== action.id)
            }
        case EDIT_TODO:
        case COMPLETE_TODO:
        case ADD_TAG_FOR_TODO:
        case REMOVE_TAG_FOR_TODO:
            return {
                ...state,
                todos: state.todos.map(t => t.id === action.id
                    ? todo(t, action)
                    : t)
            }
        case ADD_TAG:
            return {
                ...state,
                tags: [
                    ...state.tags,
                    tag({}, action)
                ]
            }
        case ADD_TAGS:
            return {
                ...state,
                tags: action.tags
            }
        case REMOVE_TAG:
            return {
                ...state,
                todos: state.todos.map(t => todo(t, { type: REMOVE_TAG_FOR_TODO, tagId: action.id })),
                tags: state.tags.filter(t => t.id != action.id)
            }
        case EDIT_TAG:
            return {
                ...state,
                tags: state.tags.map(t => t.id === action.id
                    ? tag(t, action)
                    : t)
            }
        case SYNC_DATA:
            return {
                ...state,
                isSyncing: action.isSyncing
            }
        case IS_SYNC_REQUIRED:
            return {
                ...state,
                isSyncRequired: action.isSyncRequired
            }
    }
    return state;
}

export default rootReducer;