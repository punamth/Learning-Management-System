import { useState, useEffect, type FC } from "react";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Courses", href: "#courses" },
    { name: "Contact", href: "#contact" },
  ];

  // IntersectionObserver to track active section
  useEffect(() => {
    const sectionIds = navItems.map((n) => n.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.2 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-50 z-50">
      <div className="relative max-w-7xl mx-auto px-8 md:px-16 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center text-teal-400 text-2xl font-bold">
          <i className="fa-solid fa-book-open text-xl"></i>
          <span className="ml-1">Learnly</span>
        </div>

        {/* Center: Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } lg:block absolute top-full lg:top-auto left-1/2 transform -translate-x-1/2 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 p-4 lg:p-0 text-lg font-medium text-center">
            {navItems.map(({ name, href }) => {
              const sectionId = href.replace("#", "");
              return (
                <li key={name}>
                  <a
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block cursor-pointer py-2 lg:py-0 transition-colors duration-300 ${
                      activeSection === sectionId
                        ? "text-teal-400 font-bold"
                        : "text-gray-700 hover:text-teal-500"
                    }`}
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Sign In Button and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Sign In Button */}
          <button className="hidden lg:inline-block bg-teal-400 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-500 transition">
            Sign In
          </button>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-teal-400 focus:outline-none transition-colors duration-300"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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