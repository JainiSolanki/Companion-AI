import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  notifications: [],
  isLoading: false,
  activeTab: "login",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const {
  setTheme,
  addNotification,
  removeNotification,
  setLoading,
  setActiveTab,
} = uiSlice.actions;

export default uiSlice.reducer;
