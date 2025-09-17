const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Master React, Node.js, and MongoDB to build modern web applications from scratch.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center",
      level: "Beginner",
      rating: 4.9,
      price: 99,
      duration: "40 hours",
      students: "12,450 students",
      levelColor: "bg-green-500"
    },
    {
      id: 2,
      title: "Data Science with Python",
      description: "Learn Python programming, pandas, NumPy, and machine learning fundamentals.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
      level: "Intermediate",
      rating: 4.8,
      price: 129,
      duration: "35 hours",
      students: "8,920 students",
      levelColor: "bg-orange-500"
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      description: "Complete guide to SEO, social media marketing, and Google Ads strategies.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
      level: "Beginner",
      rating: 4.7,
      price: 79,
      duration: "25 hours",
      students: "15,670 students",
      levelColor: "bg-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Popular <span className="text-teal-400">Courses</span>
          </h1>
          <p className="text-md text-gray-600 max-w-3xl mx-auto">
            Discover our most popular courses designed by industry experts to help you build 
            in-demand skills and advance your career.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-sm mx-auto">
            <div className="relative">
                <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-40 object-cover"
                />
                <div className={`absolute top-2 left-2 ${course.levelColor} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                {course.level}
                </div>
            </div>
            
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <i className="fas fa-star text-yellow-400 text-sm"></i>
                    <span className="text-xs text-gray-600 ml-1">{course.rating}</span>
                </div>
                <span className="text-xl font-bold text-teal-500">${course.price}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                <p className="text-gray-600 text-xs mb-3">{course.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center">
                    <i className="fas fa-clock text-sm mr-1"></i>
                    <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-users text-sm mr-1"></i>
                    <span>{course.students}</span>
                </div>
                </div>
                
                <button className="w-full bg-gray-100 text-gray-800 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors font-medium text-sm">
                Enroll Now
                </button>
            </div>
            </div>
        ))}
        </div>


        {/* View All Courses Button */}
        <div className="text-center mt-12">
          <button className="bg-teal-400 text-white px-8 py-3 rounded-md hover:bg-teal-500 transition-colors font-medium">
            View All Courses
          </button>
        </div>
      </main>
    </div>
  );
};

export default Courses;