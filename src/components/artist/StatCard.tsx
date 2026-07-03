import { ArrowUpRight } from "lucide-react";

export const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value?: string;
  subtext?: string;
}> = ({ icon, title, value, subtext }) => {
  return (
    <div className="bg-[#0D0B07] p-6 rounded-2xl relative group hover:border-[#A67102]/30 transition-all border border-gray-900">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#A67102]/10 rounded-full">{icon}</div>
          <span className="text-white font-semibold text-sm">{title}</span>
        </div>
        <div className="bg-[#1A1A1A] p-1.5 rounded-full text-[#A67102] cursor-pointer">
          <ArrowUpRight size={16} />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">{value}</h2>
        <p className="text-xs text-white">{subtext}</p>
      </div>
      <div className="border-t border-gray-900 pt-4">
        <p className="text-[10px] text-[#A67102]">Updated after every upload</p>
      </div>
    </div>
  );
};
