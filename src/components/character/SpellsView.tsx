import React from 'react';
import { useCharacterStore } from '../../store/useCharacterStore';
import { Book, Plus, Trash2, Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SpellsView: React.FC = () => {
    const { currentChar, updateBasicInfo } = useCharacterStore();
    const [showAdd, setShowAdd] = React.useState(false);
    const [newSpell, setNewSpell] = React.useState({ name: '', level: 0, castingTime: '', range: '', description: '' });

    if (!currentChar) return null;

    const handleAddSpell = () => {
        if (!newSpell.name) return;
        const updatedSpells = [...currentChar.spells, newSpell];
        updateBasicInfo({ spells: updatedSpells });
        setNewSpell({ name: '', level: 0, castingTime: '', range: '', description: '' });
        setShowAdd(false);
    };

    const removeSpell = (index: number) => {
        const updatedSpells = currentChar.spells.filter((_, i) => i !== index);
        updateBasicInfo({ spells: updatedSpells });
    };

    // Agrupar magias por nível
    const spellLevels = Array.from({ length: 10 }, (_, i) => i);

    return (
        <div className="p-6 space-y-8 pb-32">
            <header className="flex justify-between items-center">
                <div>
                    <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] mb-1">Grimório Arcano</h3>
                    <p className="text-[10px] text-slate-500 font-medium">Gerencie seus truques e magias de nível 1 a 9.</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500/20 transition-all"
                >
                    <Plus size={20} />
                </button>
            </header>

            {/* Stats de Magia */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">CD de Magia</span>
                    <span className="text-2xl font-black text-blue-400">{8 + (Math.ceil(currentChar.level / 4) + 1) + (currentChar.attributes.intelligence.modifier)}</span>
                </div>
                <div className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Bônus de Ataque</span>
                    <span className="text-2xl font-black text-blue-400">+{(Math.ceil(currentChar.level / 4) + 1) + (currentChar.attributes.intelligence.modifier)}</span>
                </div>
            </div>

            <AnimatePresence>
                {showAdd && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-slate-900 border border-blue-500/30 p-6 rounded-3xl space-y-4 shadow-2xl shadow-blue-500/10"
                    >
                        <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest">Nova Magia</h4>
                        <div className="space-y-3">
                            <input
                                placeholder="Nome da Magia"
                                className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500/50"
                                value={newSpell.name}
                                onChange={e => setNewSpell({ ...newSpell, name: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <select
                                    className="bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm text-slate-300 focus:outline-none"
                                    value={newSpell.level}
                                    onChange={e => setNewSpell({ ...newSpell, level: parseInt(e.target.value) })}
                                >
                                    {spellLevels.map(l => <option key={l} value={l}>{l === 0 ? 'Truque' : `Nível ${l}`}</option>)}
                                </select>
                                <input
                                    placeholder="Tempo"
                                    className="bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none"
                                    value={newSpell.castingTime}
                                    onChange={e => setNewSpell({ ...newSpell, castingTime: e.target.value })}
                                />
                            </div>
                            <textarea
                                placeholder="Descrição"
                                className="w-full h-24 bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none resize-none"
                                value={newSpell.description}
                                onChange={e => setNewSpell({ ...newSpell, description: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddSpell}
                                className="flex-1 py-3 bg-blue-500 text-slate-950 font-black uppercase text-xs rounded-xl"
                            >
                                Catalogar Magia
                            </button>
                            <button
                                onClick={() => setShowAdd(false)}
                                className="px-6 py-3 bg-slate-800 text-slate-400 font-black uppercase text-xs rounded-xl"
                            >
                                Cancelar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-8">
                {spellLevels.map(level => {
                    const spellsInLevel = currentChar.spells.filter(s => s.level === level);
                    if (spellsInLevel.length === 0 && !showAdd) return null;
                    if (spellsInLevel.length === 0) return null;

                    return (
                        <div key={level} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Sparkles size={14} className="text-blue-500/50" />
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{level === 0 ? 'Truques' : `Magias de Nível ${level}`}</h4>
                                <div className="flex-1 h-[1px] bg-white/5" />
                            </div>

                            <div className="grid gap-3">
                                {spellsInLevel.map((spell, idx) => (
                                    <div key={idx} className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 space-y-2 relative group">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                                <Wand2 size={16} className="text-blue-400" />
                                                <span className="font-bold text-slate-100">{spell.name}</span>
                                            </div>
                                            <button
                                                onClick={() => removeSpell(currentChar.spells.indexOf(spell))}
                                                className="text-slate-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        {spell.castingTime && <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{spell.castingTime} • {spell.range}</p>}
                                        <p className="text-xs text-slate-400 leading-relaxed">{spell.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {currentChar.spells.length === 0 && !showAdd && (
                    <div className="text-center py-12 space-y-4 opacity-50">
                        <Book size={48} className="mx-auto text-slate-800" />
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest leading-loose">
                            Seu livro de magias está vazio.<br />Toque no "+" para começar sua jornada mística.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
