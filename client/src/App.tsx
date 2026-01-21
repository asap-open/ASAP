import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";

// Open Pages
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Protected Pages (Assuming these exist or will be created shortly)
import History from "./pages/dashboard/History";
import Workouts from "./pages/dashboard/Workouts";
// import Settings from "./pages/dashboard/Settings";
import Progress from "./pages/dashboard/Progress";

// Route Guard Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/get-started" replace />;
  return children;
};

// Extracted Routes so they are inside AuthProvider
function AppRoutes() {
  return (
    <Routes>
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<History />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="analytics" element={<Progress />} />
        {/* <Route path="settings" element={<Settings />} />  */}
      </Route>

      {/* Catch all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
