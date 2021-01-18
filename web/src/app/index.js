import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from './Components/App';
import '../styles/style.css'
// const App = React.lazy(() => import(/* webpackChunkName: "App" */'./Components/App'));
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import {
    addTodo,
    removeTodo,
    editTodo,
    completeTodo,
    showCompleted,
    addTag,
    removeTag,
    editTag,
    addTagForTodo,
    removeTagForTodo,
    fetchData,
    syncData
} from './redux/actionCreaters'
import logger from "redux-logger";
import rootReducer from "./redux/reducers";
import initialState from "./data";
import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(logger, sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

const mapStateToProps = state => ({
    todos: state.todos,
    tags: state.tags,
    show: state.showCompleted,
    isFetching: state.isFetching,
    isSyncing: state.isSyncing,
    isSyncRequired: state.isSyncRequired
})

const mapDispatchToProps = {
    addTodo,
    editTodo,
    removeTodo,
    completeTodo,
    showCompleted,
    addTag,
    removeTag,
    editTag,
    addTagForTodo,
    removeTagForTodo,
    fetchData,
    syncData
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)



const root = document.getElementById("root");
ReactDOM.render(<Provider store={store}><ConnectedApp /></Provider>, root);