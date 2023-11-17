import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
