import { useCallback, type FunctionComponent } from "react";
import type { PokemonCardProps } from "./types";
import { Card } from "antd";
import styles from './pokemonCard.module.scss'
import usePokemon from "@/hooks/usePokemon";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes/routes";

const PokemonCard: FunctionComponent<PokemonCardProps> = ({ data }) => {
  const {
    data: {
      name,
      id: gameNumber,
      sprites
    } = {}
  } = usePokemon(data.name);
  const navigate = useNavigate();

  const formatNumber = String(gameNumber).padStart(4, '0');

  const onCardClick = useCallback(() => {
    navigate(routes.pokemonByName.replace(':pokemonName', data.name))
  }, [])

  return (
    <Card
      hoverable
      className={styles.card}
      type="inner"
      cover={
        <img className={styles.sprite} alt={name} src={sprites?.front_default} />
      }
      onClick={onCardClick}
    >
      <Card.Meta
        title={`#${formatNumber} - ${name}`}
        className={styles.title}
      />
    </Card>
  )
}

export default PokemonCard
