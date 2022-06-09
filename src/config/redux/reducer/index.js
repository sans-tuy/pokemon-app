import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'pokeReducer',
  initialState: {
    dataUser: [],
    urlPoke: '',
  },
  reducers: {
    saveUser: (state, action) => {
      state.dataUser = action.payload;
    },
    saveUrl: (state, action) => {
      state.urlPoke = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {saveUser, saveUrl} = counterSlice.actions;

export default counterSlice.reducer;
