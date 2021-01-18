import React, { useState, Fragment } from "react";
import Todo from "./Todo";
import TodoEdit from "./TodoEdit";

// const Todo = React.lazy(() => import(/* webpackChunkName: "Todo" */'./Todo'));
// const TodoEdit = React.lazy(() => import(/* webpackChunkName: "TodoEdit" */'./TodoEdit'));


const TodoComponent = (props) => {
    const [isEdit, setEdit] = useState(false);

    const onDone = (newTodo, newTags) => {
        props.onEdit(newTodo, newTags);
        setEdit(false);
    }

    const toggleEdit = () => {
        setEdit(true);
    }

    return <Fragment>
        {isEdit
            ? <TodoEdit {...props} onDone={onDone} />
            : <Todo {...props} toggleEdit={() => toggleEdit()} />}
    </Fragment>
}

export default TodoComponent;