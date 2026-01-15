import { useEffect, useState } from "react";
import { BookOpen, Users, BarChart3 } from "lucide-react";
import { courseRepository } from "../../domain/repositories/courseRepository"; 

const AdminDashboard = () => {
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO later: fetch real data for these
  const totalStudents = 348;
  const avgProgress = 76;

  useEffect(() => {
  const fetchData = async () => {
    try {
      const courses = await courseRepository.getAll();
      console.log("Courses fetched:", courses); 
      setTotalCourses(courses.length);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading) {
    return <p className="text-gray-600">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* COURSES */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex items-center gap-4">
          <div className="p-3 bg-teal-100 text-teal-600 rounded-lg">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Courses</p>
            <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
          </div>
        </div>

        {/* STUDENTS - TEMP STATIC UNTIL API EXISTS */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Enrolled Students</p>
            <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
          </div>
        </div>

        {/* PROGRESS - TEMP STATIC */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Avg. Progress</p>
            <p className="text-2xl font-bold text-gray-900">{avgProgress}%</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
