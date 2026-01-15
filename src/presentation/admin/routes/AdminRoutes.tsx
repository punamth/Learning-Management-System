import { Routes, Route } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import AdminDashboard from "../AdminDashboard";
import ManageCourses from "../ManageCourses";
import CreateCourse from "../CreateCourse";
import EditCourse from "../EditCourse";
import ManageLessons from "../ManageLessons";
import ManageTests from "../ManageTests";

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/*" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="courses" element={<ManageCourses />} />
      <Route path="courses/create" element={<CreateCourse />} />
      <Route path="courses/:id/edit" element={<EditCourse />} />
      <Route path="courses/:courseId/lessons" element={<ManageLessons />} />
      <Route path="courses/:courseId/tests" element={<ManageTests />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
