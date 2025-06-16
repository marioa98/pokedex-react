import Spinner from "@/components/Spinner/Spinner";
import usePokemon from "@/hooks/usePokemon";
import { Descriptions, Flex, Image, Typography } from "antd";
import type { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import styles from './pokemonDetails.module.scss'
import { getAbilitiesFormatted, getHeightFormat, getLocalizedDescription, getLocalizedGenus, getWeightFormat } from "@/utils/pokemon";

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
      <Flex
        align="middle"
        justify="center"
        wrap
        gap="small"
        className={styles.pokemonContainer}
      >
        <Image
          alt={data.name}
          src={data.sprites.front_default}
          preview={false}
          className={styles.sprite}
        />
        <Descriptions
          bordered
          size="middle"
          layout="vertical"
          column={4}
        >
          <Descriptions.Item span={4} label="About">
            {getLocalizedDescription(data.flavor_text_entries)}
          </Descriptions.Item>

          <Descriptions.Item label="Height" span={2}>
            {getHeightFormat(data.height)}
          </Descriptions.Item>
          <Descriptions.Item label="Weight" span={2}>
            {getWeightFormat(data.weight)}
          </Descriptions.Item>

          <Descriptions.Item
            label="Abilities"
            style={{ textTransform: 'capitalize'}}
            span={2}
          >
            {getAbilitiesFormatted(data.abilities)}
          </Descriptions.Item>
          <Descriptions.Item
            label="Genus"
            style={{ textTransform: 'capitalize'}}
            span={2}
          >
            {getLocalizedGenus(data.genera)}
          </Descriptions.Item>
        </Descriptions>
      </Flex>
    </Flex>
  )
}

export default PokemonDetails;