import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Courses", href: "#courses" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-50 z-50 shadow-none">
      <div className="max-w-7xl mx-auto px-8 md:px-16 h-16 flex items-center justify-between">
        <div
          className="flex items-center text-teal-400 text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <i className="fa-solid fa-book-open text-xl"></i>
          <span className="ml-1">Learnly</span>
        </div>

        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } lg:block absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-none lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 p-4 lg:p-0 text-lg font-medium text-center">
            {navItems.map(({ name, href }) => (
              <li key={name}>
                <a
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block cursor-pointer py-2 lg:py-0 text-gray-700 hover:text-teal-500 transition-colors duration-300"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="hidden lg:inline-block bg-teal-400 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-500 transition"
          >
            Sign In
          </button>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-teal-400 focus:outline-none transition-colors duration-300"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
