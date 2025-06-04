import Spinner from "@/components/Spinner/Spinner";
import usePokedex from "@/hooks/usePokedex";
import { Flex } from "antd";
import type { FunctionComponent } from "react";
import PokemonCard from "@/components/PokemonCard/PokemonCard";

const Landing: FunctionComponent = () => {
  const {
    data: {
      results
    } = {},
    isLoading
  } = usePokedex()
  
  if (isLoading) return <Spinner />

  return (
    <Flex
      wrap
      gap="large"
      justify="center"
      align="center"
    >
      {!!results?.length && results.map((pokemon) => {
        const key = `pokemon-card-${pokemon.name}`
        return (
          <PokemonCard key={key} data={pokemon} />
        )
      })}
    </Flex>
  )
}

export default Landing
