import { ArrowLeft, Trash2, Upload, Pencil } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import EditLesson from "./EditLesson";
import { useLessonsManager } from "../components/hooks/useLessonsManager";

export default function ManageLessons() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const numericCourseId = courseId ? Number(courseId) : null;

  const {
    lessons,
    title,
    contentText,
    videoPreview,
    adding,
    editingLesson,
    editTitle,
    editContent,

    setTitle,
    setContentText,
    setEditTitle,
    setEditContent,
    setEditingLesson,

    addLesson,
    deleteLesson,
    uploadVideo,
    startEditing,
    saveLessonChanges,
    resetForm,
    handleVideoSelect,
  } = useLessonsManager(numericCourseId);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate("/admin/courses")}
        className="inline-flex items-center gap-2 bg-teal-500 px-4 py-2 rounded-md text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </button>

      {/* Add Lesson */}
      <div className="bg-white p-6 border rounded-lg shadow-sm mt-6">
        <h3 className="text-lg font-semibold mb-4">Add Lesson</h3>

        <input
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="Lesson title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border px-3 py-2 rounded mb-3"
          rows={4}
          placeholder="Lesson content..."
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
        />

        {videoPreview && (
          <video src={videoPreview} controls className="w-full mb-4 border rounded" />
        )}

        <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded inline-flex items-center gap-2 mb-4">
          <Upload className="w-4 h-4" /> Upload Video
          <input
            type="file"
            accept="video/*"
            onChange={(e) => e.target.files?.[0] && handleVideoSelect(e.target.files[0])}
            className="hidden"
          />
        </label>

        <div className="flex gap-3">
          <button
            onClick={addLesson}
            disabled={adding}
            className="bg-teal-500 text-white px-5 py-2 rounded"
          >
            {adding ? "Adding..." : "Add Lesson"}
          </button>
          <button onClick={resetForm} className="bg-gray-300 px-5 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>

      {/* Lesson List */}
      <div className="bg-white border rounded-lg shadow-sm mt-6">
          {/* Lesson count header */}
          <h3 className="p-6 text-lg font-semibold ">
            Lessons ({lessons.length})
          </h3>
        {lessons.map((lesson, i) => (
          <div key={lesson.id} className="p-6 border-b flex justify-between">
            <div>
              <h4 className="font-semibold">{i + 1}. {lesson.title}</h4>
              <p className="text-gray-600 mb-3">{lesson.contentText.substring(0, 100)}...</p>

              {lesson.videoUrl && (
                <video src={lesson.videoUrl} controls className="w-full mb-3 rounded border" />
              )}

              <label className="cursor-pointer bg-gray-100 px-3 py-2 rounded inline-flex items-center gap-2">
                <Upload className="w-4 h-4" /> Replace Video
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files?.[0] && uploadVideo(lesson.id, e.target.files[0])
                  }
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => startEditing(lesson)}
                className="border px-3 py-2 rounded text-blue-600"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                onClick={() => deleteLesson(lesson.id)}
                className="border px-3 py-2 rounded text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <EditLesson
        editingLesson={editingLesson}
        editTitle={editTitle}
        editContent={editContent}
        setEditTitle={setEditTitle}
        setEditContent={setEditContent}
        onClose={() => setEditingLesson(null)}
        onSave={saveLessonChanges}
      />
    </div>
  );
}
