import { useEffect, useState } from "react";
import { courseRepository, type Course } from "../../../repositories/courseRepository";
import { Link } from "react-router-dom";
import { PlusCircle, Edit, Trash2, BookOpen } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:5001";

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseRepository.getAll();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        alert("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course deletion
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");
    if (!confirmed) return;

    try {
      await courseRepository.delete(id);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Failed to delete course:", err);
      alert("Error deleting course. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center py-16">Loading courses...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Courses</h1>
        <p className="text-gray-600">Create, edit, and manage your course catalog</p>
      </div>

      {/* Create Button */}
      <div className="mb-6">
        <Link
          to="/admin/courses/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Course
        </Link>
      </div>

      {/* Courses Table or Empty State */}
      {courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first course</p>
          <Link
            to="/admin/courses/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Create Course
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thumbnail
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    {/* Thumbnail column */}
                    <td className="px-6 py-4">
                      {course.thumbnailPath ? (
                        <img
                          src={`${API_BASE}${course.thumbnailPath}`}
                          alt={course.title}
                          className="w-16 h-16 object-cover rounded-md border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.png"; // optional fallback
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No image</span>
                      )}
                    </td>

                    {/* Title */}
                    <td className="px-6 py-4 font-medium text-gray-900">{course.title}</td>

                    {/* Description */}
                    <td className="px-6 py-4 text-gray-600 line-clamp-2">{course.description}</td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/courses/${course.id}/lessons`}
                          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        >
                          <BookOpen className="w-4 h-4" />
                          Lessons
                        </Link>
                        <Link
                          to={`/admin/courses/${course.id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}
