
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

export const fetchLoginAsync = createAsyncThunk(
  'user/onLogin',
  async (data, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, data)
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSignupAsync = createAsyncThunk(
  'user/onSignup',
  async (data, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/signup/`, data)
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
    id : null,
    email: '',
    is_admin: false,
    is_authenticated: false,
    created_at: '',
    is_loading: false,
    error: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action) => {
        state.id = null,
        state.email = '',
        state.is_admin = false,
        state.is_authenticated = false,
        state.created_at = ''
    },
  },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLoginAsync.pending, (state) => {
            state.is_loading = true;
        })
        .addCase(fetchLoginAsync.fulfilled, (state, action) => {
            state.is_loading = false;
            state.error = null;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.is_admin = action.payload.is_admin;
            state.is_authenticated = true;
            state.created_at = action.payload.created_at;
        })
        .addCase(fetchLoginAsync.rejected, (state, action) => {
            state.is_loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchSignupAsync.pending, (state) => {
            state.is_loading = true;
        })
        .addCase(fetchSignupAsync.fulfilled, (state, action) => {
            state.is_loading = false;
            state.error = null;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.is_admin = action.payload.is_admin;
            state.is_authenticated = true;
            state.created_at = action.payload.created_at;
        })
        .addCase(fetchSignupAsync.rejected, (state, action) => {
            state.is_loading = false;
            state.error = action.error.message;
        });
    },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;