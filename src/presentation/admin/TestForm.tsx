import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../application/app/hooks";
import { createTest, updateTest } from "../../presentation/features/testSlice";
import type { Test } from "../../domain/models/test";
import type { Course } from "../../domain/models/course"; 
import { fetchCourses } from "../../presentation/features/coursesSlice"; 

interface TestFormProps {
  courseId?: number; // optional, pre-select a course if given
  existingTest?: Test;
  onClose?: () => void;
}

const TestForm: React.FC<TestFormProps> = ({ courseId, existingTest, onClose }) => {
  const dispatch = useAppDispatch();

  const { courses } = useAppSelector((state) => state.courses); // assuming courses slice
  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(courseId);
  const [questionText, setQuestionText] = useState(existingTest?.questionText || "");
  const [options, setOptions] = useState(existingTest?.options.join(",") || "");
  const [correctAnswer, setCorrectAnswer] = useState(existingTest?.correctAnswer || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses if not already loaded
  useEffect(() => {
    if (!courses.length) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourseId) {
      setError("Please select a course.");
      return;
    }

    const data = {
      questionText,
      options: options.split(",").map((o) => o.trim()),
      correctAnswer,
    };

    setLoading(true);
    setError(null);

    try {
      if (existingTest) {
        await dispatch(
          updateTest({ courseId: selectedCourseId, id: existingTest.id, data })
        ).unwrap();
      } else {
        await dispatch(createTest({ courseId: selectedCourseId, data })).unwrap();
      }
      onClose?.();
    } catch (err) {
      console.error("Error saving test:", err);
      setError("Failed to save test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-2 border rounded">
      {error && <p className="text-red-500">{error}</p>}

      <select
        value={selectedCourseId || ""}
        onChange={(e) => setSelectedCourseId(Number(e.target.value))}
        className="border px-2 py-1 w-full"
        required
      >
        <option value="" disabled>
          Select a course
        </option>
        {courses.map((course: Course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        className="border px-2 py-1 w-full"
        required
      />
      <input
        type="text"
        placeholder="Options (comma separated)"
        value={options}
        onChange={(e) => setOptions(e.target.value)}
        className="border px-2 py-1 w-full"
        required
      />
      <input
        type="text"
        placeholder="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        className="border px-2 py-1 w-full"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
        }`}
      >
        {loading ? "Saving..." : existingTest ? "Update Test" : "Create Test"}
      </button>
    </form>
  );
};

export default TestForm;
