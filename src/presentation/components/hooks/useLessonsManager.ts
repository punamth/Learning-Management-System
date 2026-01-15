import { useEffect, useState } from "react";
import { lessonRepository } from "../../../domain/repositories/lessonRepository";
import type { Lesson } from "../../../domain/models/lesson";

export function useLessonsManager(courseId: number | null) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [title, setTitle] = useState("");
  const [contentText, setContentText] = useState("");
  const [video, setVideo] = useState<{ file: File | null; preview: string | null }>({
    file: null,
    preview: null,
  });
  const [adding, setAdding] = useState(false);

  // Editing
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Load lessons
  useEffect(() => {
    if (!courseId) return;
    (async () => {
      try {
        const data = await lessonRepository.getByCourse(courseId);
        setLessons(data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      }
    })();
  }, [courseId]);

  const resetForm = () => {
    setTitle("");
    setContentText("");
    setVideo({ file: null, preview: null });
  };

  const addLesson = async () => {
    if (!courseId || !title) return;
    setAdding(true);
    try {
      const newLesson = await lessonRepository.create(courseId, { title, contentText }, video.file || undefined);
      setLessons((prev) => [...prev, newLesson]);
      resetForm();
    } catch (err) {
      console.error("Error adding lesson:", err);
    } finally {
      setAdding(false);
    }
  };

  const deleteLesson = async (lessonId: number) => {
    if (!courseId) return;
    try {
      await lessonRepository.delete(courseId, lessonId);
      setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    } catch (err) {
      console.error("Error deleting lesson:", err);
    }
  };

  const uploadVideo = async (lessonId: number, file: File) => {
    if (!courseId) return;
    try {
      const updated = await lessonRepository.update(courseId, lessonId, {}, file);
      setLessons((prev) =>
        prev.map((l) => (l.id === updated.id ? updated : l))
      );
    } catch (err) {
      console.error("Error uploading video:", err);
    }
  };

  const startEditing = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setEditTitle(lesson.title);
    setEditContent(lesson.contentText);
  };

  const saveLessonChanges = async () => {
    if (!editingLesson || !courseId) return;
    try {
      const updated = await lessonRepository.update(courseId, editingLesson.id, { title: editTitle, contentText: editContent });
      setLessons((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
      setEditingLesson(null);
    } catch (err) {
      console.error("Error updating lesson:", err);
    }
  };

  return {
    lessons,
    title,
    contentText,
    videoPreview: video.preview,
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
    handleVideoSelect: (file: File) => setVideo({ file, preview: URL.createObjectURL(file) }),
  };
}
