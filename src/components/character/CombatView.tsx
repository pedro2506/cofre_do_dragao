import React from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { Heart, Shield, Zap, Sword, Info } from 'lucide-react';

export const CombatView: React.FC = () => {
    const { currentChar, updateBasicInfo } = useCharacterStore();

    if (!currentChar) return null;

    const handleUpdateHP = (val: number) => {
        updateBasicInfo({
            hp: { ...currentChar.hp, current: Math.min(currentChar.hp.max, Math.max(0, val)) }
        });
    };

    return (
        <div className="p-6 space-y-8 pb-32">
            {/* HUD de Combate - Alta Visibilidade */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-white/5 rounded-[2rem] p-6 flex flex-col items-center justify-center space-y-2 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500/50" />
                    <Heart className="text-rose-500 animate-pulse" size={20} />

                    <div className="flex items-center gap-5">
                        <button onClick={() => handleUpdateHP(currentChar.hp.current - 1)} className="text-slate-600 font-black text-2xl hover:text-rose-500 transition-colors">-</button>
                        <span className="text-5xl font-black text-slate-100 tabular-nums tracking-tighter">{currentChar.hp.current}</span>
                        <button onClick={() => handleUpdateHP(currentChar.hp.current + 1)} className="text-slate-600 font-black text-2xl hover:text-emerald-500 transition-colors">+</button>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Pontos de Vida</span>
                        <span className="text-xs font-bold text-slate-400">Máximo: {currentChar.hp.max}</span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-white/5 rounded-[2rem] p-6 flex flex-col items-center justify-center space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500/50" />
                    <Shield className="text-amber-500" size={20} />

                    <div className="py-2">
                        <span className="text-5xl font-black text-slate-100 tabular-nums tracking-tighter">{currentChar.ac}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Classe de Armadura</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Proteção Total</span>
                    </div>
                </div>
            </div>

            {/* Iniciativa e Deslocamento */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className="text-cyan-500" size={16} />
                        <span className="font-bold text-xs uppercase text-slate-500">Iniciativa</span>
                    </div>
                    <span className="text-xl font-black text-slate-100">{currentChar.initiative >= 0 ? `+${currentChar.initiative}` : currentChar.initiative}</span>
                </div>

                <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className="text-amber-500" size={16} />
                        <span className="font-bold text-xs uppercase text-slate-500">Velocidade</span>
                    </div>
                    <span className="text-xl font-black text-slate-100">{currentChar.speed}ft</span>
                </div>
            </div>

            {/* Seção de Ações */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em]">Ações e Ataques</h3>
                    <Sword size={16} className="text-slate-700" />
                </div>

                <div className="bg-slate-900/40 rounded-2xl p-6 border border-dashed border-slate-800 flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-slate-900 rounded-full text-slate-700">
                        <Info size={24} />
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Você ainda não possui armas ou magias de ataque listadas.</p>
                    <button className="mt-2 text-amber-500 text-[10px] font-black uppercase tracking-widest hover:text-amber-400 transition-colors">
                        Adicionar Ação +
                    </button>
                </div>
            </section>
        </div>
    );
};
