import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducers as HomeReducer } from "./modules/home"
import { reducers as LoginReducer } from "./modules/login"
import { reducers as ArticleReducer } from './modules/articles'
import MediaReducer from './modules/media/reducers';
import thunkMiddleware from 'redux-thunk';

const reducer = combineReducers({
  home: HomeReducer,
  login: LoginReducer,
  articles: ArticleReducer,
  media: MediaReducer,
});

// 引用
const configureStore = () => {
  const store = createStore(reducer, applyMiddleware(thunkMiddleware));

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept(reducer, () => {
        store.replaceReducer(reducer)
      })
    }
  }
  return store
}

export default configureStore
