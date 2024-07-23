import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosConfig';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {

    try {

      const state = thunkAPI.getState();
      const response = await axios.post('/user/profile', {}, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data.body;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.response.data);

    }
  }
);

export const updateUserProfile = createAsyncThunk(

  'user/updateUserProfile',

  async (updatedData, thunkAPI) => {

    try {

      const state = thunkAPI.getState();
      const response = await axios.put('/user/profile', updatedData, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.response.data);

    }
  }
);

const userSlice = createSlice({

  name: 'user',

  initialState: {
    firstName: '',
    lastName: '',
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })

      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.firstName = action.payload.body.firstName;
        state.lastName = action.payload.body.lastName;
        state.updateResponseMsg = action.payload.message;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

