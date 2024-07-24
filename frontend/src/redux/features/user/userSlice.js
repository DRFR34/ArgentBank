import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axiosConfig';

/**
 * Fetches the user profile from the API.
 * 
 * @async
 * @function fetchUserProfile
 * @param {undefined} _ - Unused parameter.
 * @param {Object} thunkAPI - The thunk API object.
 * @param {function} thunkAPI.getState - A function to get the current state.
 * @returns {Object} The user profile data.
 * @throws Will throw an error if the token is not available or the request fails.
 */
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('Token not available');
    }

    try {
      const response = await axios.post('/user/profile', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * Updates the user profile with new data.
 * 
 * @async
 * @function updateUserProfile
 * @param {Object} updatedData - The updated user profile data.
 * @param {Object} thunkAPI - The thunk API object.
 * @param {function} thunkAPI.getState - A function to get the current state.
 * @returns {Object} The response data from the API.
 * @throws Will throw an error if the request fails.
 */
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

/**
 * This slice represents the user state.
 * 
 * @type {Slice}
 * @param {string} name - The name of the slice.
 * @param {Object} initialState - The initial state of the slice.
 * @param {string} initialState.firstName - The first name of the user.
 * @param {string} initialState.lastName - The last name of the user.
 * @param {boolean} initialState.loading - The loading state.
 * @param {string|null} initialState.error - The error message.
 * @param {Object} reducers - The reducer functions.
 * @param {function} extraReducers - The extra reducers for handling async actions.
 */
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
