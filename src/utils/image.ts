import type { PokemonVariety } from '@/types/pokemon';

const getPokemonImage = (
  pokemonNumber: string | number,
  imageType: 'detail' | 'full'
): string => {
  const parsedNumber = String(pokemonNumber).padStart(3, '0');

  return `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/${imageType}/${parsedNumber}.png`;
};

export const getPokemonCardImg = (pokemonNumber: string | number): string =>
  getPokemonImage(pokemonNumber, 'detail');

export const getPokemonDetailImg = (pokemonNumber: string | number): string =>
  getPokemonImage(pokemonNumber, 'full');

export const getPokemonVariationId = ({
  id,
  variantName,
  varieties,
}: {
  id: number;
  variantName: string;
  varieties: PokemonVariety[];
}): string => {
  const varietyIndex = varieties.findIndex(
    ({ pokemon }) => pokemon.name === variantName
  );

  const variant = varieties[varietyIndex];

  if (varietyIndex === -1 || variant.is_default) return String(id);

  return `${String(id).padStart(3, '0')}_f${varietyIndex + 1}`;
};
