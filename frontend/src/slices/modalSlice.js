import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: '',
  editedChannelId: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action) => {
      const data = action.payload;
      state.activeModal = data.activeModal;
      state.editedChannelId = data.editedChannelId;
      return state;
    },
  },
});

export const { setModal, setEditedChannelId, setShowModal, setHideModal } = modalSlice.actions;

export default modalSlice.reducer;