import { useEffect, useState, type FC } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

const CourseDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    axios.get(`/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course:", err));
  }, [id]);

  if (!course) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section className="bg-blue-50 min-h-screen pt-32 pb-16"> {/* Added pt-32 to push content down */}
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-8">{course.description}</p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Lessons</h2>
        <ul className="space-y-4">
          {course.lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link
                to={`/courses/${id}/lessons/${lesson.id}`}
                className="block p-4 rounded-lg bg-white text-gray-900 transition hover:shadow-lg"
              >
                <div className="flex justify-between">
                  <span>{lesson.title}</span>
                  <span className="text-gray-500">{lesson.duration}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CourseDetail;
