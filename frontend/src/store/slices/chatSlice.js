import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { chatAPI } from "../../services/api";

// Existing async thunks
export const sendMessageAPI = createAsyncThunk(
  "chat/sendMessageAPI",
  async (
    { message, selectedAppliance, selectedBrand },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call - replace with your actual API
      /*const response = await fetch("/api/chat", {
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
      return data;*/
      const { data } = await chatAPI.sendMessage(message, {
        appliance: selectedAppliance,
        brand: selectedBrand,
        });
        console.log(data);
        
        return data;
      }
       catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
      });
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

// ===== ADDED: New async thunks for chat history =====
export const fetchChatHistory = createAsyncThunk(
  "chat/fetchChatHistory",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch user's chat sessions from backend
      const response = await fetch("/api/chat-history/recent_sessions/", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSessionMessages = createAsyncThunk(
  "chat/fetchSessionMessages",
  async (sessionId, { rejectWithValue }) => {
    try {
      // Fetch messages for a specific chat session
      const response = await fetch(`/api/chat-history/${sessionId}/messages/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch session messages");
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
        .addCase(sendMessageAPI.pending, (state) => {
          state.isLoading = true;
          state.isTyping = true;
          state.error = null;
        })
        .addCase(sendMessageAPI.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isTyping = false;

          // Add AI response
          const aiMessage = {
          id: action.payload.id,
          timestamp: action.payload.timestamp,
          type: "ai",
          content: action.payload.response,   // ✅ show AI’s reply
          source: null,
          };

          state.messages.push(aiMessage);
        })
        .addCase(sendMessageAPI.rejected, (state, action) => {
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
    // ===== ADDED: Chat history state management =====
    chatHistory: [], // Array of user's chat sessions
    currentSessionId: null, // Currently active session ID
    historyLoading: false, // Loading state for history operations
    historyError: null, // Error state for history operations
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
    // ===== ADDED: New reducers for chat history =====
    setCurrentSession: (state, action) => {
      // Set the currently active chat session
      state.currentSessionId = action.payload;
    },
    clearHistoryError: (state) => {
      // Clear any history-related errors
      state.historyError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send message
      .addCase(sendMessageAPI.pending, (state) => {
        state.isLoading = true;
        state.isTyping = true;
        state.error = null;
      })
      .addCase(sendMessageAPI.fulfilled, (state, action) => {
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
      .addCase(sendMessageAPI.rejected, (state, action) => {
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
      })
      // ===== ADDED: Extra reducers for chat history async operations =====
      .addCase(fetchChatHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.chatHistory = action.payload; // Store fetched chat sessions
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError = action.payload;
      })
      .addCase(fetchSessionMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSessionMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload; // Replace current messages with session messages
      })
      .addCase(fetchSessionMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addMessage,
  sendMessage,
  setTyping,
  toggleSidebar,
  setSelectedAppliance,
  setSelectedBrand,
  clearSelection,
  clearMessages,
  clearError,
  // ===== ADDED: Export new chat history actions =====
  setCurrentSession, // For setting active session
  clearHistoryError, // For clearing history errors
} = chatSlice.actions;

export default chatSlice.reducer;
