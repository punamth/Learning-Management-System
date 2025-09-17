const Features = () => {
  const features = [
    {
      iconClass: "fa-solid fa-play",
      title: "HD Video Tutorials",
      description: "Access high-quality video lessons from industry experts with lifetime access to all content.",
      color: "text-teal-400"
    },
    {
      iconClass: "fa-solid fa-globe",
      title: "Interactive Quizzes",
      description: "Test your knowledge with quizzes and get instant feedback on your progress.",
      color: "text-teal-400"
    },
    {
      iconClass: "fa-solid fa-chart-line",
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and personalized recommendations.",
      color: "text-teal-400"
    },
    {
      iconClass: "fa-solid fa-award",
      title: "Certificates",
      description: "Earn industry-recognized certificates upon course completion to boost your career.",
      color: "text-teal-400"
    },
    {
      iconClass: "fa-solid fa-clock",
      title: "Learn at Your Pace",
      description: "Study when it's convenient for you with 24/7 access to all course materials.",
      color: "text-teal-400"
    },
    {
      iconClass: "fa-solid fa-users",
      title: "Community Support",
      description: "Connect with fellow learners and instructors in our vibrant learning community.",
      color: "text-teal-400"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="text-teal-500 ml-2">Effective Learning</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover tools designed to accelerate your learning journey and help you reach your goals faster.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className={`text-2xl mb-4 ${feature.color}`}>
                  <i className={feature.iconClass}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
