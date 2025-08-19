import { type FunctionComponent } from 'react';
import type { PokemonEvolutionChartProps } from './types';
import { Flex, Typography } from 'antd';
import styles from './pokemonEvolutionChart.module.scss';
import PokemonAvatar from '../PokemonAvatar/PokemonAvatar';
import { DownOutlined } from '@ant-design/icons';
import usePokemonEvolution from '@/hooks/usePokemonEvolution';
import Spinner from '../Spinner/Spinner';

const { Title } = Typography;

const PokemonEvolutionChart: FunctionComponent<PokemonEvolutionChartProps> = ({
  evolutionChainURL,
  id,
}) => {
  const { isLoading, data: pokemonChain } = usePokemonEvolution(
    id,
    evolutionChainURL
  );

  if (isLoading) return <Spinner />;

  return (
    <Flex justify='center'>
      <Flex className={styles['evolution-showcase']} vertical justify='center'>
        <Title level={3} className={styles.title}>
          Evolutions
        </Title>
        <Flex justify='space-around' align='center' vertical>
          {pokemonChain.map((pokemon, chainIndex) => (
            <>
              {Array.isArray(pokemon) ? (
                <Flex
                  key={`pokemon-multiple-line-${chainIndex}`}
                  className={styles['evolution-link']}
                >
                  {pokemon.map((evolution, subIndex) => (
                    <PokemonAvatar
                      key={`pokemon-evolution-${evolution.name}-${subIndex}`}
                      pokemon={evolution}
                    />
                  ))}
                </Flex>
              ) : (
                <PokemonAvatar
                  key={`pokemon-evolution-${pokemon.name}`}
                  pokemon={pokemon}
                />
              )}
              {chainIndex < pokemonChain.length - 1 && (
                <DownOutlined className={styles['down-arrow']} />
              )}
            </>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PokemonEvolutionChart;
