import { Flex, Select, type SelectProps, Typography } from 'antd';
import {
  useCallback,
  useEffect,
  useState,
  type FunctionComponent,
} from 'react';
import styles from './searchBar.module.scss';
import { getAllSpecies } from '@/services/pokemon';
import { routes } from '@/routes/routes';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const SearchBar: FunctionComponent = () => {
  const [totalItems, setTotalItems] = useState<number>(-1);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const navigate = useNavigate();

  const goToDetails = useCallback((selectedPokemon: string) => {
    navigate(routes.pokemonByName.replace(':pokemonName', selectedPokemon));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllSpecies()
      .then(({ count }) => setTotalItems(count))
      .catch((error) => {
        console.error('Error fetching species:', error);
      });
  }, []);

  useEffect(() => {
    getAllSpecies({ params: { limit: totalItems } })
      .then(({ results }) => {
        const opts = results.map(({ name }) => ({
          label: <Text style={{ textTransform: 'capitalize' }}>{name}</Text>,
          value: name,
        }));
        setOptions(opts);
      })
      .catch((error) => {
        console.error('Error fetching species for options:', error);
      });
  }, [totalItems]);

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
