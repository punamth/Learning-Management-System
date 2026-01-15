import type{ Test, TestAttempt } from "../../domain/models/test";
import type{ TestRepository } from "./testRepository";
import apiService from "../../application/services/apiService";

export class TestApiRepository implements TestRepository {
  async getTests(courseId: number): Promise<Test[]> {
    return apiService.get<Test[]>(`/courses/${courseId}/Tests`);
  }

  async createTest(courseId: number, data: Partial<Test>): Promise<Test> {
    return apiService.post<Test>(`/courses/${courseId}/Tests`, data);
  }

  async updateTest(courseId: number, id: number, data: Partial<Test>): Promise<Test> {
    return apiService.put<Test>(`/courses/${courseId}/Tests/${id}`, data);
  }

  async deleteTest(courseId: number, id: number): Promise<void> {
    return apiService.delete<void>(`/courses/${courseId}/Tests/${id}`);
  }

  async submitTest(courseId: number, selectedAnswer: string): Promise<TestAttempt> {
    return apiService.post<TestAttempt>(`/courses/${courseId}/Tests/submit-test`, {
      selectedAnswer,
    });
  }
}
