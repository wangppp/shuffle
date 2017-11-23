import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducers as HomeReducer } from "./modules/home";
import thunkMiddleware from 'redux-thunk';

const reducer = combineReducers({
    home: HomeReducer
});

// 引用
export default createStore(reducer, applyMiddleware(thunkMiddleware));
