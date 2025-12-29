import {useEffect, useState, useRef } from "react";
import type{ FC} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  content: string;
}

const LessonView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    axios.get(`/api/lessons/${id}`).then((res) => setLesson(res.data));
  }, [id]);

  if (!lesson) return <div className="text-center py-16">Loading...</div>;

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      console.log("Progress:", progress.toFixed(0), "%");
    }
  };

  return (
    <section className="bg-blue-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>

        <video
          ref={videoRef}
          src={lesson.videoUrl}
          controls
          className="w-full rounded-lg shadow-lg mb-8"
          onTimeUpdate={handleTimeUpdate}
        ></video>

        <div className="bg-white p-6 rounded-lg shadow text-gray-700">
          <h2 className="text-xl font-semibold mb-2">Lesson Content</h2>
          <p>{lesson.content}</p>
        </div>
      </div>
    </section>
  );
};

export default LessonView;
