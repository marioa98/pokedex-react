import { Flex, Select, type SelectProps, Typography } from 'antd';
import {
  useCallback,
  useEffect,
  useState,
  type FunctionComponent,
} from 'react';
import styles from './searchBar.module.scss';
import { routes } from '@/routes/routes';
import { useNavigate } from 'react-router-dom';
import { usePokemonContext } from '@/context/PokemonContext/PokemonContext';

const { Text } = Typography;

const SearchBar: FunctionComponent = () => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const navigate = useNavigate();

  const { pokemonList } = usePokemonContext()

  const goToDetails = useCallback((selectedPokemon: string) => {
    navigate(routes.pokemonByName.replace(':pokemonName', selectedPokemon));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const opts = pokemonList.map(({ name }) => ({
      label: <Text style={{ textTransform: 'capitalize' }}>{name}</Text>,
      value: name,
    }));
    setOptions(opts);
  }, [pokemonList]);

  return (
    <Flex
      justify='center'
      align='center'
      className={styles['search-bar-container']}
    >
      <Select
        showSearch
        placeholder='Search a pokemon by name'
        className={styles['search-bar']}
        size='large'
        options={options}
        onSelect={goToDetails}
      />
    </Flex>
  );
};

export default SearchBar;
