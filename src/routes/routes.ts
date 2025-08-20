interface AppRoutes {
  root: string;
  pokemonByName: string;
}

export const routes: AppRoutes = {
  root: '/',
  pokemonByName: '/pokemon/:pokemonName',
};

export const goToDetailsPath = (pokemonName: string): string => {
  return routes.pokemonByName.replace(':pokemonName', pokemonName);
};
