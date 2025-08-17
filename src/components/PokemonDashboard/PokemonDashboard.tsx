import type { FunctionComponent } from "react";
import type { PokemonDashboardProps } from "./types";
import { Descriptions, Flex, Image } from "antd";
import { getPokemonDetailImg } from "@/utils/image";
import PokemonTypeBadge from "../PokemonTypeBadge/PokemonTypeBadge";
import { getAbilitiesFormatted, getHeightFormat, getLocalizedDescription, getLocalizedGenus, getWeightFormat } from "@/utils/pokemon";
import styles from "./pokemonDashboard.module.scss";

const PokemonDashboard: FunctionComponent<PokemonDashboardProps> = ({
  data
}) => {
  const {
    abilities,
    flavor_text_entries,
    genera,
    height,
    id,
    name,
    types,
    weight,
  } = data;

  return (
    <Flex
      align="middle"
      justify="center"
      wrap
      gap="middle"
    >
      <Image
        alt={name}
        src={getPokemonDetailImg(id)}
        preview={false}
        className={styles.sprite}
      />
      <Flex gap="small" wrap justify="center" vertical>
        <Descriptions
          bordered
          size="middle"
          layout="vertical"
          column={6}
          className={styles.info}
        >
          <Descriptions.Item span={6} label="About">
            {getLocalizedDescription(flavor_text_entries)}
          </Descriptions.Item>

          <Descriptions.Item label="Types" span={2}>
            {types.map((type, typeIndex) => (
              <PokemonTypeBadge key={`${name}-type-${typeIndex}`} type={type.type.name} />
            ))}
          </Descriptions.Item>
          <Descriptions.Item
            label="Abilities"
            style={{ textTransform: 'capitalize'}}
            span={2}
          >
            {getAbilitiesFormatted(abilities)}
          </Descriptions.Item>
          <Descriptions.Item
            label="Genus"
            style={{ textTransform: 'capitalize'}}
            span={2}
          >
            {getLocalizedGenus(genera)}
          </Descriptions.Item>

          <Descriptions.Item label="Height" span={3}>
            {getHeightFormat(height)}
          </Descriptions.Item>
          <Descriptions.Item label="Weight" span={3}>
            {getWeightFormat(weight)}
          </Descriptions.Item>
        </Descriptions>
      </Flex>
    </Flex>
  )
}

export default PokemonDashboard;
