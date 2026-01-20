import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { VerifyOtpPage } from "./pages/verify-otp";
import { ResetPasswordPage } from "./pages/reset-password";
import DashboardPage from "./pages/dashboard";
import { DASHBOARD_ROUTES } from "./pages/dashboard_pages/DashboardIndex";

import { WorkWithUsPage } from "./pages/work-with-us";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

