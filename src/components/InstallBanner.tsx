import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface InstallBannerProps {
  onInstall: () => void;
  show: boolean;
}

export const InstallBanner: React.FC<InstallBannerProps> = ({ onInstall, show }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hasDismissed = localStorage.getItem('audora_install_dismissed');
    if (show && !dismissed && !hasDismissed) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [show, dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setIsVisible(false);
    localStorage.setItem('audora_install_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-fade-in-up">
      <div className="bg-[#1a1207] border border-[#f5b640]/30 rounded-xl p-4 shadow-2xl backdrop-blur-md flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-[#f5b640] font-semibold text-sm">Install App</h3>
          <p className="text-xs text-white/80 mt-1">Get the best experience on your mobile device.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onInstall}
            className="bg-[#f5b640] text-black text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1 hover:bg-[#ffca52] transition-colors shadow-lg"
          >
            <Download size={14} />
            Install
          </button>
          <button 
            onClick={handleDismiss}
            className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
