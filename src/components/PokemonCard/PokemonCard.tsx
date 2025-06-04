import type { FunctionComponent } from "react";
import type { PokemonCardProps } from "./types";
import { Card } from "antd";
import styles from './pokemonCard.module.scss'
import usePokemon from "@/hooks/usePokemon";

const PokemonCard: FunctionComponent<PokemonCardProps> = ({ data }) => {
  const {
    data: {
      name,
      id: gameNumber,
      sprites
    } = {}
  } = usePokemon(data.name);

  const formatNumber = String(gameNumber).padStart(4, '0');

  return (
    <Card
      hoverable
      className={styles.card}
      type="inner"
      cover={
        <img className={styles.sprite} alt={name} src={sprites?.front_default} />
      }
    >
      <Card.Meta
        title={`#${formatNumber} - ${name}`}
        className={styles.title}
      />
    </Card>
  )
}

export default PokemonCard
