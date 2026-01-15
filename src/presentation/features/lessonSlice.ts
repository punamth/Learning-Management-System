import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { lessonRepository } from "../../domain/repositories/lessonRepository";
import type { Lesson } from "../../domain/models/lesson";

// ----------------- State Types -----------------
interface LessonState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  loading: boolean;
  error: string | null;
  progress: Record<string, number>; // video progress by lessonId
}

const initialState: LessonState = {
  lessons: [],
  currentLesson: null,
  loading: false,
  error: null,
  progress: {},
};

// ----------------- Thunks -----------------
export const fetchLessonsByCourse = createAsyncThunk(
  "lessons/fetchByCourse",
  async (courseId: number, { rejectWithValue }) => {
    try {
      return await lessonRepository.getByCourse(courseId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchLesson = createAsyncThunk(
  "lessons/fetchLesson",
  async ({ courseId, lessonId }: { courseId: number; lessonId: number }, { rejectWithValue }) => {
    try {
      const lessons = await lessonRepository.getByCourse(courseId);
      const lesson = lessons.find((l) => l.id === lessonId);
      if (!lesson) throw new Error("Lesson not found");
      return lesson;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ----------------- Slice -----------------
const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<{ lessonId: string; progress: number }>) => {
      state.progress[action.payload.lessonId] = action.payload.progress;
    },
    clearCurrentLesson: (state) => {
      state.currentLesson = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonsByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessonsByCourse.fulfilled, (state, action: PayloadAction<Lesson[]>) => {
        state.lessons = action.payload;
        state.loading = false;
      })
      .addCase(fetchLessonsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLesson.fulfilled, (state, action: PayloadAction<Lesson>) => {
        state.currentLesson = action.payload;
        state.loading = false;
      })
      .addCase(fetchLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProgress, clearCurrentLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
