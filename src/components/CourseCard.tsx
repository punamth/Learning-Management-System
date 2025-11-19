import type{ FC } from "react";
import { Link } from "react-router-dom";
import defaultThumbnail from "../assets/default-course.png";

interface CourseCardProps {
  id?: string; // optional, for linking to detail page
  title: string;
  description: string;
  thumbnail?: string; // optional, will use default if not provided
}

const CourseCard: FC<CourseCardProps> = ({ id, title, description, thumbnail }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      {/* Thumbnail */}
      <img
        src={thumbnail || defaultThumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      {/* Course Info */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm flex-1">{description}</p>

      {/* Button / Link */}
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
