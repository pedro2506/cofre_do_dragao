import type { Archetype, CharacterSheet, Skill } from '../types';

/**
 * Exporta uma ficha de personagem para um arquivo JSON.
 */
export const exportCharacterToJSON = (character: CharacterSheet) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(character, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${character.name.replace(/\s+/g, '_')}_ficha.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

/**
 * Lê um arquivo JSON e retorna os dados da ficha.
 */
export const importCharacterFromJSON = (file: File): Promise<CharacterSheet> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                resolve(json as CharacterSheet);
            } catch (e) {
                reject(new Error("Arquivo JSON inválido."));
            }
        };
        reader.onerror = () => reject(new Error("Erro ao ler o arquivo."));
        reader.readAsText(file);
    });
};
