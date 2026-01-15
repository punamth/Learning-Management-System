import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { courseRepository } from "../../domain/repositories/courseRepository";
import { useThumbnailUpload } from "../components/hooks/useThumbnailUpload";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:5001";

interface FormState {
  id: number;
  title: string;
  description: string;
  thumbnail?: string | null;
}

export default function EditCourse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = id ? Number(id) : null;

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    id: 0,
    title: "",
    description: "",
    thumbnail: null,
  });
  const [error, setError] = useState<string | null>(null);

  // 🔥 Custom hook manages both existing thumbnail + preview of new one
  const {
    file: newThumbnail,
    preview,
    setNewThumbnail,
    removeImage,
  } = useThumbnailUpload(null);

  // Load course details
  useEffect(() => {
    if (!numericId) return;

    const fetchCourse = async () => {
      try {
        const course = await courseRepository.getById(numericId);

        setForm({
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnail: course.thumbnailPath,
        });

        // Set existing thumbnail in hook
        if (course.thumbnailPath) {
          removeImage(); // reset all first
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load course.");
      } finally {
        setFetching(false);
      }
    };

    fetchCourse();
  }, [numericId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!numericId) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("id", String(form.id));
      formData.append("title", form.title);
      formData.append("description", form.description);

      if (newThumbnail) {
        formData.append("thumbnail", newThumbnail);
      }

      await courseRepository.update(numericId, formData as any);
      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
      setError("Failed to update course.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const fullExistingThumb =
    form.thumbnail ? `${API_BASE}${form.thumbnail}` : null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
       <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/admin/courses")}
            className="inline-flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Course</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <p className="text-gray-600">Update course information</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Course Title
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Course Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thumbnail
            </label>

            <label
              htmlFor="thumbnail"
              className="px-4 py-2 bg-gray-200 text-black rounded-lg cursor-pointer hover:bg-gray-300 transition"
            >
              Choose Thumbnail
            </label>

            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setNewThumbnail(e.target.files[0]);
                }
              }}
            />

          {/* OLD THUMBNAIL */}
            {fullExistingThumb && !preview && (
              <div className="mt-4 relative w-fit">
                <img
                  src={fullExistingThumb}
                  className="w-48 h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setForm({ ...form, thumbnail: null });
                    removeImage();
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shadow hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
            {/* NEW THUMBNAIL */}
            {preview && (
              <div className="mt-4 relative w-fit">
                <img
                  src={preview}
                  className="w-48 h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shadow hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-300 transition-colors font-medium shadow-sm"
            >
              <Save className="w-5 h-5" />
              {loading ? "Updating..." : "Update Course"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
