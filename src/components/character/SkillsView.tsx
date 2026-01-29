import React from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { ShieldCheck, Shield } from 'lucide-react';

export const SkillsView: React.FC = () => {
    const { currentChar, toggleSkillProficiency } = useCharacterStore();

    if (!currentChar) return null;

    return (
        <div className="p-6 space-y-6 pb-32">
            <header>
                <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] mb-2">Perícias</h3>
                <p className="text-[10px] text-slate-500 font-medium">Os bônus são calculados automaticamente com base em seus atributos e nível.</p>
            </header>

            <div className="space-y-2">
                {currentChar.skills.map((skill) => (
                    <button
                        key={skill.name}
                        onClick={() => toggleSkillProficiency(skill.name)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${skill.proficient
                                ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                                : 'bg-slate-900/50 border-white/5 text-slate-400'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {skill.proficient ? <ShieldCheck size={18} className="text-amber-500" /> : <Shield size={18} className="text-slate-700" />}
                            <div className="text-left">
                                <span className="block font-bold text-sm tracking-tight">{skill.name}</span>
                                <span className="text-[10px] uppercase font-black opacity-50">{skill.attribute.substring(0, 3)}</span>
                            </div>
                        </div>

                        <div className={`text-lg font-black tabular-nums ${skill.proficient ? 'text-amber-400' : 'text-slate-500'}`}>
                            {skill.bonus >= 0 ? `+${skill.bonus}` : skill.bonus}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
