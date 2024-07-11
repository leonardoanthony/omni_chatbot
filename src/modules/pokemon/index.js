import fetch from 'node-fetch';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { icons } from '../../config/icons.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const pokemon = async (name = '') => {
    const pokeID = Math.floor(Math.random() * 1026) + 1
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${name ? name : pokeID}`;

    const {pokeTypes} = icons;

    const result = await fetch(baseUrl);

    if(result.ok){
        return false;
    }

    const pokemon = await result.json();


    const types = pokemon.types.map(typeInfo => pokeTypes[typeInfo.type.name]).join(' ');

    const fileImage = await dowloadPokemonImage(pokemon.sprites.other['official-artwork'].front_default, pokemon.id);

    const response = {
        id: pokemon.id,
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1),
        image: fileImage,
        types,
    }

    return response;
}


async function dowloadPokemonImage(url, id){
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch the image. Status: ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const filePath = resolve(__dirname, `${id}.png`);

    writeFileSync(filePath, buffer);
    return filePath;
}