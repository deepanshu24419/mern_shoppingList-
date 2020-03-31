 import { createStore,applyMiddleware,compose} from 'redux';
 import thunk from 'redux-thunk';
 import rootReducer from './reducers';

 const initialState = {};

 const Middleware = [thunk];

 const store = createStore(
     rootReducer,
     initialState,
     compose(
         applyMiddleware(...Middleware),
         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
    
        )
 )

 export default store;