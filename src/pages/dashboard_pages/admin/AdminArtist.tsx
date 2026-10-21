import AdminUserTable from "@/components/admin/AdminUserTable";

function AdminArtist() {
  return (
    <AdminUserTable
      role="artist"
      countField="uploadedMedia"
      countLabel="Uploads"
    />
  );
}

export default AdminArtist;
