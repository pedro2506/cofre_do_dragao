export interface Attribute {
    value: number;
    modifier: number;
}

export interface Attributes {
    strength: Attribute;
    dexterity: Attribute;
    constitution: Attribute;
    intelligence: Attribute;
    wisdom: Attribute;
    charisma: Attribute;
}

export interface Skill {
    name: string;
    attribute: keyof Attributes;
    proficient: boolean;
    bonus: number;
}

export interface Action {
    name: string;
    type: string;
    attackBonus: number;
    damage: string;
    description: string;
}

export interface Spell {
    name: string;
    level: number;
    castingTime: string;
    range: string;
    description: string;
}

export type Archetype =
    | 'warrior'
    | 'mage'
    | 'rogue'
    | 'cleric'
    | 'paladin';

export interface CharacterSheet {
    id?: number;
    name: string;
    race: string;
    class: string;
    level: number;
    background: string;
    alignment: string;
    experience: number;

    archetype: Archetype;
    avatar?: string;

    attributes: Attributes;

    hp: {
        current: number;
        max: number;
        temp: number;
    };

    ac: number;
    initiative: number;
    speed: number;

    skills: Skill[];
    actions: Action[];
    spells: Spell[];
    equipment: string[];

    // Modularidade
    config: {
        showSpells: boolean;
        showSkills: boolean;
        showInventory: boolean;
        showBackground: boolean;
    };

    createdAt: number;
    updatedAt: number;
}
