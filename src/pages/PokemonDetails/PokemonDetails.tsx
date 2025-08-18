import PokemonDashboard from '@/components/PokemonDashboard/PokemonDashboard';
import PokemonEvolutionChart from '@/components/PokemonEvolutionChart/PokemonEvolutionChart';
import Spinner from '@/components/Spinner/Spinner';
import usePokemon from '@/hooks/usePokemon';
import { getPokemon } from '@/services/pokemon';
import type { PokemonInfo } from '@/types/pokemon';
import { Flex, Typography } from 'antd';
import { useCallback, useState, type FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

const { Title } = Typography;

const PokemonDetails: FunctionComponent = () => {
  const { pokemonName = '' } = useParams();
  const [pokemonVariant, setPokemonVariant] = useState<PokemonInfo>();

  const [
    { data: pokemonBase, ...pokemonInfoResponse },
    { data: pokemonSpecie, ...pokemonSpecieResponse },
  ] = usePokemon(pokemonName);

  const onVariantSelect = useCallback(
    (variant: string) => {
      if (!pokemonSpecie?.varieties) return;

      const variantUrlInfo = pokemonSpecie.varieties.find(
        (v) => v.pokemon.name === variant
      )?.pokemon.url;

      if (!variantUrlInfo) return;

      getPokemon(variantUrlInfo).then(setPokemonVariant);
    },
    [pokemonSpecie?.varieties]
  );

  if (pokemonInfoResponse.isLoading || pokemonSpecieResponse.isLoading)
    return <Spinner />;

  if (!pokemonBase || !pokemonSpecie) {
    return <Title level={3}>Pokemon not found</Title>;
  }

  const pokemon = pokemonVariant ?? pokemonBase;

  return (
    <Flex justify='center' wrap gap='large' vertical>
      <Flex gap='small' wrap justify='center'>
        <Title style={{ textTransform: 'capitalize' }}>
          {pokemonSpecie!.name}
        </Title>
        {/** For some reason, the margin top is different in this component. TODO: Check it later */}
        <Title style={{ marginTop: '0.67em' }} type='secondary'>
          {' '}
          - #{String(pokemonSpecie!.id).padStart(4, '0')}
        </Title>
      </Flex>
      <PokemonDashboard
        pokemonInfo={pokemon}
        pokemonSpecie={pokemonSpecie}
        onVariantSelect={onVariantSelect}
      />
      <PokemonEvolutionChart
        id={pokemon!.id}
        evolutionChainURL={pokemonSpecie!.evolution_chain.url}
      />
    </Flex>
  );
};

export default PokemonDetails;
