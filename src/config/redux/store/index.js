import {configureStore} from '@reduxjs/toolkit';
import pokeReducer from '../reducer';

export default configureStore({
  reducer: {
    poke: pokeReducer,
  },
});
