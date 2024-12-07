import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "../views/Signin";
import Signup from "../views/Signup";
import Dashboard from "../views/Dashboard";
import Home from "../views/Home";
import Form from "../views/Form";
import Settings from "../views/Settings";
import ProtectedRoute from "./protected";
import { isAuthenticated } from "../services/authentication";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/signin" />
        }
      />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new/:type"
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new/:type/:id"
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
