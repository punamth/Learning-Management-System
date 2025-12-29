import { useEffect, useState } from "react";
import type { FC } from "react";
import CourseCard from "../CourseCard";
import axios from "axios";
import defaultThumbnail from "../../assets/default-course.png"; // default image

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
}

const CourseCatalog: FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/Courses");
        const coursesData = Array.isArray(res.data)
          ? res.data
          : res.data?.courses || [];
        setCourses(coursesData);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center">Loading courses...</p>;
  if (!Array.isArray(courses) || courses.length === 0)
    return <p className="text-center">No courses available.</p>;

  return (
    <section className="bg-blue-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
          Explore Our <span className="text-teal-400 ml-2">Courses</span>
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              thumbnail={course.thumbnail || defaultThumbnail}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCatalog;
