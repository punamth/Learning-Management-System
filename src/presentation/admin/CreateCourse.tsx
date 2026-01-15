import { useState } from "react";
import { courseRepository } from "../../domain/repositories/courseRepository";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useThumbnailUpload } from "../components/hooks/useThumbnailUpload";

export default function CreateCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", description: "" });
  const { file: thumbnail, preview, setNewThumbnail, removeImage } =
    useThumbnailUpload(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and Description are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      await courseRepository.create(formData as any);
      navigate("/admin/courses");
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-right mb-4">
          <button
            onClick={() => navigate("/admin/courses")}
            className="inline-flex items-center gap-2 bg-teal-500 text-white hover:bg-teal-600 px-4 py-2 rounded-md transition-colors"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Course
        </h1>
        <p className="text-gray-600">Add a new course to your catalog</p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              placeholder="e.g., Introduction to Web Development"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              required
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Course Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={6}
              placeholder="Provide a detailed description of what students will learn..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
              required
              disabled={loading}
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thumbnail
            </label>

            <div className="flex items-center gap-4">
              <label
                htmlFor="thumbnail"
                className="px-4 py-2 bg-gray-200 text-black rounded-lg cursor-pointer hover:bg-gray-300 transition"
              >
                Choose Thumbnail
              </label>

              {thumbnail ? (
                <span className="text-gray-700 text-sm">{thumbnail.name}</span>
              ) : (
                <span className="text-gray-400 text-sm">
                  No file chosen
                </span>
              )}
            </div>

            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              className="hidden"
              disabled={loading}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setNewThumbnail(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-4 relative inline-block">
              <img
                src={preview}
                alt="Thumbnail Preview"
                className="w-48 h-32 object-cover rounded-lg border"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shadow hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
            >
              <Save className="w-5 h-5" />
              {loading ? "Creating..." : "Create Course"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
              disabled={loading}
              className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
