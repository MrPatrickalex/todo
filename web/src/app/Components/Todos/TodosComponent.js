import React, { Suspense } from "react";
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
const TodoComponent = React.lazy(() => import(/* webpackChunkName: "TodoComponent" */'./TodoComponent'));

const TodosComponent = (props) => {
    return (
        props.isFetching
            ? <CircularProgress />
            : <List >
                {props.todos.map(todo => <Suspense key={todo.id} fallback={<Paper className="todo-item"><ListItem><CircularProgress /></ListItem></Paper>}>
                    <Paper className="todo-item">
                        <TodoComponent
                            todo={todo.todo}
                            time={todo.time}
                            completed={todo.completed}
                            allTags={props.tags}
                            tags={props.tags.filter(tag => todo.tags.indexOf(tag.id) !== -1)}
                            addTag={(tag) => props.addTag(tag)}
                            onEdit={(newTodo, newTags) => props.editTodo(todo.id, newTodo, newTags)}
                            onComplete={() => props.completeTodo(todo.id, !todo.completed)}
                            onRemove={() => props.removeTodo(todo.id)}
                            onRemoveTagForTodo={(tagId) => props.removeTagForTodo(todo.id, tagId)}
                            showCompleted={props.show}
                        />
                    </Paper>
                </Suspense>)}
            </List>
    )
}

export default TodosComponent;