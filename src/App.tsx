import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import { routes } from './routes/routes';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';
import PokemonContextProvider from './context/PokemonContext/PokemonContext';

function App() {
  return (
    <PokemonContextProvider>
      <Routes>
        <Route index element={<Landing />} />
        <Route path={routes.pokemonByName} element={<PokemonDetails />} />
      </Routes>
    </PokemonContextProvider>
  );
}

export default App;
