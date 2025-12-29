import { useEffect, useState } from "react";
import { lessonRepository } from "../../../repositories/lessonRepository";
import type { Lesson } from "../../../types/lesson";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Video, Upload } from "lucide-react";

export default function ManageLessons() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [title, setTitle] = useState("");
  const [adding, setAdding] = useState(false);

  // Ensure courseId is a number
  const numericCourseId = courseId ? Number(courseId) : null;

  // Fetch lessons by course
  useEffect(() => {
    if (numericCourseId === null) return;

    const fetchLessons = async () => {
      try {
        const data: Lesson[] = await lessonRepository.getByCourse(numericCourseId);
        setLessons(data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      }
    };

    fetchLessons();
  }, [numericCourseId]);

  // Add new lesson
  const addLesson = async () => {
    if (numericCourseId === null || !title) return;

    setAdding(true);
    try {
      const newLesson: Lesson = await lessonRepository.create(numericCourseId, { title });
      setLessons((prev) => [...prev, newLesson]);
      setTitle("");
    } catch (err) {
      console.error("Error adding lesson:", err);
    } finally {
      setAdding(false);
    }
  };

  // Delete lesson
  const deleteLesson = async (lessonId: number) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      await lessonRepository.delete(lessonId);
      setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    } catch (err) {
      console.error("Error deleting lesson:", err);
    }
  };

  // Upload or replace video
  const uploadVideo = async (lessonId: number, file: File) => {
  try {
    const updatedLesson: Lesson = await lessonRepository.update(lessonId, {}, file);
    setLessons((prev) =>
      prev.map((l) => (l.id === updatedLesson.id ? updatedLesson : l))
    );
  } catch (err) {
    console.error("Error uploading video:", err);
  }
};

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin/courses")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Lessons</h1>
        <p className="text-gray-600">Add and organize lessons for this course</p>
      </div>

      {/* Add Lesson Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Lesson</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter lesson title..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            onKeyPress={(e) => e.key === "Enter" && addLesson()}
          />
          <button
            onClick={addLesson}
            disabled={!title || adding}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            {adding ? "Adding..." : "Add Lesson"}
          </button>
        </div>
      </div>

      {/* Lessons List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Lessons ({lessons.length})
          </h3>
        </div>

        {lessons.length === 0 ? (
          <div className="p-12 text-center">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons yet</h3>
            <p className="text-gray-500">Add your first lesson to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 text-sm font-semibold">
                        {index + 1}
                      </span>
                      <h4 className="text-lg font-medium text-gray-900">{lesson.title}</h4>
                    </div>

                    {lesson.videoUrl && (
                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 mb-3"
                      >
                        <Video className="w-4 h-4" />
                        View Video
                      </a>
                    )}

                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-sm font-medium">
                        <Upload className="w-4 h-4" />
                        {lesson.videoUrl ? "Replace Video" : "Upload Video"}
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) =>
                            e.target.files?.[0] && uploadVideo(lesson.id, e.target.files[0])
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteLesson(lesson.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
