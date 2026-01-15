import type { FC } from "react";
import { Link } from "react-router-dom";
import defaultThumbnail from "../../assets/default_course.png";

interface CourseCardProps {
  id?: string;
  title: string;
  description: string;
  thumbnail?: string;
}

const CourseCard: FC<CourseCardProps> = ({ id, title, description, thumbnail }) => {
  return (
    <div
      className="bg-blue-50 rounded-lg p-4 flex flex-col shadow-md 
                 transition-transform duration-300
                 hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
    >
      {/* Thumbnail */}
      <img
        src={thumbnail || defaultThumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      {/* Course Info */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm flex-1">{description}</p>
      <Link to="/signin">
      <button className="w-full bg-teal-400 text-gray-800 py-2 px-3 rounded-md hover:bg-teal-500 transition-colors font-medium text-sm">
          Enroll Now
        </button>
      </Link>

      {id && (
        <Link
          to={`/courses/${id}`}
          className="mt-4 inline-block bg-teal-400 text-white px-4 py-2 rounded-full font-medium text-center shadow hover:bg-teal-500 transition"
        >
          View Course
        </Link>
      )}
    </div>
  );
};

export default CourseCard;
