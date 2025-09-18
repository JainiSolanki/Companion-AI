import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../services/api";

// 🔹 Login Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      console.log(response)
      const data = response.data;

      // Save tokens to localStorage
      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      return { username: data.username, email: data.email, token: data.access, refresh: data.refresh, };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Login failed" });
    }
  }
);

// 🔹 Signup Thunk
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ username, email, password, setActiveTab }, { rejectWithValue }) => {
    try {
      const response = await authAPI.signup(username, email, password);
      console.log(response)
      setActiveTab("login");
      return response.data; // Django signup returns success message, not tokens
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(error.response?.data || { message: "Signup failed" });
    }
  }
);

// 🔹 Logout Thunk
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  return {};
});

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.refreshToken = action.payload.refresh;
        state.token = action.payload.access;
        state.user = { username: action.payload.username, email: action.payload.email, };

        localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
        // After signup, user should log in manually
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Signup failed";
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
