import React from 'react';
import { useCharacterStore } from './store/useCharacterStore';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import { Plus, User, Sword, Book, Shield, Settings, Trash2, X, Download, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { CharacterView } from './components/character/CharacterView';
import { CombatView } from './components/character/CombatView';
import { SkillsView } from './components/character/SkillsView';
import { SpellsView } from './components/character/SpellsView';
import { exportCharacterToJSON, importCharacterFromJSON } from './utils/serialization';
import { ARCHETYPES_CONFIG } from './rules/archetypes';
import { BackgroundLayout } from './components/layout/BackgroundLayout';

export default function App() {
  const { currentChar, loadCharacter, createNewCharacter, deleteCharacter, updateConfig, isLoading } = useCharacterStore();
  const characters = useLiveQuery(() => db.characters.toArray());
  const [activeTab, setActiveTab] = React.useState('char');
  const [showArchetypeSelect, setShowArchetypeSelect] = React.useState(false);
  const [showConfig, setShowConfig] = React.useState(false);
  const [installPrompt, setInstallPrompt] = React.useState<any>(null);

  React.useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  if (!currentChar && !isLoading) {
    return (
      <BackgroundLayout>
        <div className="min-h-screen p-6 flex flex-col items-center justify-center space-y-8">
          <header className="text-center space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-500">
              COFRE DO DRAGÃO
            </h1>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Suas lendas protegidas</p>
          </header>

          <div className="w-full max-w-sm space-y-4 overflow-y-auto max-h-[60vh] px-2">
            {!showArchetypeSelect ? (
              <button
                onClick={() => setShowArchetypeSelect(true)}
                className="w-full p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-amber-500/50 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
                    <Plus size={24} />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-slate-50">Nova Ficha</span>
                    <span className="text-xs text-slate-500">Escolha um arquétipo</span>
                  </div>
                </div>
              </button>
            ) : (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <button onClick={() => setShowArchetypeSelect(false)} className="text-xs text-slate-500 font-bold uppercase mb-2 flex items-center gap-1">
                  <X size={14} /> Voltar
                </button>
                <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-4">Escolha seu Destino</h3>
                {ARCHETYPES_CONFIG.map((config) => (
                  <ArchetypeButton
                    key={config.type}
                    onClick={() => createNewCharacter(config.type)}
                    label={config.label}
                    sub={config.sub}
                    avatar={config.avatar}
                  />
                ))}

                <div className="pt-4 border-t border-white/5">
                  <label className="w-full p-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-dashed border-slate-700 hover:border-slate-500 flex items-center justify-center gap-2 cursor-pointer transition-all">
                    <Upload size={16} className="text-slate-500" />
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Save Game (Carregar)</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const char = await importCharacterFromJSON(file);
                            delete char.id;
                            await db.characters.add(char);
                            const last = await db.characters.orderBy('id').last();
                            if (last?.id) loadCharacter(last.id);
                          } catch (err) {
                            alert(err instanceof Error ? err.message : 'Erro ao importar');
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            )}

            {!showArchetypeSelect && characters?.map(char => (
              <div key={char.id} className="relative group">
                <button
                  onClick={() => char.id && loadCharacter(char.id)}
                  className="w-full p-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-800/50 hover:border-slate-700 flex items-center gap-4 transition-all"
                >
                  <div className={`w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden border border-white/5`}>
                    {char.avatar ? (
                      <img src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/${char.avatar}`} alt={char.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} className="text-slate-600" />
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <span className="block font-semibold text-slate-50">{char.name}</span>
                    <span className="text-xs text-slate-500">{char.race} {char.class} • Nív {char.level}</span>
                  </div>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); char.id && deleteCharacter(char.id); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-rose-500/50 hover:text-rose-500 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </BackgroundLayout>
    );
  }

  return (
    <BackgroundLayout>
      <div className="min-h-screen flex flex-col pb-20">
        <header className="px-6 py-4 bg-slate-900/40 border-b border-white/5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
              <User className="text-slate-600" size={24} />
            </div>
            <div>
              <h2 className="font-bold text-amber-200 text-sm leading-tight">{currentChar?.name}</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                {currentChar?.class} • Nível {currentChar?.level}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className={`p-2 rounded-lg transition-colors ${showConfig ? 'bg-amber-500 text-slate-950' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Settings size={20} />
            </button>
            <button
              onClick={() => useCharacterStore.setState({ currentChar: null })}
              className="p-2 text-slate-500 hover:text-slate-300"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        <AnimatePresence>
          {showConfig && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm"
            >
              <div className="bg-slate-900 border border-white/10 p-6 rounded-3xl w-full max-w-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-100 uppercase text-xs tracking-widest">Configuração Modular</h3>
                  <button onClick={() => setShowConfig(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
                </div>
                <div className="space-y-4">
                  <ConfigToggle label="Mostrar Magias" active={currentChar?.config.showSpells || false} onToggle={() => updateConfig({ showSpells: !currentChar?.config.showSpells })} />
                  <ConfigToggle label="Mostrar Perícias" active={currentChar?.config.showSkills || false} onToggle={() => updateConfig({ showSkills: !currentChar?.config.showSkills })} />
                  <ConfigToggle label="Mostrar Inventário" active={currentChar?.config.showInventory || false} onToggle={() => updateConfig({ showInventory: !currentChar?.config.showInventory })} />
                  <ConfigToggle label="Mostrar Antecedente" active={currentChar?.config.showBackground || false} onToggle={() => updateConfig({ showBackground: !currentChar?.config.showBackground })} />
                </div>
                <button
                  onClick={() => setShowConfig(false)}
                  className="w-full py-3 bg-amber-500 text-slate-950 font-black uppercase text-xs rounded-xl"
                >
                  Salvar Configurações
                </button>
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="p-3 bg-slate-800/50 rounded-lg border border-white/5">
                    <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Status do App</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${installPrompt ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                      <span className="text-[10px] text-slate-400">
                        {installPrompt ? 'Pronto para instalar' : 'Instalação bloqueada (HTTPS ou Cache)'}
                      </span>
                    </div>
                  </div>

                  {installPrompt && (
                    <button
                      onClick={handleInstallClick}
                      className="w-full py-3 bg-amber-500 text-slate-950 font-black uppercase text-[10px] tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    >
                      <Plus size={14} /> Instalar Cofre do Dragão
                    </button>
                  )}
                  <button
                    onClick={() => currentChar && exportCharacterToJSON(currentChar)}
                    className="w-full py-3 bg-slate-800 text-slate-300 font-bold uppercase text-[10px] tracking-widest rounded-xl flex items-center justify-center gap-2"
                  >
                    <Download size={14} /> Save Game (Salvar)
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'char' && (
              <motion.div key="char" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <CharacterView />
              </motion.div>
            )}
            {activeTab === 'combat' && (
              <motion.div key="combat" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <CombatView />
              </motion.div>
            )}
            {activeTab === 'skills' && currentChar?.config.showSkills && (
              <motion.div key="skills" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <SkillsView />
              </motion.div>
            )}
            {activeTab === 'spells' && currentChar?.config.showSpells && (
              <motion.div key="spells" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <SpellsView />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/40 backdrop-blur-xl border-t border-white/5 flex items-center justify-around z-20">
          <NavButton active={activeTab === 'char'} onClick={() => setActiveTab('char')} icon={<User size={20} />} label="Ficha" />
          <NavButton active={activeTab === 'combat'} onClick={() => setActiveTab('combat')} icon={<Sword size={20} />} label="Combate" />
          {currentChar?.config.showSkills && <NavButton active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} icon={<Shield size={20} />} label="Perícias" />}
          {currentChar?.config.showSpells && <NavButton active={activeTab === 'spells'} onClick={() => setActiveTab('spells')} icon={<Book size={20} />} label="Magias" />}
        </nav>
      </div>
    </BackgroundLayout>
  );
}

function ArchetypeButton({ onClick, label, sub, avatar }: { onClick: () => void, label: string, sub: string, avatar: string }) {
  return (
    <button onClick={onClick} className="w-full p-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-amber-500/30 flex items-center gap-4 transition-all">
      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden border border-white/5">
        <img src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/${avatar}`} alt={label} className="w-full h-full object-cover" />
      </div>
      <div className="text-left">
        <span className="block font-bold text-slate-100">{label}</span>
        <span className="text-[10px] text-slate-500 uppercase font-black">{sub}</span>
      </div>
    </button>
  );
}

function ConfigToggle({ label, active, onToggle }: { label: string, active: boolean, onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
      <span className="text-xs font-bold text-slate-300">{label}</span>
      <button onClick={onToggle} className={`w-10 h-6 rounded-full transition-colors relative ${active ? 'bg-amber-500' : 'bg-slate-700'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-5' : 'left-1'}`} />
      </button>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-amber-400 scale-110' : 'text-slate-500'}`}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
  );
}
