import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import { routes } from './routes/routes';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';

function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path={routes.pokemonByName} element={<PokemonDetails />} />
    </Routes>
  );
}

export default App;
