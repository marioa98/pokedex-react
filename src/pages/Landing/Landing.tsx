import Spinner from '@/components/Spinner/Spinner';
import usePokedex from '@/hooks/usePokedex';
import { Flex } from 'antd';
import { useEffect, type FunctionComponent } from 'react';
import PokemonCard from '@/components/PokemonCard/PokemonCard';
import { useInView } from 'react-intersection-observer';
import styles from './landing.module.scss';

const Landing: FunctionComponent = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, isFetchingNextPage, fetchNextPage } = usePokedex();

  useEffect(() => {
    if (inView) fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (isLoading) return <Spinner />;

  return (
    <Flex
      wrap
      gap='large'
      justify='center'
      align='center'
      className={styles['pokemon-list']}
    >
      {data?.pages.map(({ results }) => {
        return (
          <>
            {results.map((pokemon) => {
              const key = `pokemon-card-${pokemon.name}`;
              return <PokemonCard key={key} pokemon={pokemon} />;
            })}
          </>
        );
      })}
      {isFetchingNextPage && <Spinner />}
      <div style={{ width: '100vw', height: '1vh' }} ref={ref} />
    </Flex>
  );
};

export default Landing;
