import { type FC, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../application/app/hooks";
import { fetchLessonsByCourse, fetchLesson, setProgress } from "../../features/lessonSlice";

const LessonView: FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { lessons, currentLesson, loading, error } = useAppSelector((state) => state.lessons);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Debug logs to help diagnose routing/state issues
  console.log("LessonView params:", { courseId, lessonId });
  console.log("LessonView redux:", { lessons, currentLesson, loading, error });

  useEffect(() => {
    if (!courseId || !lessonId) return;

    dispatch(fetchLessonsByCourse(Number(courseId)));
    dispatch(fetchLesson({ courseId: Number(courseId), lessonId: Number(lessonId) }));
  }, [courseId, lessonId, dispatch]);

  const handleTimeUpdate = () => {
    if (videoRef.current && lessonId) {
      const videoProgress = (videoRef.current.currentTime / (videoRef.current.duration || 1)) * 100;
      dispatch(setProgress({ lessonId, progress: videoProgress }));
      console.log("Progress:", videoProgress.toFixed(0), "%");
    }
  };

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/courses')}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  if (!currentLesson) {
    return <div className="text-center py-16">No lesson found</div>;
  }

  return (
    <section className="bg-blue-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentLesson.title}</h1>

        {currentLesson.videoUrl ? (
          <video
            ref={videoRef}
            src={currentLesson.videoUrl}
            controls
            className="w-full rounded-lg shadow-lg mb-8"
            onTimeUpdate={handleTimeUpdate}
          />
        ) : (
          <p className="text-gray-500">No video available for this lesson.</p>
        )}

        <div className="bg-white p-6 rounded-lg shadow text-gray-700">
          <h2 className="text-xl font-semibold mb-2">Lesson Content</h2>
          <p>{currentLesson.contentText}</p>
        </div>

        {lessons.length > 1 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Other Lessons:</h3>
            <ul>
              {lessons
                .filter((l) => l.id !== currentLesson.id)
                .map((lesson) => (
                  <li key={lesson.id}>
                      <Link
                        to={`/courses/:{courseId}/lessons/{lessonId}`}
                        className="text-teal-600 hover:underline"
                      >
                        {lesson.title}
                      </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default LessonView;