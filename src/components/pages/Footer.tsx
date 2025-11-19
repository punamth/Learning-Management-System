const Footer = () => {
  return (
    <section id ="footer">
      <footer className="bg-blue-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <i className="fa-solid fa-book-open text-teal-400 text-xl"></i>
                <span className="text-xl font-bold text-teal-400">Learnly</span>
              </div>
              <p className="text-gray-600 text-sm mb-6 max-w-xs">
                Empowering learners worldwide with high-quality online education and industry recognized certifications.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <i className="fab fa-facebook text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <i className="fab fa-twitter text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <i className="fab fa-linkedin text-lg"></i>
                </a>
              </div>
            </div>

            {/* Popular Courses */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-4">Popular Courses</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Web Development</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Data Science</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Digital Marketing</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">UI/UX Design</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Mobile Development</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">About Us</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Careers</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Blog</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Press</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Partners</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-gray-800 font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Help Center</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">© 2025 Learnly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;