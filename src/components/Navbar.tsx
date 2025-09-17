import type { FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <nav className="flex justify-between items-center py-1 px-6 bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <i className="fa-solid fa-book-open text-teal-400 text-xl"></i>
        <span className="text-2xl font-bold text-teal-400">Learnly</span>
      </div>

      {/* Links */}
      <div className="hidden md:flex space-x-8 text-gray-700 font-medium text-md">
        <Link to="/" className="hover:text-teal-500">Home</Link>
        <Link to="/features" className="hover:text-teal-500">Features</Link>
        <Link to="/courses" className="hover:text-teal-500">Courses</Link>
        <Link to="/contact" className="hover:text-teal-500">Contact</Link>
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-3">
        <button className="text-gray-700 px-3 py-1.5 rounded-full shadow hover:bg-teal-400 text-sm">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
