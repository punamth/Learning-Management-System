import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type{ Test, TestAttempt } from "../../domain/models/test";
import type{ TestApiRepository } from "../../domain/repositories/testApiRepository";

// THUNKS

// Fetch all tests for a course
export const fetchTests = createAsyncThunk<
  Test[],
  number,
  { extra: { testRepo: TestApiRepository } }
>("tests/fetchTests", async (courseId, { extra }) => {
  return extra.testRepo.getTests(courseId);
});

// Create a new test
export const createTest = createAsyncThunk<
  Test,
  { courseId: number; data: Partial<Test> },
  { extra: { testRepo: TestApiRepository } }
>("tests/createTest", async ({ courseId, data }, { extra }) => {
  return extra.testRepo.createTest(courseId, data);
});

// Update a test
export const updateTest = createAsyncThunk<
  Test,
  { courseId: number; id: number; data: Partial<Test> },
  { extra: { testRepo: TestApiRepository } }
>("tests/updateTest", async ({ courseId, id, data }, { extra }) => {
  return extra.testRepo.updateTest(courseId, id, data);
});

// Delete a test
export const deleteTest = createAsyncThunk<
  number, // return deleted test id
  { courseId: number; id: number },
  { extra: { testRepo: TestApiRepository } }
>("tests/deleteTest", async ({ courseId, id }, { extra }) => {
  await extra.testRepo.deleteTest(courseId, id);
  return id;
});

// Submit a test attempt
export const submitTest = createAsyncThunk<
  TestAttempt,
  { courseId: number; selectedAnswer: string },
  { extra: { testRepo: TestApiRepository } }
>("tests/submitTest", async ({ courseId, selectedAnswer }, { extra }) => {
  return extra.testRepo.submitTest(courseId, selectedAnswer);
});

// ---------------------------
// SLICE
// ---------------------------

interface TestState {
  tests: Test[];
  loading: boolean;
  error: string | null;
}

const initialState: TestState = {
  tests: [],
  loading: false,
  error: null,
};

const testSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    clearTests(state) {
      state.tests = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchTests
    builder.addCase(fetchTests.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTests.fulfilled, (state, action: PayloadAction<Test[]>) => {
      state.loading = false;
      state.tests = action.payload;
    });
    builder.addCase(fetchTests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch tests";
    });

    // createTest
    builder.addCase(createTest.fulfilled, (state, action: PayloadAction<Test>) => {
      state.tests.push(action.payload);
    });

    // updateTest
    builder.addCase(updateTest.fulfilled, (state, action: PayloadAction<Test>) => {
      const index = state.tests.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tests[index] = action.payload;
    });

    // deleteTest
    builder.addCase(deleteTest.fulfilled, (state, action: PayloadAction<number>) => {
      state.tests = state.tests.filter((t) => t.id !== action.payload);
    });

    // submitTest (optional, you can store attempt results somewhere if needed)
    builder.addCase(submitTest.fulfilled, (_state, action: PayloadAction<TestAttempt>) => {
      // optionally handle submission result
      console.log("Test submitted", action.payload);
    });
  },
});

export const { clearTests } = testSlice.actions;

export default testSlice.reducer;
