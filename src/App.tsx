
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { registerSW } from 'virtual:pwa-register';
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";

// Register Service Worker
registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
import { ForgotPasswordPage } from "./pages/forgot-password";
import { VerifyOtpPage } from "./pages/verify-otp";
import { ResetPasswordPage } from "./pages/reset-password";
import DashboardPage from "./pages/dashboard";
import { DASHBOARD_ROUTES } from "./pages/dashboard_pages/DashboardIndex";

import { WorkWithUsPage } from "./pages/work-with-us";
import { PrivacyPolicyPage } from "./pages/privacy-policy";
import Home from "./pages/Home";
import Layout from "./components/layouts/Layout";





export default function App() {

const context = useContext(AppContext);

if (!context) {
  throw new Error("AppContext must be used within AppProvider");
}

const { user, loading } = context;

if (loading) {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-[#A67102]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A67102]"></div>
    </div>
  );
}

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/work-with-us" element={<WorkWithUsPage />} />
      
        </Route>

        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />}>
          {DASHBOARD_ROUTES.map((r) => (
            <Route key={r.path || "index"} path={r.path} element={r.element} />
          ))}
        </Route>
  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
      </BrowserRouter>
  );
}
