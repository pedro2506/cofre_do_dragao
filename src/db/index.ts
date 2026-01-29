import Dexie, { type Table } from 'dexie';
import type { CharacterSheet } from '../types';

export class AppDatabase extends Dexie {
    characters!: Table<CharacterSheet>;

    constructor() {
        super('DnDCharacterManager');
        this.version(1).stores({
            characters: '++id, name, race, class, level'
        });
    }
}

export const db = new AppDatabase();
