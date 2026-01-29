import React from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { AttributeCard } from './AttributeCard';
import { User, Shield, Book, Sword, ScrollText } from 'lucide-react';

export const CharacterView: React.FC = () => {
    const { currentChar, updateAttribute, updateBasicInfo } = useCharacterStore();

    if (!currentChar) return null;

    const getArchetypeIcon = () => {
        switch (currentChar.archetype) {
            case 'tank': return <Shield size={32} className="text-amber-500" />;
            case 'mage': return <Book size={32} className="text-blue-500" />;
            case 'assassin': return <Sword size={32} className="text-emerald-500" />;
            case 'investigator': return <ScrollText size={32} className="text-purple-500" />;
            default: return <User size={32} className="text-slate-500" />;
        }
    };

    return (
        <div className="p-6 space-y-8 pb-32">
            {/* Avatar & Header */}
            <section className="flex items-center gap-6 bg-slate-900/40 p-6 rounded-3xl border border-white/5">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center border-2 border-slate-700/50 relative overflow-hidden">
                    {getArchetypeIcon()}
                    {currentChar.avatar && <img src={currentChar.avatar} alt="Avatar" className="absolute inset-0 object-cover" />}
                </div>
                <div className="flex-1 space-y-1">
                    <input
                        type="text"
                        value={currentChar.name}
                        onChange={(e) => updateBasicInfo({ name: e.target.value })}
                        className="bg-transparent border-none p-0 text-xl font-black text-slate-100 focus:outline-none w-full"
                    />
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{currentChar.archetype}</span>
                        <span className="text-xs font-bold text-slate-500 italic">{currentChar.race} {currentChar.class}</span>
                    </div>
                </div>
            </section>

            {/* Informações Básicas Secundárias */}
            <section className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Nível</label>
                    <div className="flex items-center gap-2">
                        <button onClick={() => updateBasicInfo({ level: Math.max(1, currentChar.level - 1) })} className="bg-slate-900 w-8 h-8 rounded-lg border border-white/5">-</button>
                        <span className="flex-1 text-center font-black text-slate-100">{currentChar.level}</span>
                        <button onClick={() => updateBasicInfo({ level: Math.min(20, currentChar.level + 1) })} className="bg-slate-900 w-8 h-8 rounded-lg border border-white/5">+</button>
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Iniciativa</label>
                    <div className="bg-slate-900 h-8 rounded-lg border border-white/5 flex items-center justify-center font-black text-amber-500">
                        {currentChar.initiative >= 0 ? `+${currentChar.initiative}` : currentChar.initiative}
                    </div>
                </div>
            </section>

            {/* Atributos */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em]">Atributos</h3>
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">PHB 5E Standard</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <AttributeCard label="Força" value={currentChar.attributes.strength.value} modifier={currentChar.attributes.strength.modifier} color="bg-red-500" onChange={(val) => updateAttribute('strength', val)} />
                    <AttributeCard label="Destreza" value={currentChar.attributes.dexterity.value} modifier={currentChar.attributes.dexterity.modifier} color="bg-emerald-500" onChange={(val) => updateAttribute('dexterity', val)} />
                    <AttributeCard label="Const." value={currentChar.attributes.constitution.value} modifier={currentChar.attributes.constitution.modifier} color="bg-orange-500" onChange={(val) => updateAttribute('constitution', val)} />
                    <AttributeCard label="Intelig." value={currentChar.attributes.intelligence.value} modifier={currentChar.attributes.intelligence.modifier} color="bg-blue-500" onChange={(val) => updateAttribute('intelligence', val)} />
                    <AttributeCard label="Sabedoria" value={currentChar.attributes.wisdom.value} modifier={currentChar.attributes.wisdom.modifier} color="bg-purple-500" onChange={(val) => updateAttribute('wisdom', val)} />
                    <AttributeCard label="Carisma" value={currentChar.attributes.charisma.value} modifier={currentChar.attributes.charisma.modifier} color="bg-pink-500" onChange={(val) => updateAttribute('charisma', val)} />
                </div>
            </section>

            {/* Seção Modular: Antecedente */}
            {currentChar.config.showBackground && (
                <section className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 space-y-4">
                    <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em]">Antecedente e História</h3>
                    <textarea
                        value={currentChar.background}
                        onChange={(e) => updateBasicInfo({ background: e.target.value })}
                        placeholder="Conte a lenda do seu herói..."
                        className="w-full h-32 bg-transparent border-none text-slate-300 text-sm focus:outline-none resize-none leading-relaxed"
                    />
                </section>
            )}
        </div>
    );
};
