import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reduxSaga/reducers';
import rootSaga from '../reduxSaga/rootSaga';

const logger = createLogger({
    collapsed: true,
});

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const getMiddleware = () => {
        return applyMiddleware(sagaMiddleware, logger);
    };

    const store = createStore(
        reducer,
        initialState,
        getMiddleware(),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}