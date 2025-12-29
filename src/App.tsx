import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from './components/pages/Home';
import Features from './components/pages/Features'; 
import CourseCatalog from './components/pages/CourseCatalog';
import CourseDetail from './components/pages/CourseDetail';
import LessonView from './components/pages/LessonView';
import TestView from './components/pages/TestView';
import Navbar from './components/NavBar';
import Footer from './components/pages/Footer';
import SignIn from './components/pages/auth/SignIn';
import SignUp from './components/pages/auth/SignUp';
import { AuthProvider } from './contexts/AuthContext'; 

// Admin imports
import AdminLayout from './components/pages/admin/AdminLayout';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import ManageCourses from './components/pages/admin/ManageCourses';
import CreateCourse from './components/pages/admin/CreateCourse';
import EditCourse from './components/pages/admin/EditCourse';
import ManageLessons from './components/pages/admin/ManageLessons';

// Layout wrapper with Navbar + Footer
const Layout = () => {
  const location = useLocation();
  const hideLayout = ["/signin", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <main>
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
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

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="courses/create" element={<CreateCourse />} />
            <Route path="courses/:id/edit" element={<EditCourse />} />
            <Route path="courses/:courseId/lessons" element={<ManageLessons />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
