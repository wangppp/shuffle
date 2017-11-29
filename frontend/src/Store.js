import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducers as HomeReducer } from "./modules/home";
import {reducers as LoginReducer} from "./modules/login";
import thunkMiddleware from 'redux-thunk';

const reducer = combineReducers({
    home: HomeReducer,
    login: LoginReducer
});

// 引用
export default createStore(reducer, applyMiddleware(thunkMiddleware));
