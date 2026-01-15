import { Outlet, Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  PlusCircle,
  LayoutDashboard,
  GraduationCap,
  Edit3,
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/courses", label: "Manage Courses", icon: BookOpen },
    { path: "/admin/courses/create", label: "Create Course", icon: PlusCircle },
    // You can use a placeholder path here, or generate dynamically when rendering per course
    { path: "/admin/courses/:courseId/tests", label: "Manage Tests", icon: Edit3 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-teal-500" />
            <span className="text-xl font-bold text-gray-800">Learnly Admin</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? "bg-teal-50 text-teal-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
