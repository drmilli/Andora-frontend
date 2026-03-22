import { User } from "lucide-react";
import * as React from "react";


export const ProfilePage: React.FC = () => {
  const [isEditingPhone, setIsEditingPhone] = React.useState(false);
  const [isEditingEmail, setIsEditingEmail] = React.useState(false);
  const [isEditingName, setIsEditingName] = React.useState(false);

  const [phoneNumber, setPhoneNumber] = React.useState("08876654322");
  const [email, setEmail] = React.useState("abbeylin@gmail.com");
  const [name, setName] = React.useState("Abbey Lincoln");

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">PROFILE</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Profile Image Section */}
          <div className="bg-[#1a1a1a] rounded-lg p-6">
            <div className="flex flex-col items-center">
              {/* Profile Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-6 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center border-4 border-white">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-1">Abbey Lincoln</h2>
                <p className="text-gray-400 text-sm">@abbeylin</p>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-[#A67102] rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Bio</h3>
            <p className="text-white text-sm leading-relaxed">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. It is a long
              established fact that a reader will be distracted by the readable
              content of a page when looking at its layout. The point of usingt
              is a long established fact that a reader will be distracted by the
              readable content. It is a long established fact that a reader will
              be distracted by the readable content of a page when looking at
              its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using
              'Content here, content here'
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Phone Number */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!isEditingPhone}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102] disabled:text-gray-400"
              />
              <button
                onClick={() => setIsEditingPhone(!isEditingPhone)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A67102] hover:text-[#8a5e02] text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditingEmail}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102] disabled:text-gray-400"
              />
              <button
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A67102] hover:text-[#8a5e02] text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditingName}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102] disabled:text-gray-400"
              />
              <button
                onClick={() => setIsEditingName(!isEditingName)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A67102] hover:text-[#8a5e02] text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                setIsEditingPhone(false);
                setIsEditingEmail(false);
                setIsEditingName(false);
                // Add your update logic here
              }}
              className="px-8 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};