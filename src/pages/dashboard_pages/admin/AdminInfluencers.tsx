import AdminUserTable from "@/components/admin/AdminUserTable";

function AdminInfluencers() {
  return (
    <AdminUserTable
      role="influencer"
      countField="promotionsReceived"
      countLabel="Total Jobs"
    />
  );
}

export default AdminInfluencers;
