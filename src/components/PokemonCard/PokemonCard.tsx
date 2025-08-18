import { useCallback, type FunctionComponent } from 'react';
import type { PokemonCardProps } from './types';
import { Card } from 'antd';
import styles from './pokemonCard.module.scss';
import usePokemon from '@/hooks/usePokemon';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/routes';
import PokemonTypeBadge from '../PokemonTypeBadge/PokemonTypeBadge';
import { getPokemonCardImg } from '@/utils/image';

const PokemonCard: FunctionComponent<PokemonCardProps> = ({ pokemon }) => {
  const [{ data: { name, id: gameNumber, types } = {} }] = usePokemon(
    pokemon.name,
    { url: pokemon.url }
  );
  const navigate = useNavigate();

  const formatNumber = String(gameNumber).padStart(4, '0');

  const onCardClick = useCallback(() => {
    navigate(routes.pokemonByName.replace(':pokemonName', String(gameNumber)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameNumber]);

  return (
    <Card
      hoverable
      className={styles.card}
      type='inner'
      cover={
        <img
          className={styles.sprite}
          alt={name}
          src={getPokemonCardImg(gameNumber!)}
        />
      }
      onClick={onCardClick}
    >
      <Card.Meta
        title={`#${formatNumber} - ${name ?? pokemon.name}`}
        className={styles.title}
        description={
          <>
            {types &&
              types.map((typeInfo, index) => (
                <PokemonTypeBadge
                  key={`${pokemon.name}-type-${index}`}
                  type={typeInfo.type.name}
                />
              ))}
          </>
        }
      />
    </Card>
  );
};

export default PokemonCard;
