import type{ Test, TestAttempt } from "../../domain/models/test";

export interface TestRepository {
  getTests(courseId: number): Promise<Test[]>;
  createTest(courseId: number, data: Partial<Test>): Promise<Test>;
  updateTest(courseId: number, id: number, data: Partial<Test>): Promise<Test>;
  deleteTest(courseId: number, id: number): Promise<void>;
  submitTest(courseId: number, selectedAnswer: string): Promise<TestAttempt>;
}
