import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseRepository, type Course } from "../../domain/repositories/courseRepository";

interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

// Async thunk
export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await courseRepository.getAll();
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch courses");
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default coursesSlice.reducer;
