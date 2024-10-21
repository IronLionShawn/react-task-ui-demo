import { createSlice } from '@reduxjs/toolkit'
import { AppModalState } from '../../types/modal.types';

const initialState: AppModalState = {
    show: false,
    title: '',
    content: '',
    response: null
}

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
        state.response = null;
        state.actions = action.payload.actions;
        state.title = action.payload.title;
        state.content = action.payload.content;
        state.show = true;
    },
    closeModal: (state, action) => {
        state.show = false;
        state.actions = [];
        state.content = '';
        state.title = '';
        state.response = action.payload;
    },
    resetResponse: (state) => {
        state.response = null;
    }
  }
});

export const { openModal, closeModal, resetResponse } = modal.actions

export default modal.reducer
