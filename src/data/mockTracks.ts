import type { TrackDetail } from "@/types/artist/song";

export const initialTracks: TrackDetail[] = [
  {
    id: "1",
    name: "Smoke",
    artist: "Runty",
    status: "Active",
    campaigns: 4,
    uploaded: "2026-05-10",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    genre: "Afrobeats",
    secondaryGenre: "Afropop / Fusion",
    duration: "3:24",
    bpm: 104,
    musicalKey: "F# Minor",
    isrc: "NG-ADR-26-00101",
    upc: "198711002341",
    releaseDate: "May 10, 2026",
    album: "Lagos After Dark (EP)",
    label: "Audora Music Group / Independent",
    explicit: false,
    fileSize: "41.2 MB",
    fileFormat: "WAV 24-bit / 48.0 kHz",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    streams: 248500,
    radioPlays: 142,
    tvPlays: 18,
    influencerPosts: 36,
    totalReach: "1.8M",
    revenue: "₦ 1,240,000.00",
    description:
      "Smoke is an atmospheric Afro-fusion anthem that blends hypnotic percussion, lush saxophone riffs, and catchy vocal melodies. Designed for late-night drives and vibrant club spaces.",
    credits: {
      producers: ["P-Prime", "Kel-P Vibes"],
      writers: ["Abbey Runty", "Michael O. Collins"],
      mixEngineer: "STG Mastering Labs",
      masteringEngineer: "Chris Gehringer (Sterling Sound)",
      featuredArtists: ["Tems (Background Vocals)"],
    },
    platforms: [
      { platform: "Spotify", streams: 112000, status: "Live", growth: "+24.5%", sharePercent: 45 },
      { platform: "Apple Music", streams: 74500, status: "Live", growth: "+18.2%", sharePercent: 30 },
      { platform: "Audiomack", streams: 38000, status: "Live", growth: "+12.0%", sharePercent: 15 },
      { platform: "Boomplay", streams: 18000, status: "Live", growth: "+8.7%", sharePercent: 7 },
      { platform: "TikTok", streams: 6000, status: "Live", growth: "+45.0%", sharePercent: 3 },
    ],
    campaignsList: [
      {
        id: "cmp-01",
        name: "Lagos Radio Blitz",
        type: "Radio Tour",
        tier: "Pro",
        status: "Active",
        influencers: 6,
        reach: "850K",
        engagementRate: "8.4%",
        budget: "₦ 100,000.00",
        startDate: "2026-05-12",
        endDate: "2026-06-12",
      },
      {
        id: "cmp-02",
        name: "TikTok Dance Challenge Push",
        type: "Influencer Push",
        tier: "Medium",
        status: "Active",
        influencers: 8,
        reach: "620K",
        engagementRate: "12.8%",
        budget: "₦ 50,000.00",
        startDate: "2026-05-15",
        endDate: "2026-06-15",
      },
      {
        id: "cmp-03",
        name: "Campus Radio Syndication",
        type: "Radio Tour",
        tier: "Starter",
        status: "Completed",
        influencers: 3,
        reach: "210K",
        engagementRate: "5.1%",
        budget: "₦ 32,000.00",
        startDate: "2026-05-10",
        endDate: "2026-05-24",
      },
    ],
    radioSpins: [
      { id: "rd-1", station: "Soundcity 98.5 FM", location: "Lagos, Nigeria", frequency: "98.5 MHz", spins: 48, peakPosition: "#3 Top 20", lastPlayed: "Today, 14:20" },
      { id: "rd-2", station: "The Beat 99.9 FM", location: "Lagos, Nigeria", frequency: "99.9 MHz", spins: 39, peakPosition: "#5 Drive Time", lastPlayed: "Yesterday, 21:05" },
      { id: "rd-3", station: "Cool FM 96.9", location: "Abuja, Nigeria", frequency: "96.9 MHz", spins: 32, peakPosition: "#7 Weekly", lastPlayed: "Today, 11:15" },
      { id: "rd-4", station: "YFM 107.9", location: "Accra, Ghana", frequency: "107.9 MHz", spins: 23, peakPosition: "#11 Afrobeats", lastPlayed: "2 days ago" },
    ],
    streamHistory: [
      { date: "May 10", streams: 1200, radio: 4 },
      { date: "May 15", streams: 4500, radio: 12 },
      { date: "May 20", streams: 12800, radio: 24 },
      { date: "May 25", streams: 28400, radio: 45 },
      { date: "Jun 01", streams: 54000, radio: 78 },
      { date: "Jun 10", streams: 98000, radio: 110 },
      { date: "Jun 20", streams: 175000, radio: 132 },
      { date: "Jul 01", streams: 248500, radio: 142 },
    ],
    lyrics: `[Intro]
Yeah, yeah, oh na na
Audora vibes, Runty on the deck
Let the smoke rise, yeah

[Verse 1]
Midnight calling on the cellular
Body moving smooth, nothing regular
Streets of Lagos shining in the rain
We turning all the pressure into gain
Baby girl say she want the vibe tonight
Tell the DJ turn the tempo right

[Chorus]
Watch the smoke in the air, yeah
We don't worry 'bout who's looking over there
All the lights glowing gold, story untold
Take another hit, watch the night unfold
Smoke in the air, yeah yeah
Smoke in the air

[Verse 2]
Every time we step inna di building
Vibrations high up to the ceiling
From the Mainland straight to the Island
Bad energy far away in silence
Now they singing every single melody
Blessings falling down like a shower on me

[Chorus]
Watch the smoke in the air, yeah
We don't worry 'bout who's looking over there
All the lights glowing gold, story untold
Take another hit, watch the night unfold
Smoke in the air, yeah yeah

[Outro]
Runty, yeah
Kel-P on the beat
Let it fade out...`,
  },
  {
    id: "2",
    name: "Midnight Protocol",
    artist: "Runty",
    status: "Completed",
    campaigns: 4,
    uploaded: "2026-05-10",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    genre: "Amapiano",
    secondaryGenre: "Afro-House",
    duration: "4:12",
    bpm: 113,
    musicalKey: "A Minor",
    isrc: "NG-ADR-26-00102",
    upc: "198711002342",
    releaseDate: "April 28, 2026",
    album: "Midnight Protocol (Single)",
    label: "Audora Music Group",
    explicit: false,
    fileSize: "48.5 MB",
    fileFormat: "WAV 24-bit / 48.0 kHz",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    streams: 395000,
    radioPlays: 210,
    tvPlays: 34,
    influencerPosts: 52,
    totalReach: "3.2M",
    revenue: "₦ 2,150,000.00",
    description:
      "A heavyweight Amapiano club stomper featuring signature log drums, shimmering keys, and intoxicating brass hooks. Reached top 10 on multiple regional charts.",
    credits: {
      producers: ["Sarz", "Major League DJz"],
      writers: ["Abbey Runty", "Kabelo Motha"],
      mixEngineer: "Focus Audio Studio",
      masteringEngineer: "Sterling Sound NYC",
      featuredArtists: ["Focalistic"],
    },
    platforms: [
      { platform: "Spotify", streams: 180000, status: "Live", growth: "+14.1%", sharePercent: 46 },
      { platform: "Apple Music", streams: 120000, status: "Live", growth: "+10.5%", sharePercent: 30 },
      { platform: "Boomplay", streams: 55000, status: "Live", growth: "+8.0%", sharePercent: 14 },
      { platform: "Audiomack", streams: 40000, status: "Live", growth: "+6.2%", sharePercent: 10 },
    ],
    campaignsList: [
      {
        id: "cmp-04",
        name: "Amapiano Sound Wave",
        type: "Influencer Push",
        tier: "Pro",
        status: "Completed",
        influencers: 12,
        reach: "2.1M",
        engagementRate: "14.2%",
        budget: "₦ 100,000.00",
        startDate: "2026-04-28",
        endDate: "2026-05-28",
      },
    ],
    radioSpins: [
      { id: "rd-5", station: "YFM 99.2", location: "Johannesburg, SA", frequency: "99.2 MHz", spins: 64, peakPosition: "#2 Chart", lastPlayed: "3 days ago" },
      { id: "rd-6", station: "Soundcity 98.5 FM", location: "Lagos, Nigeria", frequency: "98.5 MHz", spins: 52, peakPosition: "#1 Top 20", lastPlayed: "Yesterday, 19:40" },
    ],
    streamHistory: [
      { date: "Apr 28", streams: 5000, radio: 10 },
      { date: "May 05", streams: 45000, radio: 45 },
      { date: "May 15", streams: 140000, radio: 110 },
      { date: "May 30", streams: 290000, radio: 180 },
      { date: "Jun 15", streams: 395000, radio: 210 },
    ],
    lyrics: `[Intro]
Protocol activated...
Log drum ready, let's go!

[Chorus]
Midnight protocol, when the bass drop we don't fall
Call up the crew, we answer the call
Midnight protocol, all night long
Yeah yeah, midnight protocol!`,
  },
  {
    id: "3",
    name: "Golden Horizons",
    artist: "Runty",
    status: "Active",
    campaigns: 2,
    uploaded: "2026-05-10",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    genre: "Afro-soul",
    secondaryGenre: "R&B",
    duration: "3:48",
    bpm: 96,
    musicalKey: "C Major",
    isrc: "NG-ADR-26-00103",
    upc: "198711002343",
    releaseDate: "May 10, 2026",
    album: "Lagos After Dark (EP)",
    label: "Audora Music Group",
    explicit: false,
    fileSize: "38.1 MB",
    fileFormat: "WAV 24-bit / 48.0 kHz",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    streams: 92000,
    radioPlays: 56,
    tvPlays: 8,
    influencerPosts: 14,
    totalReach: "850K",
    revenue: "₦ 480,000.00",
    description:
      "A soulful, romantic acoustic-infused Afropop track celebrating love, resilience, and sunny skies across West Africa.",
    credits: {
      producers: ["Pheelz", "London"],
      writers: ["Abbey Runty"],
      mixEngineer: "STG Audio Labs",
      masteringEngineer: "Sterling Sound",
    },
    platforms: [
      { platform: "Spotify", streams: 42000, status: "Live", growth: "+19.0%", sharePercent: 45 },
      { platform: "Apple Music", streams: 31000, status: "Live", growth: "+15.3%", sharePercent: 34 },
      { platform: "Audiomack", streams: 19000, status: "Live", growth: "+11.2%", sharePercent: 21 },
    ],
    campaignsList: [
      {
        id: "cmp-05",
        name: "Soulful Sunday Influencer Wave",
        type: "Influencer Push",
        tier: "Starter",
        status: "Active",
        influencers: 4,
        reach: "320K",
        engagementRate: "9.2%",
        budget: "₦ 32,000.00",
        startDate: "2026-05-18",
        endDate: "2026-06-18",
      },
    ],
    radioSpins: [
      { id: "rd-7", station: "Smooth 98.1 FM", location: "Lagos, Nigeria", frequency: "98.1 MHz", spins: 28, peakPosition: "#4 Soul Chart", lastPlayed: "Today, 09:30" },
    ],
    streamHistory: [
      { date: "May 10", streams: 1000, radio: 2 },
      { date: "May 20", streams: 18000, radio: 15 },
      { date: "Jun 01", streams: 52000, radio: 38 },
      { date: "Jun 15", streams: 92000, radio: 56 },
    ],
    lyrics: `[Intro]
Underneath the golden skies...
Every sunrise feels brand new with you...`,
  },
  {
    id: "4",
    name: "Higher Vibration",
    artist: "Runty",
    status: "Active",
    campaigns: 4,
    uploaded: "2026-05-10",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80",
    genre: "Highlife",
    secondaryGenre: "Afrobeats",
    duration: "3:15",
    bpm: 110,
    musicalKey: "D Major",
    isrc: "NG-ADR-26-00104",
    upc: "198711002344",
    releaseDate: "May 10, 2026",
    album: "Lagos After Dark (EP)",
    label: "Audora Music Group",
    explicit: false,
    fileSize: "36.4 MB",
    fileFormat: "WAV 24-bit / 48.0 kHz",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    streams: 145000,
    radioPlays: 92,
    tvPlays: 14,
    influencerPosts: 22,
    totalReach: "1.1M",
    revenue: "₦ 720,000.00",
    description:
      "Rich brass lines meet traditional Igbo highlife guitars with a punchy modern kick. An instant celebratory crowd-pleaser.",
    credits: {
      producers: ["Masterkraft", "Runty"],
      writers: ["Abbey Runty", "Sunday Ginikachukwu"],
      mixEngineer: "Swaps Mix Labs",
    },
    platforms: [
      { platform: "Spotify", streams: 68000, status: "Live", growth: "+16.8%", sharePercent: 47 },
      { platform: "Apple Music", streams: 47000, status: "Live", growth: "+14.0%", sharePercent: 32 },
      { platform: "Boomplay", streams: 30000, status: "Live", growth: "+10.2%", sharePercent: 21 },
    ],
    campaignsList: [],
    radioSpins: [],
    streamHistory: [
      { date: "May 10", streams: 2000, radio: 5 },
      { date: "May 25", streams: 65000, radio: 45 },
      { date: "Jun 15", streams: 145000, radio: 92 },
    ],
    lyrics: `[Intro]
Higher vibrations only!
No bad energy in our zone...`,
  },
  {
    id: "5",
    name: "Night Shift",
    artist: "Runty",
    status: "Not Active",
    campaigns: 0,
    uploaded: "2026-05-10",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    genre: "HipHop",
    secondaryGenre: "Trap / Drill",
    duration: "2:58",
    bpm: 140,
    musicalKey: "E Minor",
    isrc: "NG-ADR-26-00105",
    upc: "198711002345",
    releaseDate: "Unreleased",
    album: "Unreleased Vault",
    label: "Audora Music Group",
    explicit: true,
    fileSize: "32.0 MB",
    fileFormat: "MP3 320 kbps",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    streams: 4200,
    radioPlays: 0,
    tvPlays: 0,
    influencerPosts: 0,
    totalReach: "12K",
    revenue: "₦ 18,000.00",
    description: "Dark, gritty trap record recorded during late studio sessions in Ikoyi. Ready for promotion launch.",
    credits: {
      producers: ["Tempoe"],
      writers: ["Abbey Runty"],
    },
    platforms: [
      { platform: "Audiomack", streams: 4200, status: "Pending", growth: "+0%", sharePercent: 100 },
    ],
    campaignsList: [],
    radioSpins: [],
    streamHistory: [
      { date: "May 10", streams: 1200, radio: 0 },
      { date: "May 25", streams: 4200, radio: 0 },
    ],
    lyrics: `[Intro]
Grinding on the night shift...
Never sleep till the bank clears...`,
  },
  {
    id: "6",
    name: "Safari Sunset",
    artist: "Runty",
    status: "Active",
    campaigns: 4,
    uploaded: "2026-05-10",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop&q=80",
    genre: "EDM",
    secondaryGenre: "Afro House",
    duration: "3:35",
    bpm: 122,
    musicalKey: "G Minor",
    isrc: "NG-ADR-26-00106",
    upc: "198711002346",
    releaseDate: "May 10, 2026",
    album: "Lagos After Dark (EP)",
    label: "Audora Music Group",
    explicit: false,
    fileSize: "39.8 MB",
    fileFormat: "WAV 24-bit / 48.0 kHz",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    streams: 184000,
    radioPlays: 78,
    tvPlays: 12,
    influencerPosts: 24,
    totalReach: "1.3M",
    revenue: "₦ 920,000.00",
    description: "Festival-ready Afro House with soaring vocal chops, organic tribal drums, and massive electronic drops.",
    credits: {
      producers: ["Black Coffee (Co-Prod)", "Runty"],
      writers: ["Abbey Runty"],
    },
    platforms: [
      { platform: "Spotify", streams: 92000, status: "Live", growth: "+21.4%", sharePercent: 50 },
      { platform: "Apple Music", streams: 61000, status: "Live", growth: "+17.1%", sharePercent: 33 },
      { platform: "TikTok", streams: 31000, status: "Live", growth: "+38.0%", sharePercent: 17 },
    ],
    campaignsList: [],
    radioSpins: [],
    streamHistory: [
      { date: "May 10", streams: 3000, radio: 8 },
      { date: "Jun 01", streams: 95000, radio: 45 },
      { date: "Jun 15", streams: 184000, radio: 78 },
    ],
    lyrics: `[Chorus]
Sunset on the safari, dancing till the morning light...`,
  },
  {
    id: "7",
    name: "Ocean Drive",
    artist: "Runty",
    status: "Active",
    campaigns: 4,
    uploaded: "2026-05-10",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
    genre: "R&B",
    secondaryGenre: "Lofi",
    duration: "3:08",
    bpm: 88,
    musicalKey: "B Major",
    isrc: "NG-ADR-26-00107",
    upc: "198711002347",
    releaseDate: "May 10, 2026",
    album: "Lagos After Dark (EP)",
    label: "Audora Music Group",
    explicit: false,
    fileSize: "35.2 MB",
    fileFormat: "WAV 24-bit / 48.0 kHz",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    streams: 132000,
    radioPlays: 65,
    tvPlays: 9,
    influencerPosts: 19,
    totalReach: "960K",
    revenue: "₦ 670,000.00",
    description: "Lush chill vibes with mellow guitar plucks, silky vocal harmonies, and warm basslines.",
    credits: {
      producers: ["P-Prime"],
      writers: ["Abbey Runty"],
    },
    platforms: [
      { platform: "Spotify", streams: 64000, status: "Live", growth: "+13.5%", sharePercent: 48 },
      { platform: "Apple Music", streams: 44000, status: "Live", growth: "+11.8%", sharePercent: 33 },
      { platform: "Audiomack", streams: 24000, status: "Live", growth: "+8.9%", sharePercent: 19 },
    ],
    campaignsList: [],
    radioSpins: [],
    streamHistory: [
      { date: "May 10", streams: 2500, radio: 6 },
      { date: "Jun 15", streams: 132000, radio: 65 },
    ],
    lyrics: `[Verse]
Cruising down the ocean drive with you...`,
  },
  {
    id: "8",
    name: "Eko Freestyle",
    artist: "Runty",
    status: "Not Active",
    campaigns: 0,
    uploaded: "2026-05-10",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    genre: "Afrobeats",
    secondaryGenre: "Street Pop",
    duration: "2:45",
    bpm: 116,
    musicalKey: "G Major",
    isrc: "NG-ADR-26-00108",
    upc: "198711002348",
    releaseDate: "Unreleased",
    album: "Vault",
    label: "Audora Music Group",
    explicit: false,
    fileSize: "29.4 MB",
    fileFormat: "MP3 320 kbps",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    streams: 1800,
    radioPlays: 0,
    tvPlays: 0,
    influencerPosts: 0,
    totalReach: "5K",
    revenue: "₦ 6,500.00",
    description: "Raw unmastered freestyle celebrating the grit and hustle of Lagos streets.",
    credits: {
      producers: ["Rexxie"],
      writers: ["Abbey Runty"],
    },
    platforms: [
      { platform: "Audiomack", streams: 1800, status: "Pending", growth: "+0%", sharePercent: 100 },
    ],
    campaignsList: [],
    radioSpins: [],
    streamHistory: [
      { date: "May 10", streams: 1800, radio: 0 },
    ],
    lyrics: `[Intro]
Eko o ni baje o!
Freestyle mode...`,
  },
];

export const getTrackById = (id: string): TrackDetail | undefined => {
  return initialTracks.find((t) => t.id === id);
};
