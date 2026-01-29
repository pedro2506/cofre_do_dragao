import type { Attributes } from '../types';

export const calculateModifier = (value: number): number => {
    return Math.floor((value - 10) / 2);
};

export const calculateProficiencyBonus = (level: number): number => {
    return Math.ceil(level / 4) + 1;
};

export const calculateSkillBonus = (
    attrValue: number,
    isProficient: boolean,
    proficiencyBonus: number
): number => {
    const modifier = calculateModifier(attrValue);
    return modifier + (isProficient ? proficiencyBonus : 0);
};

export const DEFAULT_SKILLS: { name: string; attribute: keyof Attributes }[] = [
    { name: 'Acrobacia', attribute: 'dexterity' },
    { name: 'Adestrar Animais', attribute: 'wisdom' },
    { name: 'Arcanismo', attribute: 'intelligence' },
    { name: 'Atletismo', attribute: 'strength' },
    { name: 'Atuação', attribute: 'charisma' },
    { name: 'Enganação', attribute: 'charisma' },
    { name: 'Furtividade', attribute: 'dexterity' },
    { name: 'História', attribute: 'intelligence' },
    { name: 'Intuição', attribute: 'wisdom' },
    { name: 'Intimidação', attribute: 'charisma' },
    { name: 'Investigação', attribute: 'intelligence' },
    { name: 'Medicina', attribute: 'wisdom' },
    { name: 'Natureza', attribute: 'intelligence' },
    { name: 'Percepção', attribute: 'wisdom' },
    { name: 'Persuasão', attribute: 'charisma' },
    { name: 'Prestidigitação', attribute: 'dexterity' },
    { name: 'Religião', attribute: 'intelligence' },
    { name: 'Sobrevivência', attribute: 'wisdom' },
];
