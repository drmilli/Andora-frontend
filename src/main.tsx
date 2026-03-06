import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from 'virtual:pwa-register';
import "./index.css";
import App from "./App";
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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          {DASHBOARD_ROUTES.map((r) => (
            <Route key={r.path || "index"} path={r.path} element={r.element} />
          ))}
        </Route>
        <Route path="/work-with-us" element={<WorkWithUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

