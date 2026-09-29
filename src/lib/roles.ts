export function normalizeRole(role?: string | null): string {
  return (role ?? "").toLowerCase().replace(/[\s-]+/g, "_");
}

export function isCampaignStrategist(role?: string | null): boolean {
  const normalized = normalizeRole(role);
  return (
    normalized === "campaign_strategist" ||
    normalized === "campaignstrategist" ||
    normalized === "strategist"
  );
}
