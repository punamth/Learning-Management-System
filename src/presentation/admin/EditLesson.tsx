import type{ Lesson } from "../../domain/models/lesson";

interface Props {
  editingLesson: Lesson | null;
  editTitle: string;
  editContent: string;
  setEditTitle: (v: string) => void;
  setEditContent: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export default function EditLesson({
  editingLesson,
  editTitle,
  editContent,
  setEditTitle,
  setEditContent,
  onClose,
  onSave,
}: Props) {
  if (!editingLesson) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Edit Lesson</h3>

        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg mb-4"
        />

        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border rounded-lg mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button onClick={onSave} className="px-4 py-2 bg-teal-500 text-white rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
