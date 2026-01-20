import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  // Temporary: We will replace this with real auth logic later
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Default Route Logic */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div>Home Dashboard (TODO)</div>
            ) : (
              <Navigate to="/get-started" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
