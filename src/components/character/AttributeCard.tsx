import React from 'react';
import { motion } from 'framer-motion';

interface AttributeCardProps {
    label: string;
    value: number;
    modifier: number;
    onChange: (newValue: number) => void;
    color: string;
}

export const AttributeCard: React.FC<AttributeCardProps> = ({ label, value, modifier, onChange, color }) => {
    return (
        <motion.div
            whileTap={{ scale: 0.95 }}
            className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group"
        >
            <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />

            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500 mb-1">{label}</span>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onChange(Math.max(1, value - 1))}
                    className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white active:bg-slate-700"
                >
                    -
                </button>
                <span className="text-2xl font-black text-slate-100 tabular-nums">{value}</span>
                <button
                    onClick={() => onChange(Math.min(30, value + 1))}
                    className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white active:bg-slate-700"
                >
                    +
                </button>
            </div>

            <div className={`mt-2 px-3 py-1 rounded-lg ${modifier >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'} font-bold text-sm`}>
                {modifier >= 0 ? `+${modifier}` : modifier}
            </div>
        </motion.div>
    );
};
