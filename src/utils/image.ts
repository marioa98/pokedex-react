const getPokemonImage = (
  pokemonNumber: number,
  imageType: 'detail' | 'full'
): string => {
  const parsedNumber = String(pokemonNumber).padStart(3, '0');

  return `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/${imageType}/${parsedNumber}.png`;
};

export const getPokemonCardImg = (pokemonNumber: number): string =>
  getPokemonImage(pokemonNumber, 'detail');

export const getPokemonDetailImg = (pokemonNumber: number): string =>
  getPokemonImage(pokemonNumber, 'full');
