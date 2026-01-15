import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlusCircle, Edit, Trash2, FileQuestion } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../application/app/hooks";
import { fetchTests, deleteTest } from "../../presentation/features/testSlice";
import type { Test } from "../../domain/models/test";
import TestForm from "./TestForm";

export default function ManageTests() {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();
  const { tests, loading, error } = useAppSelector((state) => state.tests);

  const [showForm, setShowForm] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);

  const parsedCourseId = Number(courseId);

  useEffect(() => {
    if (!courseId || isNaN(parsedCourseId)) {
      console.error("Invalid courseId:", courseId);
      return;
    }

    dispatch(fetchTests(parsedCourseId));
  }, [dispatch, courseId, parsedCourseId]);

  const handleCreate = () => {
    setEditingTest(null);
    setShowForm(true);
  };

  const handleEdit = (test: Test) => {
    setEditingTest(test);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!parsedCourseId) return;
    if (!window.confirm("Delete this test?")) return;

    try {
      await dispatch(deleteTest({ courseId: parsedCourseId, id })).unwrap();
    } catch {
      alert("Failed to delete test");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manage Tests</h1>
          <p className="text-gray-500">Create and manage course tests</p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <PlusCircle className="w-4 h-4" />
          Create Test
        </button>
      </div>

      {showForm && (
        <TestForm
          courseId={parsedCourseId}
          existingTest={editingTest ?? undefined}
          onClose={() => setShowForm(false)}
        />
      )}

      {loading && <p className="py-8 text-center">Loading tests...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && tests.length === 0 && (
        <div className="bg-white border rounded-lg p-10 text-center">
          <FileQuestion className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-600">No tests found for this course</p>
        </div>
      )}

      <div className="space-y-3">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white border rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <p className="font-medium">{test.questionText}</p>
              <p className="text-sm text-gray-500">
                Options: {test.options.join(", ")}
              </p>
              <p className="text-sm text-green-600">
                Answer: {test.correctAnswer}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(test)}
                className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(test.id)}
                className="text-red-600 hover:bg-red-50 px-3 py-1 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
