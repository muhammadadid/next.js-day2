import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import Router from 'next/router';

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login', userData, {
        headers: {
          "Content-Type": "application/json",
          apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message || 'Login failed');
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        toast.success('Login successful');
        
        const userRole = action.payload.role;
        if (userRole === 'admin') {
          Router.push('/Dashboard/ListUser');
        } else {
          Router.push('/');
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
