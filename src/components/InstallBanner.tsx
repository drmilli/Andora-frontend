import React, { useState, useEffect } from 'react';
import { X, Download, Share, PlusSquare } from 'lucide-react';

interface InstallBannerProps {
  onInstall: () => void;
  show: boolean;
  isIOS?: boolean;
}

export const InstallBanner: React.FC<InstallBannerProps> = ({ onInstall, show, isIOS = false }) => {
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
      <div className="bg-[#1a1207] border border-[#f5b640]/30 rounded-xl p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-[#f5b640] font-semibold text-sm">Install App</h3>
            <p className="text-xs text-white/80 mt-1">
              {isIOS 
                ? "Install this app on your home screen for a better experience."
                : "Get the best experience on your mobile device."}
            </p>
            
            {isIOS && (
              <div className="mt-3 space-y-2 text-xs text-white/90 bg-white/5 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="bg-[#f5b640] text-black w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>Tap the <Share size={12} className="inline mx-1" /> Share button</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#f5b640] text-black w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>Select <PlusSquare size={12} className="inline mx-1" /> Add to Home Screen</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2 items-end">
            {!isIOS && (
              <button 
                onClick={onInstall}
                className="bg-[#f5b640] text-black text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1 hover:bg-[#ffca52] transition-colors shadow-lg whitespace-nowrap"
              >
                <Download size={14} />
                Install
              </button>
            )}
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
    </div>
  );
};
