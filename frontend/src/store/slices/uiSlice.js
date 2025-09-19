import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  notifications: [],
  isLoading: false,
  activeTab: "login",
  // ===== ADDED: Right sidebar state management =====
  rightSidebarOpen: false, // Controls visibility of right sidebar (Smart Tips + History)
  rightSidebarActiveTab: "smartTips", // Active tab in right sidebar: "smartTips" or "history"
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
    // ===== ADDED: Right sidebar toggle and tab management =====
    toggleRightSidebar: (state) => {
      // Toggle the right sidebar open/close state
      state.rightSidebarOpen = !state.rightSidebarOpen;
    },
    setRightSidebarOpen: (state, action) => {
      // Set right sidebar open/close state directly
      state.rightSidebarOpen = action.payload;
    },
    setRightSidebarActiveTab: (state, action) => {
      // Switch between "smartTips" and "history" tabs in right sidebar
      state.rightSidebarActiveTab = action.payload;
    },
  },
});

export const {
  setTheme,
  addNotification,
  removeNotification,
  setLoading,
  setActiveTab,
  // ===== ADDED: Export new right sidebar actions =====
  toggleRightSidebar, // For toggle button functionality
  setRightSidebarOpen, // For programmatic control
  setRightSidebarActiveTab, // For tab switching in sidebar
} = uiSlice.actions;

export default uiSlice.reducer;
