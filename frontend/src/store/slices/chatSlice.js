import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { message, selectedAppliance, selectedBrand },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call - replace with your actual API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          appliance: selectedAppliance,
          brand: selectedBrand,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMaintenanceTips = createAsyncThunk(
  "chat/getMaintenanceTips",
  async ({ appliance, brand }, { rejectWithValue }) => {
    try {
      // Simulate API call
      const response = await fetch(
        `/api/maintenance-tips?appliance=${appliance}&brand=${brand}`
      );

      if (!response.ok) {
        throw new Error("Failed to get maintenance tips");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    isTyping: false,
    sidebarOpen: true,
    selectedAppliance: null, // 'refrigerator' or 'washing-machine'
    selectedBrand: null, // 'lg' or 'samsung'
    maintenanceTips: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const newMessage = {
        id: Date.now(),
        timestamp: Date.now(),
        ...action.payload,
      };
      state.messages.push(newMessage);
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSelectedAppliance: (state, action) => {
      state.selectedAppliance = action.payload;
      // Clear messages when changing appliance
      state.messages = [];
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
      // Clear messages when changing brand
      state.messages = [];
    },
    clearSelection: (state) => {
      state.selectedAppliance = null;
      state.selectedBrand = null;
      state.messages = [];
      state.maintenanceTips = [];
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.isTyping = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isTyping = false;

        // Add AI response
        const aiMessage = {
          id: Date.now() + 1,
          timestamp: Date.now(),
          type: "ai",
          content: action.payload.message,
          source: action.payload.source || null,
        };
        state.messages.push(aiMessage);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isTyping = false;
        state.error = action.payload;
      })
      // Get maintenance tips
      .addCase(getMaintenanceTips.fulfilled, (state, action) => {
        state.maintenanceTips = action.payload;
      })
      .addCase(getMaintenanceTips.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  addMessage,
  setTyping,
  toggleSidebar,
  setSelectedAppliance,
  setSelectedBrand,
  clearSelection,
  clearMessages,
  clearError,
} = chatSlice.actions;

export default chatSlice.reducer;
