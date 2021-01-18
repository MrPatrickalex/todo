import { takeEvery, take, put, call, delay } from 'redux-saga/effects';
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
    FETCH_DATA,
    SYNC_DATA
} from "./actions";
import {
    apiAddTag,
    apiAddTagToTodo,
    apiAddTodo,
    apiCompleteTodo,
    apiDeleteTag,
    apiDeleteTodo,
    apiUpdateTag,
    apiUpdateTodo,
    apiRemoveTagToTodo,
    apiFetchData
} from '../api/api'
import {
    addTags,
    addTodos,
    isSyncReuired,
    isFetching
} from './actionCreaters'


function* updateResourse(apiCall, data) {
    for (let i = 0; i < 2; i++) {
        try {
            const apiResponse = yield call(apiCall, data);
            console.log('TCL: apiResponse', apiResponse);
            return apiResponse;
        } catch (error) {
            console.log('TCL: error in for loop' + error);
            if (i < 4)
                yield delay(500);
        }
    }
    throw new Error("API request failed")
}



function* updateApi(apiCall, data) {
    try {
        yield updateResourse(apiCall, data)
        yield put(isSyncReuired(false))
    } catch (error) {
        sync.push({
            apiCall,
            data
        })
        yield put(isSyncReuired(true))
    }
}


function* workerFetchData(action) {
    try {
        yield put(isFetching(true))
        const data = yield updateResourse(apiFetchData, action)
        yield put(addTags(data.tags))
        yield put(addTodos(data.todos))
        yield put(isFetching(false))
        // yield put(isSyncReuired(false))
    } catch (error) {
        console.log('TCL:', error);
        // yield put(isSyncReuired(true))
        yield put(isFetching(false))
    }
}

let sync = [];

function* syncData(action) {
    let currentApiCall;
    try {
        while (sync.length > 0) {
            currentApiCall = sync.shift();
            yield updateResourse(currentApiCall.apiCall, currentApiCall.data)
        }
        yield put(isSyncReuired(false))
    } catch (error) {
        console.log('TCL:', error);
        sync.unshift(currentApiCall);
        yield put(isSyncReuired(true))
    }
}

export default function* rootSaga() {

    yield takeEvery(ADD_TODO, function* (action) {
        yield updateApi(apiAddTodo, action)
    });

    yield takeEvery(EDIT_TODO, function* (action) {
        yield updateApi(apiUpdateTodo, action)
    });

    yield takeEvery(REMOVE_TODO, function* (action) {
        yield updateApi(apiDeleteTodo, action)
    });

    yield takeEvery(COMPLETE_TODO, function* (action) {
        yield updateApi(apiCompleteTodo, action)
    });

    yield takeEvery(ADD_TAG, function* (action) {
        yield updateApi(apiAddTag, action)
    });

    yield takeEvery(REMOVE_TAG, function* (action) {
        yield updateApi(apiDeleteTag, action)
    });

    yield takeEvery(EDIT_TAG, function* (action) {
        yield updateApi(apiUpdateTag, action)
    });

    yield takeEvery(ADD_TAG_FOR_TODO, function* (action) {
        yield updateApi(apiAddTagToTodo, action)
    });

    yield takeEvery(REMOVE_TAG_FOR_TODO, function* (action) {
        yield updateApi(apiRemoveTagToTodo, action)
    });

    yield takeEvery(FETCH_DATA, workerFetchData)

    yield takeEvery(SYNC_DATA, syncData)
}