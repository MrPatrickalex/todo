export function apiFetchData(action) {
    return fetch(`http://localhost:3000/api/todos`)
        .then(response => response.json())
}

export function apiAddTodo(action) {
    return fetch(`http://localhost:3000/api/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: action.id,
            todo: action.todo,
            tags: action.tags,
            time: action.date,
            completed: action.completed
        })
    }).then(response => console.log('TCL:', response))
}

export function apiDeleteTodo(action) {
    return fetch(`http://localhost:3000/api/todos/` + action.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => console.log('TCL:', response))
}

export function apiAddTag(action) {
    return fetch(`http://localhost:3000/api/tags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: action.id,
            tag: action.tag,
            color: action.color,
        })
    }).then(response => console.log('TCL:', response))
}

export function apiDeleteTag(action) {
    return fetch(`http://localhost:3000/api/tags/` + action.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => console.log('TCL:', response))
}

export function apiUpdateTodo(action) {
    return fetch(`http://localhost:3000/api/todos/` + action.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newTodo: action.newTodo,
            newTags: action.newTags,
        })
    }).then(response => console.log('TCL:', response))
}

export function apiCompleteTodo(action) {
    return fetch(`http://localhost:3000/api/todos/completed/${action.id}/${action.completed}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => console.log('TCL:', response))
}

export function apiAddTagToTodo(action) {
    return fetch(`http://localhost:3000/api/todos/tags/${action.id}/${action.tagId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => console.log('TCL:', response))
}

export function apiRemoveTagToTodo(action) {
    return fetch(`http://localhost:3000/api/todos/tags/${action.id}/${action.tagId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => console.log('TCL:', response))
}

export function apiUpdateTag(action) {
    return fetch(`http://localhost:3000/api/tags/` + action.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newTag: action.newTag,
            newColor: action.newColor,
        })
    }).then(response => console.log('TCL:', response))
}