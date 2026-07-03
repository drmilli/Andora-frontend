import * as React from "react";

export const SettingsPage: React.FC = () => {
  const [name, setName] = React.useState("Abbey Lincoln");
  const [phoneNumber, setPhoneNumber] = React.useState("08876654322");
  const [email, setEmail] = React.useState("abbeylin@gmail.com");
  const [country, setCountry] = React.useState("Nigeria");

  const [instagram, setInstagram] = React.useState("@abbey_lincoln");
  const [twitter, setTwitter] = React.useState("");
  const [spotify, setSpotify] = React.useState("spotify.com/artist...");
  const [website, setWebsite] = React.useState("abbeylincoln.me");

  function handleUpdate() {
    // TODO: hook up to your API call
    console.log({ name, phoneNumber, email, country, instagram, twitter, spotify, website });
  }

  return (
    <div className="w-full pb-28 md:pb-0">

      {/* Profile Card */}
      <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 p-6">
        <h3 className="text-white font-semibold mb-5">Profile</h3>

        {/* Avatar + bio row */}
        <div className="flex items-start gap-4 mb-6">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Abbey Lincoln"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#A67102]"
          />
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Artist</p>
            <h2 className="text-white text-lg font-semibold mb-1">Abbey Lincoln</h2>
            <p className="text-gray-500 text-xs mb-2">@abbeylin</p>
            <p className="text-gray-400 text-xs max-w-xl">
              Song Composer and writer based in Abuja. Crafting cinematic late
              night-night sounds since 2019.
            </p>
            <div className="flex items-center gap-4 text-gray-500 text-xs mt-2">
              <span>@abbey-lincoln</span>
              <span>@abbey-lincoln</span>
              <span>@abbey-lincoln</span>
            </div>
          </div>
        </div>

        {/* Basic info fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Abbey Lincoln"
              className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#A67102]"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="09876654322"
              className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#A67102]"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abbeylin@gmail.com"
              className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#A67102]"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Nigeria"
              className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#A67102]"
            />
          </div>
        </div>
      </div>

      {/* Social Handles Card */}
      <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 p-6 mt-6">
        <h3 className="text-white font-semibold mb-5">Social Handles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Instagram</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@abbey_lincoln"
              className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#A67102]"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Twitter / X</label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="@abbey_lincoln"
              className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#A67102]"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Spotify URL</label>
            <input
              type="text"
              value={spotify}
              onChange={(e) => setSpotify(e.target.value)}
              placeholder="spotify.com/artist..."
              className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#A67102]"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="abbeylincoln.me"
              className="w-full bg-transparent border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#A67102]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleUpdate}
            className="px-8 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium text-sm"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;