import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Download,
  Users,
  Eye,
  Heart,
  SquarePen,

} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchCampaignById } from "@/services/artist/campaigns";
import {
  MOCK_CAMPAIGN_DETAIL,
  type CampaignDetailData,
  type CampaignInfluencerItem,
} from "@/data/mockCampaigns";
import FacebookIcon from "@/assets/socials/Facebook.png";
import InstagramIcon from "@/assets/socials/Instagram.png";
import TiktokIcon from "@/assets/socials/Tiktok.png";
import TwitterIcon from "@/assets/socials/X.png";

export const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState<CampaignDetailData>(MOCK_CAMPAIGN_DETAIL);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<CampaignInfluencerItem>(
    MOCK_CAMPAIGN_DETAIL.topPerformer
  );
  console.log(loading)
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCampaignById(id)
      .then((res: any) => {
        if (res && res.id) {

          setCampaign({
            ...MOCK_CAMPAIGN_DETAIL,
            id: res.id,
            trackTitle: res.media?.title || MOCK_CAMPAIGN_DETAIL.trackTitle,
            coverImage: res.media?.fileUrl || MOCK_CAMPAIGN_DETAIL.coverImage,
            budget: res.budget || MOCK_CAMPAIGN_DETAIL.budget,
            durationDays: res.durationDays || MOCK_CAMPAIGN_DETAIL.durationDays,
            influencersAssigned: res.assigned || MOCK_CAMPAIGN_DETAIL.influencersAssigned,
            status: res.status === "ACTIVE" ? "Active" : res.status === "COMPLETED" ? "Completed" : "Cancelled",
          });
        }
      })
      .catch(() => {
        // Fallback gracefully to mock data
        setCampaign(MOCK_CAMPAIGN_DETAIL);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleOpenModal = (influencer?: CampaignInfluencerItem) => {
    if (influencer) {
      setSelectedInfluencer(influencer);
    } else {
      setSelectedInfluencer(campaign.topPerformer);
    }
    setIsModalOpen(true);
  };

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="w-full pb-20 text-white font-sans">

      <div className="mb-5">
        <button
          onClick={() => navigate("/dashboard/campaigns")}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </button>
      </div>

      <div className="bg-[#0D0B07] border border-[#BD8000]/40 rounded-lg p-3 mb-6">
        <div className="gap-5">
          <div className="flex  gap-4">
            <img
              src={campaign.coverImage}
              alt={campaign.trackTitle}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover shadow-lg border border-white/5"
            />
            <div>

              <div className="flex  items-center justify-between gap-3">
                <div className="flex gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {campaign.trackTitle}
                </h1>
                <span className="text-xs px-3 py-2 rounded-lg font-medium bg-[#A67102]/20 text-[#D49A24]  text-center">
                  {campaign.status}
                </span>
                </div>

                <button
                  onClick={handleDownloadReport}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-800 bg-[#14120D] text-xs sm:text-sm font-medium text-gray-200 hover:text-white hover:border-[#A67102] transition-colors self-start cursor-pointer"
                >
                  <span>Download Report</span>
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-5  w-[900px]  text-left">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Budget</p>
                  <p className="text-sm sm:text-base font-semibold text-white font-mono">
                    ₦ {campaign.budget.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Duration</p>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {campaign.durationDays} days
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Start Date</p>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {campaign.startDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">End Date</p>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {campaign.endDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Influencers assigned</p>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {campaign.influencersAssigned}
                  </p>
                </div>
              </div>
            </div>


          </div>


        </div>


      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-[#0D0B07] border border-[#BD8000]/40 rounded-lg p-5 flex flex-col justify-between">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#3D2906] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#D49A24]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Reach</p>
              <p className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                {campaign.stats.totalReach}
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-[#BD8000]/40">
            <span className="text-[11px] text-emerald-400 font-medium">
              {campaign.stats.reachGrowth}
            </span>
          </div>
        </div>

      
        <div className="bg-[#0D0B07] border border-[#BD8000]/40 rounded-lg p-5 flex flex-col justify-between">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#3D2906] flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5 text-[#D49A24]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Views</p>
              <p className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                {campaign.stats.totalViews}
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-[#BD8000]/40">
            <span className="text-[11px] text-emerald-400 font-medium">
              {campaign.stats.viewsGrowth}
            </span>
          </div>
        </div>

      
        <div className="bg-[#0D0B07] border border-[#BD8000]/40 rounded-lg p-5 flex flex-col justify-between">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#3D2906] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-[#D49A24]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Engagement</p>
              <p className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                {campaign.stats.totalEngagement}
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-[#BD8000]/40">
            <span className="text-[11px] text-emerald-400 font-medium">
              {campaign.stats.engagementGrowth}
            </span>
          </div>
        </div>
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch">
      
        <div className="lg:col-span-2 bg-[#0D0B07] border border-[#BD8000]/40 rounded-lg p-6 relative flex flex-col justify-between">
          <div className="flex items-center justify-end mb-4">
            <span className="text-xs px-3 py-1 rounded-full font-medium bg-[#A67102]/20 text-[#D49A24] border border-[#A67102]/30">
              Active
            </span>
          </div>

          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={campaign.chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="campaignGoldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D49A24" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#D49A24" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="#52525b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#27272a" }}
                />
                <YAxis
                  stroke="#52525b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 25000]}
                  ticks={[0, 5000, 10000, 15000, 20000, 25000]}
                  tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000}K`)}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#14120D] border border-[#A67102]/40 rounded-xl p-2.5 shadow-2xl text-xs">
                          <p className="text-gray-400 font-mono text-[11px]">29 July 00:00</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-white font-bold font-mono">
                              {Number(payload[0].value).toLocaleString()}
                            </span>
                            <span className="text-emerald-400 text-[10px] font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              +3.4%
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#D49A24"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#campaignGoldGradient)"
                  dot={{ r: 3, fill: "#D49A24", strokeWidth: 1, stroke: "#000" }}
                  activeDot={{ r: 5, fill: "#D49A24" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className="bg-[#0D0B07] border border-[#BD8000]/40 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={campaign.topPerformer.avatar}
                    alt={campaign.topPerformer.handle}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                  <img
                    src={TiktokIcon}
                    alt="Tiktok"
                    className="w-4 h-4 absolute -bottom-1 -right-1 bg-black rounded-full p-0.5"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {campaign.topPerformer.handle}
                  </h3>
                </div>
              </div>

              <span className="text-xs px-3 py-1 rounded-lg font-medium bg-[#A67102]/20 text-[#D49A24] border border-[#A67102]/30">
                Top Performer
              </span>
            </div>

           
            <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-900 mb-6 text-left">
              <div>
                <p className="text-xs text-gray-400 mb-1">Reach</p>
                <p className="text-sm sm:text-base font-bold text-white font-mono">
                  {campaign.topPerformer.reach}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Engagement</p>
                <p className="text-sm sm:text-base font-bold text-white font-mono">
                  {campaign.topPerformer.engagement}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Posts</p>
                <p className="text-sm sm:text-base font-bold text-white font-mono">
                  {campaign.topPerformer.posts}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleOpenModal(campaign.topPerformer)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-800 bg-[#14120D] hover:border-[#A67102] hover:bg-[#A67102]/10 text-xs sm:text-sm font-medium text-white transition-all cursor-pointer"
          >
            <span>View Content</span>
            <SquarePen className="w-4 h-4 text-[#D49A24]" />
          </button>
        </div>
      </div>

      <div className="bg-[#0D0B07] border border-[#BD8000]/40 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#BD8000]/40 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6">Influencer</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date Posted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900/60">
              {campaign.influencers.map((inf) => (
                <tr
                  key={inf.id}
                  onClick={() => handleOpenModal(inf)}
                  className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={inf.avatar}
                        alt={inf.name}
                        className="w-10 h-10 rounded-xl object-cover border border-white/10"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{inf.name}</p>
                        <p className="text-xs text-gray-400">{inf.handle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {inf.status === "Posted" ? (
                      <span className="inline-block px-3.5 py-1 text-xs font-medium rounded-sm bg-green-800/25 text-[#1CB65D] dark:bg-emerald-500/15 dark:text-emerald-400 dark:border dark:border-emerald-500/20">
                        Posted
                      </span>
                    ) : (
                      <span className="inline-block px-3.5 py-1 text-xs font-medium rounded-sm   bg-yellow-800/25 text-[#D97706] dark:bg-amber-500/15 dark:text-amber-300 dark:border dark:border-amber-500/20">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300 font-mono">
                    {inf.datePosted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-[#080705] border border-gray-900 text-white rounded-lg  sm:p-8 shadow-2xl">
          <DialogHeader className="p-0 text-left">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold text-white tracking-tight">
                  Campaign
                </DialogTitle>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                  AUDORA AUTO-ASSIGNS INFLUENCERS BASED ON YOUR PACKAGE.
                </p>
              </div>
            </div>
          </DialogHeader>

       
          <div className="mt-2">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#14120D] border border-gray-800">
              <img
                src={selectedInfluencer.avatar}
                alt={selectedInfluencer.name}
                className="w-7 h-7 rounded-lg object-cover"
              />
              <span className="text-xs font-medium text-gray-200">
                {selectedInfluencer.name}
              </span>
            </div>
          </div>

        
          <div className="mt-2 bg-[#0F0D09] border border-amber-900/40 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={campaign.coverImage}
                alt={campaign.trackTitle}
                className="w-12 h-12 rounded-lg object-cover shadow"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{campaign.trackTitle}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{campaign.genre}</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-medium bg-[#A67102]/20 text-[#D49A24] border border-[#A67102]/30">
                Active
              </span>
              <span className="text-xs text-gray-400 font-mono">
                Days left • {campaign.daysLeft}
              </span>
            </div>
          </div>

         
          <div className="mt-6 border border-amber-950/40 rounded-xl p-5 bg-[#0A0906]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                <div className="flex items-center gap-2 mb-3">
                  <img src={FacebookIcon} alt="Facebook" className="w-5 h-5 object-contain" />
                  <span className="text-xs font-semibold text-amber-200">Facebook</span>
                </div>
                <div className="space-y-2">
                  {campaign.platformLinks.facebook.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400 shrink-0">Link •</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:underline truncate max-w-[220px]"
                      >
                        {link.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

           
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <img src={TiktokIcon} alt="TikTok" className="w-5 h-5 object-contain" />
                  <span className="text-xs font-semibold text-amber-200">Tiktok</span>
                </div>
                <div className="space-y-2">
                  {campaign.platformLinks.tiktok.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400 shrink-0">Link •</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:underline truncate max-w-[220px]"
                      >
                        {link.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instagram */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <img src={InstagramIcon} alt="Instagram" className="w-5 h-5 object-contain" />
                  <span className="text-xs font-semibold text-amber-200">Instagram</span>
                </div>
                <div className="space-y-2">
                  {campaign.platformLinks.instagram.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400 shrink-0">Link •</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:underline truncate max-w-[220px]"
                      >
                        {link.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Twitter (X) */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <img src={TwitterIcon} alt="Twitter" className="w-5 h-5 object-contain" />
                  <span className="text-xs font-semibold text-amber-200">Twitter</span>
                </div>
                <div className="space-y-2">
                  {campaign.platformLinks.twitter.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400 shrink-0">Link •</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:underline truncate max-w-[220px]"
                      >
                        {link.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignDetails;
