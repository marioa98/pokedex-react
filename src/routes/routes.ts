interface AppRoutes {
  root: string;
  pokemonByName: string;
  notFoundPath: string;
}

export const routes: AppRoutes = {
  root: '/',
  pokemonByName: '/pokemon/:pokemonName',
  notFoundPath: '*',
};

export const goToDetailsPath = (pokemonName: string): string => {
  return routes.pokemonByName.replace(':pokemonName', pokemonName);
};
