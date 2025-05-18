import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useToast } from "./components/ui/toast";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import FeedbackFormPage from "./pages/FeedbackFormPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ToastContainer } from "./components/ui/Toast";

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toasts, removeToast, addToast } = useToast();
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Add debugging to help identify authentication issues
  useEffect(() => {
    console.log("App.jsx - Auth State:", { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);

  // Show welcome toast on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedTechZone");

    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem("hasVisitedTechZone", "true");

      // Delay toast to ensure it appears after page load
      setTimeout(() => {
        addToast(
          "Welcome to TechZone Learning! We're excited to have you here.",
          {
            type: "info",
            duration: 6000,
          }
        );
      }, 1000);
    }
  }, [addToast]);

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="circuit-bg min-h-screen">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<FeedbackFormPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isLoading={isLoading}
                >
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
