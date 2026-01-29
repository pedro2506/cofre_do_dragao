import React from 'react';

interface BackgroundLayoutProps {
    children: React.ReactNode;
}

export const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
            {/* Background Image Layer */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{
                    backgroundImage: 'url("/bg-vault.png")',
                    filter: 'blur(1px) brightness(0.6)'
                }}
            />

            {/* Vignette & Gradient Overlays */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950" />
            <div className="fixed inset-0 z-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />

            {/* Content Layer */}
            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </div>
    );
};
