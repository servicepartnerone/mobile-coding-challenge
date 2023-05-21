import {combineReducers, configureStore} from '@reduxjs/toolkit';
import photoReducer from './reducer';

const rootReducer = combineReducers({
  photo: photoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
