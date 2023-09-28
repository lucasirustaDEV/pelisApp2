import { configureStore } from '@reduxjs/toolkit'
import moviesReducers from './reducers/moviesReducers';

const store = configureStore({
  reducer: {
    moviesReducers : moviesReducers
  },
});

export default store