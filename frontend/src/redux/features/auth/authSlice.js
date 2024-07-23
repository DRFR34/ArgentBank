import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosConfig'

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials);

   console.log('response.data', response.data);
    return response.data;

  } catch (error) {
    console.log('Erreur de connexionA:',error.data.message);
    const errorMessage = error.data.message
    return rejectWithValue(errorMessage);

  }
});


const authSlice = createSlice({

  name: 'auth',

  initialState: {
    token: localStorage.getItem('token') || null,
    firstName: localStorage.getItem('firstName') || null,
    lastName: localStorage.getItem('lastName') || null,
    status: 'idle',
    error: null,
    wantBeStored: false,
  },

  reducers: {
    toggleSaveToken: (state) => {
      state.rememberUser = !state.rememberUser;
      if (state.rememberUser === false) {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
      }
      console.log('toogleSaveToken→state.rememberUser', state.rememberUser);
    },
    cancelToken: (state) => {
      state.rememberUser = false;
    },
    logout: (state) => {
      state.token = null;
      state.firstName = '';
      state.lastName = '';
      state.status = 'idle';
      state.error = null;
      state.rememberUser = false;
      localStorage.removeItem('token');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
    },
  },
  extraReducers: (builder) => {

    builder

      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.body.token;
        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
         console.log('Erreur de connexion:',action.payload);
        
      });
  },
});

export const { logout, toggleSaveToken, cancelToken } = authSlice.actions;

export default authSlice.reducer;