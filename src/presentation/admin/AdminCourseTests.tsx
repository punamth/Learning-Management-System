import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../application/app/hooks";
import { fetchTests, deleteTest } from "../../presentation/features/testSlice";
import type { Test } from "../../domain/models/test";
import TestForm from "./TestForm";

interface AdminCourseTestsProps {
  courseId: number;
}

const AdminCourseTests: React.FC<AdminCourseTestsProps> = ({ courseId }) => {
  const dispatch = useAppDispatch();
  const { tests, loading, error } = useAppSelector((state) => state.tests);

  const [showForm, setShowForm] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);

  // Fetch tests when component mounts or courseId changes
  useEffect(() => {
    dispatch(fetchTests(courseId))
      .unwrap()
      .catch((err) => {
        console.error("Failed to fetch tests:", err);
      });
  }, [courseId, dispatch]);

  // Open form to create new test
  const handleCreate = () => {
    setEditingTest(null);
    setShowForm(true);
  };

  // Open form to edit existing test
  const handleEdit = (test: Test) => {
    setEditingTest(test);
    setShowForm(true);
  };

  // Delete a test
  const handleDelete = async (testId: number) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;

    try {
      await dispatch(deleteTest({ courseId, id: testId })).unwrap();
    } catch (err) {
      console.error("Failed to delete test:", err);
      alert("Failed to delete test.");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTest(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Tests</h2>
        <button
          onClick={handleCreate}
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
        >
          Create Test
        </button>
      </div>

      {showForm && (
        <TestForm
          courseId={courseId}
          existingTest={editingTest ?? undefined}
          onClose={handleCloseForm}
        />
      )}

      {loading && <p>Loading tests...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4 space-y-2">
        {tests.length > 0 ? (
          tests.map((test) => (
            <li
              key={test.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{test.questionText}</p>
                <p className="text-sm text-gray-500">
                  Options: {test.options.join(", ")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(test)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(test.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          !loading && <p>No tests yet.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminCourseTests;
