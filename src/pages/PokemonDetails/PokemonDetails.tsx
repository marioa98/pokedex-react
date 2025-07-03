import Spinner from "@/components/Spinner/Spinner";
import usePokemon from "@/hooks/usePokemon";
import { Flex, Typography } from "antd";
import type { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import PokemonDashboard from "@/components/PokemonDashboard/PokemonDashboard";

const { Title } = Typography

const PokemonDetails: FunctionComponent = () => {
  const { pokemonName = '' } = useParams()

  const { data, isLoading } = usePokemon(pokemonName)

  if (isLoading) return <Spinner />

  if (!data) return <Title level={3}>Data not found</Title>

  return (
    <Flex
      justify="center"
      wrap
      gap="large"
      vertical
    >
      <Flex gap="small" wrap justify="center">
        <Title style={{ textTransform: 'capitalize' }}>{data.name}</Title>
        {/** For some reason, the margin top is different in this component. TODO: Check it later */}
        <Title style={{ marginTop: '0.67em' }} type='secondary'> - #{String(data.id).padStart(4, '0')}</Title>
      </Flex>
      <PokemonDashboard data={data} />
    </Flex>
  )
}

export default PokemonDetails;