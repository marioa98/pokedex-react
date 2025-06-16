interface AppRoutes {
  root: string;
  pokemonByName: string;
}

export const routes: AppRoutes = {
  root: '/',
  pokemonByName: '/pokemon/:pokemonName'
}