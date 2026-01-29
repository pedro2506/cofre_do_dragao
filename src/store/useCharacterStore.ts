import { create } from 'zustand';
import type { CharacterSheet, Archetype } from '../types';
import { db } from '../db';
import { calculateModifier, calculateProficiencyBonus, calculateSkillBonus } from '../rules/dnd-engine';
import { getArchetypePreset, initializeSkills } from '../rules/archetypes';

interface CharacterState {
    currentChar: CharacterSheet | null;
    isLoading: boolean;

    // Actions
    loadCharacter: (id: number) => Promise<void>;
    updateAttribute: (attr: keyof CharacterSheet['attributes'], value: number) => Promise<void>;
    updateBasicInfo: (info: Partial<CharacterSheet>) => Promise<void>;
    toggleSkillProficiency: (skillName: string) => Promise<void>;
    updateConfig: (config: Partial<CharacterSheet['config']>) => Promise<void>;
    createNewCharacter: (archetype: Archetype) => Promise<number>;
    deleteCharacter: (id: number) => Promise<void>;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
    currentChar: null,
    isLoading: false,

    loadCharacter: async (id) => {
        set({ isLoading: true });
        const char = await db.characters.get(id);
        set({ currentChar: char || null, isLoading: false });
    },

    updateAttribute: async (attr, value) => {
        const { currentChar } = get();
        if (!currentChar) return;

        const newModifier = calculateModifier(value);
        const updatedChar = {
            ...currentChar,
            attributes: {
                ...currentChar.attributes,
                [attr]: { value, modifier: newModifier }
            },
            updatedAt: Date.now()
        };

        const profBonus = calculateProficiencyBonus(updatedChar.level);
        updatedChar.skills = updatedChar.skills.map(skill => {
            if (skill.attribute === attr) {
                return {
                    ...skill,
                    bonus: calculateSkillBonus(value, skill.proficient, profBonus)
                };
            }
            return skill;
        });

        set({ currentChar: updatedChar });
        await db.characters.update(currentChar.id!, updatedChar);
    },

    updateBasicInfo: async (info) => {
        const { currentChar } = get();
        if (!currentChar) return;

        const updatedChar = { ...currentChar, ...info, updatedAt: Date.now() };

        if (info.level !== undefined) {
            const profBonus = calculateProficiencyBonus(info.level);
            updatedChar.skills = updatedChar.skills.map(skill => ({
                ...skill,
                bonus: calculateSkillBonus(
                    updatedChar.attributes[skill.attribute].value,
                    skill.proficient,
                    profBonus
                )
            }));
        }

        set({ currentChar: updatedChar });
        await db.characters.update(currentChar.id!, updatedChar);
    },

    updateConfig: async (configUpdate) => {
        const { currentChar } = get();
        if (!currentChar) return;

        const updatedChar = {
            ...currentChar,
            config: { ...currentChar.config, ...configUpdate },
            updatedAt: Date.now()
        };
        set({ currentChar: updatedChar });
        await db.characters.update(currentChar.id!, updatedChar);
    },

    toggleSkillProficiency: async (skillName) => {
        const { currentChar } = get();
        if (!currentChar) return;

        const profBonus = calculateProficiencyBonus(currentChar.level);
        const updatedChar = {
            ...currentChar,
            skills: currentChar.skills.map(skill => {
                if (skill.name === skillName) {
                    const isNowProficient = !skill.proficient;
                    const attrValue = currentChar.attributes[skill.attribute].value;
                    return {
                        ...skill,
                        proficient: isNowProficient,
                        bonus: calculateSkillBonus(attrValue, isNowProficient, profBonus)
                    };
                }
                return skill;
            }),
            updatedAt: Date.now()
        };

        set({ currentChar: updatedChar });
        await db.characters.update(currentChar.id!, updatedChar);
    },

    createNewCharacter: async (archetype: Archetype) => {
        const preset = getArchetypePreset(archetype);

        const newChar: CharacterSheet = {
            name: `Novo ${archetype}`,
            race: 'Humano',
            class: preset.class || 'Aventureiro',
            level: 1,
            background: '',
            alignment: 'Neutro',
            experience: 0,
            archetype,
            ...preset,
            attributes: preset.attributes as any,
            skills: initializeSkills(1, preset.attributes),
            actions: [],
            spells: [],
            equipment: [],
            config: preset.config || { showSpells: true, showSkills: true, showInventory: true, showBackground: true },
            createdAt: Date.now(),
            updatedAt: Date.now(),
            hp: preset.hp || { current: 10, max: 10, temp: 0 },
            ac: preset.ac || 10,
            initiative: calculateModifier((preset.attributes as any).dexterity.value),
            speed: 30,
        };

        const id = await db.characters.add(newChar);
        set({ currentChar: { ...newChar, id } });
        return id as number;
    },

    deleteCharacter: async (id) => {
        await db.characters.delete(id);
        const { currentChar } = get();
        if (currentChar?.id === id) {
            set({ currentChar: null });
        }
    }
}));
