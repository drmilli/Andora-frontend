import React, { useState, useRef, useContext } from "react";
import { Pencil, Camera, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/Context/AppContext";
import { updateProfile, uploadProfilePhoto } from "@/services/user";

const EditProfileDialog: React.FC = () => {
  const context = useContext(AppContext);
  const user = context?.user;
  const setUser = context?.setUser;

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstname: "",
    surname: "",
    username: "",
    bio: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    website: "",
  });

  // Reset form when dialog opens
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open && user) {
      setError(null);
      setForm({
        firstname: user.firstname || "",
        surname: user.surname || "",
        username: user.username || "",
        bio: user.bio || "",
        instagram: user.instagram || "",
        twitter: user.twitter || "",
        tiktok: user.tiktok || "",
        website: user.website || "",
      });
      setPhotoFile(null);
      setPhotoPreview(null);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!setUser) return;
    setSaving(true);
    setError(null);
    try {
      // Upload photo first if one was selected
      if (photoFile) {
        await uploadProfilePhoto(photoFile);
      }

      // Then save all text fields
      const updatedUser = await updateProfile({
        firstname: form.firstname,
        surname: form.surname,
        username: form.username,
        bio: form.bio || null,
        instagram: form.instagram || null,
        twitter: form.twitter || null,
        tiktok: form.tiktok || null,
        website: form.website || null,
      });
      setUser(updatedUser);
      setOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const displayPhoto = photoPreview || user?.profilePicture || "";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-[#A67102]/40 bg-[#A67102]/10 px-3 py-1.5 text-xs text-[#f5b640] transition hover:bg-[#A67102]/20"
        >
          <Pencil size={14} />
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-gray-800 bg-[#0D0B07] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[#A67102] bg-gray-800">
                {displayPhoto ? (
                  <img
                    src={displayPhoto}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-500">
                    <Camera size={32} />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 rounded-full bg-[#A67102] p-1.5 text-white shadow transition hover:bg-[#8a5c02]"
              >
                <Camera size={14} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            {photoFile && (
              <p className="text-xs text-[#f5b640]">
                New photo selected — saved when you click Save Changes
              </p>
            )}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-gray-400">First Name</Label>
              <Input
                value={form.firstname}
                onChange={(e) =>
                  setForm({ ...form, firstname: e.target.value })
                }
                className="border-gray-700 bg-gray-900 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-400">Surname</Label>
              <Input
                value={form.surname}
                onChange={(e) =>
                  setForm({ ...form, surname: e.target.value })
                }
                className="border-gray-700 bg-gray-900 text-white"
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <Label className="text-gray-400">Username</Label>
            <Input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="border-gray-700 bg-gray-900 text-white"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label className="text-gray-400">Bio</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="border-gray-700 bg-gray-900 text-white"
              rows={3}
            />
          </div>

          {/* Social Links */}
          <div className="space-y-1.5">
            <Label className="text-gray-400">Instagram</Label>
            <Input
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              placeholder="@username"
              className="border-gray-700 bg-gray-900 text-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-400">Twitter</Label>
            <Input
              value={form.twitter}
              onChange={(e) => setForm({ ...form, twitter: e.target.value })}
              placeholder="@username"
              className="border-gray-700 bg-gray-900 text-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-400">TikTok</Label>
            <Input
              value={form.tiktok}
              onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
              placeholder="@username"
              className="border-gray-700 bg-gray-900 text-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-400">Website</Label>
            <Input
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="https://"
              className="border-gray-700 bg-gray-900 text-white"
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#A67102] text-white hover:bg-[#8a5c02]"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : null}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
