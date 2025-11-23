import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { courseRepository } from "../../../repositories/courseRepository";

interface FormState {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
}

export default function EditCourse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({ id: 0, title: "", description: "" });
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const numericId = id ? Number(id) : null;

  useEffect(() => {
    if (numericId === null) return;

    const fetchCourse = async () => {
      try {
        const course = await courseRepository.getById(numericId);
        setForm({
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnail: course.thumbnailPath,
        });
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
    if (numericId === null) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("id", String(form.id));
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (newThumbnail) formData.append("thumbnail", newThumbnail);

      await courseRepository.update(numericId, formData as any); // FormData sent
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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin/courses")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Course</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <p className="text-gray-600">Update course information</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Course Title
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Introduction to Web Development"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Course Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Provide a detailed description of what students will learn..."
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <div>
          <label htmlFor="thumbnail" className="block text-sm font-semibold text-gray-700 mb-2">
            Thumbnail
          </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setNewThumbnail(e.target.files[0])}
              className="w-full"
            />
            {/* Show current thumbnail image */}
            {form.thumbnail && !newThumbnail && (
              <img
                src={form.thumbnail} // replace with actual URL
                alt="Current Thumbnail"
                className="w-24 h-24 object-cover rounded-md border mt-2"
              />
            )}
            {/* Preview new selected thumbnail */}
            {newThumbnail && (
              <img
                src={URL.createObjectURL(newThumbnail)}
                alt="New Thumbnail Preview"
                className="w-24 h-24 object-cover rounded-md border mt-2"
              />
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
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
