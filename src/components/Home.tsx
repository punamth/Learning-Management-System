import type{ FC } from "react";
import learnImage from "../assets/learnly.jpg";

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-16 py-16">
        {/* Left Content */}
        <div className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Master New Skills with <br />
            <span className="text-transparent bg-clip-text bg-teal-400">
              Expert-Led
            </span>{" "}
            Online Courses
          </h1>
          <p className="text-gray-600">
            Thousands of learners advancing their careers with our
            comprehensive video tutorials, interactive quizzes, and personalized
            learning paths. Start your journey today.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="bg-teal-400 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-teal-500">
              Start Learning
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-full font-medium text-gray-700 hover:bg-gray-100">
              ▶ Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex space-x-8 text-gray-700 font-medium pt-4">
            <span>📚 500+ Courses</span>
          </div>
        </div>

        {/* Right Content (Image + Badges) */}
        <div className="relative mt-10 md:mt-0">
          <img
            src={learnImage}
            alt="Students learning"
            className="rounded-xl shadow-lg"
          />

          {/* 24/7 Support Badge */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow px-4 py-2 text-teal-500 font-bold">
            24/7 <br /> <span className="text-gray-600 text-sm">Support</span>
          </div>

          {/* Success Rate Badge */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow px-4 py-2 text-teal-500 font-bold">
            98% <br /> <span className="text-gray-600 text-sm">Success Rate</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
