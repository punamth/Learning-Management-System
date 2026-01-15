import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from './presentation/components/pages/Home';
import Features from './presentation/components/pages/Features'; 
import CourseCatalog from './presentation/components/pages/CourseCatalog';
import CourseDetail from './presentation/components/pages/CourseDetail';
import LessonView from './presentation/components/pages/LessonView';
import TestView from './presentation/components/pages/TestView';
import Navbar from './presentation/components/NavBar';
import Footer from './presentation/components/pages/Footer';
import SignIn from './presentation/components/auth/SignIn';
import SignUp from './presentation/components/auth/SignUp';
import { AuthProvider } from './presentation/contexts/AuthContext'; 
import AdminRoutes from './presentation/admin/routes/AdminRoutes';

// Layout wrapper with Navbar + Footer
const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public/Layout wrapper for student routes */}
          <Route element={<Layout />}>
            {/* Landing page */}
            <Route
              path="/"
              element={
                <>
                  <section id="home">
                    <Home />
                  </section>
                  <section id="features">
                    <Features />
                  </section>
                  <section id="courses">
                    <CourseCatalog />
                  </section>
                </>
              }
            />
            {/* Courses routes */}
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonView />} />
            <Route path="/courses/:courseId/tests/:testId" element={<TestView />} />
          </Route>

          {/* Auth routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/*Admin routes */}
          <Route path="/admin" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
