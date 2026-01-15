import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../../presentation/features/testSlice";
import lessonReducer from "../../presentation/features/lessonSlice";
import coursesReducer from "../../presentation/features/coursesSlice";

// Import your repository interface & class
import type { TestRepository } from "../../domain/repositories/testRepository";
import { TestApiRepository } from "../../domain/repositories/testApiRepository";

const testRepoInstance: TestRepository = new TestApiRepository();

export const store = configureStore({
  reducer: {
    tests: testReducer,
    lessons: lessonReducer,
    courses: coursesReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          testRepo: testRepoInstance,
        },
      },
    }),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
