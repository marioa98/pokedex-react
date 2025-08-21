import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import { routes } from './routes/routes';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';
import PokemonContextProvider from './context/PokemonContext/PokemonContext';
import { Flex } from 'antd';
import SearchBar from './components/SearchBar/SearchBar';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <PokemonContextProvider>
      <Flex wrap gap='large' justify='center' align='center' vertical>
        <SearchBar />
        <Routes>
          <Route index element={<Landing />} />
          <Route path={routes.pokemonByName} element={<PokemonDetails />} />
          <Route path={routes.notFoundPath} element={<NotFound />} />
        </Routes>
      </Flex>
    </PokemonContextProvider>
  );
}

export default App;
