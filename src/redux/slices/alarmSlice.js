import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alarmShown: false,
    alarmTitle: "",
    alarmDescription: "",
};

export const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    showAlarm: (state) => {
      state.alarmShown = true;
    },
    hideAlarm: (state) => {
      state.alarmShown = false;
    },
    setAlarmDetails: (state, action) => {
      state.alarmTitle = action.payload.title;
      state.alarmDescription = action.payload.description;
    }
  }
});

export const { showAlarm, hideAlarm, setAlarmDetails } = alarmSlice.actions;

export default alarmSlice.reducer;