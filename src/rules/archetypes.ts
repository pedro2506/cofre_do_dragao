import type { Archetype, CharacterSheet, Skill } from '../types';
import { calculateModifier, calculateProficiencyBonus, calculateSkillBonus, DEFAULT_SKILLS } from './dnd-engine';

export const getArchetypePreset = (archetype: Archetype): Partial<CharacterSheet> => {
    const baseAttributes = {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    };

    switch (archetype) {
        case 'warrior':
            return {
                class: 'Guerreiro',
                attributes: {
                    ...mapToAttr({ ...baseAttributes, strength: 16, constitution: 14, dexterity: 12 }),
                },
                avatar: 'avatars/tank.png',
                hp: { current: 12, max: 12, temp: 0 },
                ac: 16,
                config: { showSpells: false, showSkills: true, showInventory: true, showBackground: true }
            };
        case 'mage':
            return {
                class: 'Mago',
                attributes: {
                    ...mapToAttr({ ...baseAttributes, intelligence: 16, dexterity: 14, constitution: 12 }),
                },
                avatar: 'avatars/mage.png',
                hp: { current: 7, max: 7, temp: 0 },
                ac: 12,
                config: { showSpells: true, showSkills: true, showInventory: true, showBackground: true }
            };
        case 'rogue':
            return {
                class: 'Ladino',
                attributes: {
                    ...mapToAttr({ ...baseAttributes, dexterity: 18, charisma: 14, constitution: 12 }),
                },
                avatar: 'avatars/assassin.png',
                hp: { current: 9, max: 9, temp: 0 },
                ac: 15,
                config: { showSpells: false, showSkills: true, showInventory: true, showBackground: true }
            };
        case 'cleric':
            return {
                class: 'Clérigo',
                attributes: {
                    ...mapToAttr({ ...baseAttributes, wisdom: 16, constitution: 14, strength: 12 }),
                },
                avatar: 'avatars/thematic.png',
                hp: { current: 10, max: 10, temp: 0 },
                ac: 16,
                config: { showSpells: true, showSkills: true, showInventory: true, showBackground: true }
            };
        case 'paladin':
            return {
                class: 'Paladino',
                attributes: {
                    ...mapToAttr({ ...baseAttributes, strength: 16, charisma: 14, constitution: 14 }),
                },
                avatar: 'avatars/investigator.png',
                hp: { current: 12, max: 12, temp: 0 },
                ac: 18,
                config: { showSpells: true, showSkills: true, showInventory: true, showBackground: true }
            };
        default:
            return {};
    }
};

export const ARCHETYPES_CONFIG: { type: Archetype; label: string; sub: string; avatar: string }[] = [
    {
        type: 'warrior',
        label: 'Guerreiro',
        sub: 'Dano e Resistência',
        avatar: 'avatars/tank.png'
    },
    {
        type: 'mage',
        label: 'Mago',
        sub: 'Poder Arcano',
        avatar: 'avatars/mage.png'
    },
    {
        type: 'rogue',
        label: 'Ladino',
        sub: 'Agilidade e Astúcia',
        avatar: 'avatars/assassin.png'
    },
    {
        type: 'cleric',
        label: 'Clérigo',
        sub: 'Cura e Suporte',
        avatar: 'avatars/thematic.png'
    },
    {
        type: 'paladin',
        label: 'Paladino',
        sub: 'Combate e Magia',
        avatar: 'avatars/investigator.png'
    },
];

const mapToAttr = (values: Record<string, number>) => {
    const result: any = {};
    for (const [key, val] of Object.entries(values)) {
        result[key] = { value: val, modifier: calculateModifier(val) };
    }
    return result;
};

export const initializeSkills = (level: number, attributes: any): Skill[] => {
    const profBonus = calculateProficiencyBonus(level);
    return DEFAULT_SKILLS.map(s => ({
        name: s.name,
        attribute: s.attribute,
        proficient: false,
        bonus: calculateSkillBonus(attributes[s.attribute].value, false, profBonus)
    }));
};
