import React, { useState, Suspense, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const InputComponent = React.lazy(() => import(/* webpackChunkName: "InputComponent" */'./Input/InputComponent'));
const TagsComponent = React.lazy(() => import(/* webpackChunkName: "TagsComponent" */'./Tags/TagsComponent'));
const TodosComponent = React.lazy(() => import(/* webpackChunkName: "TodosComponent" */'./Todos/TodosComponent'));

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        margin: '0 auto',
        backgroundColor: theme.palette.background.paper,
    },
    inputPaper: {
        padding: 5
    },
    inputTodo: {
        width: '100%'
    },
}));

const App = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.fetchData();
    }, [])

    const { todos } = props;
    const [tagId, setTagId] = useState("");
    return (<Suspense fallback={<div>Loading...</div>}>
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <InputComponent
                                onAdd={(todo, tags) => props.addTodo(todo, tags)}
                                onShowCompleted={(show2) => props.showCompleted(show2)}
                                show={props.show}
                                syncData={() => props.syncData()}
                                tags={props.tags}
                                addTag={props.addTag}
                                isSyncing={props.isSyncing}
                                isSyncRequired={props.isSyncRequired} />
                        </Suspense>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper>
                        <Suspense fallback={<div>Loading...</div>}>
                            <TagsComponent {...props} onFilter={(tagId) => setTagId(tagId)} />
                        </Suspense>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TodosComponent
                            {...props}
                            todos={tagId !== "" ? todos.filter(todo => todo.tags.some(id => tagId === id)) : todos} />
                    </Suspense>
                </Grid>
            </Grid>
        </Container>
    </Suspense >)
}


export default App;