import {
    ADD_TODO,
    ADD_TODOS,
    EDIT_TODO,
    REMOVE_TODO,
    COMPLETE_TODO,
    SHOW_COMPLTED_TODOS,
    IS_FETCHING,
    SYNC_DATA,
    ADD_TAG,
    ADD_TAGS,
    REMOVE_TAG,
    EDIT_TAG,
    ADD_TAG_FOR_TODO,
    REMOVE_TAG_FOR_TODO,
    FETCH_DATA,
    IS_SYNC_REQUIRED
} from "./actions";
import fetch from 'cross-fetch'
import { v4 } from "uuid";


export function addTodo(todo, tags = []) {
    return {
        type: ADD_TODO,
        id: v4(),
        date: new Date(),
        todo: todo,
        tags: tags,
        completed: false
    }
}


export function addTodos(todos = []) {
    return {
        type: ADD_TODOS,
        todos: todos,
    }
}

export function editTodo(id, newTodo, tags = []) {
    return {
        type: EDIT_TODO,
        id: id,
        newTodo: newTodo,
        newTags: tags
    }
}

export function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        id: id
    }
}

export function completeTodo(id, completed) {
    return {
        type: COMPLETE_TODO,
        id: id,
        completed: completed
    }
}

export function showCompleted(showCompleted) {
    return {
        type: SHOW_COMPLTED_TODOS,
        showCompleted: showCompleted
    }
}

export function isFetching(value) {
    return {
        type: IS_FETCHING,
        isFetching: value
    }
}

export function syncData(value) {
    return {
        type: SYNC_DATA,
        isSyncing: value
    }
}

export function isSyncReuired(value) {
    return {
        type: IS_SYNC_REQUIRED,
        isSyncRequired: value
    }
}

export function fetchData() {
    return {
        type: FETCH_DATA,
    }
}

export function addTag(tag, color = "#000") {
    return {
        type: ADD_TAG,
        id: v4(),
        tag: tag,
        color: color
    }
}

export function addTags(tags = []) {
    return {
        type: ADD_TAGS,
        tags
    }
}

export function removeTag(id) {
    return {
        type: REMOVE_TAG,
        id
    }
}

export function editTag(id, newTag, newColor) {
    return {
        type: EDIT_TAG,
        id,
        newTag,
        newColor
    }
}


export function addTagForTodo(id, tagId) {
    return {
        type: ADD_TAG_FOR_TODO,
        id,
        tagId
    }
}

export function removeTagForTodo(id, tagId) {
    return {
        type: REMOVE_TAG_FOR_TODO,
        tagId,
        id
    }
}