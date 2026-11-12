import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "@/Context/AppContext";
import { normalizeRole, isCampaignStrategist } from "@/lib/roles";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

/**
 * Wraps a dashboard page and redirects to /unauthorized
 * if the current user's role is not in the allowedRoles list.
 *
 * Usage:
 *   <RoleGuard allowedRoles={["admin"]}>
 *     <AdminDashboard />
 *   </RoleGuard>
 */
export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const context = useContext(AppContext);
  const role = context?.user?.role?.toLowerCase() ?? "";
  const normalized = normalizeRole(role);

  const isAllowed = allowedRoles.some((allowed) => {
    if (allowed === "campaign_strategist") {
      return isCampaignStrategist(role);
    }
    return normalized === allowed;
  });

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

