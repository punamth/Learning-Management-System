export interface Test {
  id: number;
  courseId: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface TestAttempt {
  id: number;
  testId: number;
  studentId: number;
  selectedAnswer: string;
  isCorrect: boolean;
}
