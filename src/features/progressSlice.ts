import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProgress, updateUserProgress, type Progress } from "../api/progressRepository";

interface ProgressState {
  progress: Progress[];
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  progress: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchProgress = createAsyncThunk(
  "progress/fetchByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await getUserProgress(userId); // ✅ use correct function
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch progress"
      );
    }
  }
);

export const updateProgress = createAsyncThunk(
  "progress/update",
  async (
    payload: { userId: string; progress: Partial<Progress> },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateUserProgress(payload.userId, payload.progress); // ✅ use correct function
      return res;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update progress"
      );
    }
  }
);

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch progress
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update progress
      .addCase(updateProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.progress.findIndex(
          (p) => p.courseId === action.payload.courseId
        );
        if (index >= 0) {
          state.progress[index] = action.payload;
        } else {
          state.progress.push(action.payload);
        }
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default progressSlice.reducer;
