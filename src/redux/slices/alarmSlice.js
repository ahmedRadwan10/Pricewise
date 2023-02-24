import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    shown: false,
    title: "",
    description: "",
};

export const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    showAlarm: (state) => {
      state.shown = true;
    },
    hideAlarm: (state) => {
      state.shown = false;
    },
    setAlarmDetails: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
    }
  }
});

export const { showAlarm, hideAlarm, setAlarmDetails } = alarmSlice.actions;

export default alarmSlice.reducer;