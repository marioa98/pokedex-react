import PokemonDashboard from "@/components/PokemonDashboard/PokemonDashboard";
import PokemonEvolutionChart from "@/components/PokemonEvolutionChart/PokemonEvolutionChart";
import Spinner from "@/components/Spinner/Spinner";
import usePokemon from "@/hooks/usePokemon";
import type { PokemonFullInfo } from "@/types/pokemon";
import { Flex, Typography } from "antd";
import { type FunctionComponent } from "react";
import { useParams } from "react-router-dom";

const { Title } = Typography

const PokemonDetails: FunctionComponent = () => {
  const { pokemonName = '' } = useParams()

  const [
    { data: pokemon, ...pokemonInfoResponse },
    { data: pokemonSpecie, ...pokemonSpecieResponse }
  ] = usePokemon(pokemonName)

  if (pokemonInfoResponse.isLoading || pokemonSpecieResponse.isLoading) return <Spinner />

  if (!pokemon && !pokemonSpecie) return <Title level={3}>Pokemon not found</Title>

  return (
    <Flex
      justify="center"
      wrap
      gap="large"
      vertical
    >
      <Flex gap="small" wrap justify="center">
        <Title style={{ textTransform: 'capitalize' }}>{pokemon!.name}</Title>
        {/** For some reason, the margin top is different in this component. TODO: Check it later */}
        <Title style={{ marginTop: '0.67em' }} type='secondary'> - #{String(pokemon!.id).padStart(4, '0')}</Title>
      </Flex>
      <PokemonDashboard data={{ ...pokemon, ...pokemonSpecie } as PokemonFullInfo} />
      <PokemonEvolutionChart
        id={pokemon!.id}
        evolutionChainURL={pokemonSpecie!.evolution_chain.url}
      />
    </Flex>
  )
}

export default PokemonDetails;