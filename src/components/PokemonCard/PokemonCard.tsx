import { useCallback, type FunctionComponent } from 'react';
import type { PokemonCardProps } from './types';
import { Card, Flex, Typography } from 'antd';
import styles from './pokemonCard.module.scss';
import usePokemon from '@/hooks/usePokemon';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/routes';
import PokemonTypeBadge from '../PokemonTypeBadge/PokemonTypeBadge';

const { Title } = Typography;

const PokemonCard: FunctionComponent<PokemonCardProps> = ({ pokemon }) => {
  const { data: { id: gameNumber, types, species, sprites } = {} } = usePokemon(
    pokemon.name,
    { url: pokemon.url }
  );

  const navigate = useNavigate();

  const formatNumber = String(gameNumber).padStart(4, '0');

  const onCardClick = useCallback(() => {
    navigate(routes.pokemonByName.replace(':pokemonName', pokemon.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.name]);

  return (
    <Card
      hoverable
      className={styles.card}
      type='inner'
      cover={
        <img
          className={styles.sprite}
          alt={species?.name}
          src={sprites?.other['official-artwork'].front_default}
        />
      }
      onClick={onCardClick}
    >
      <Card.Meta
        title={
          <Title
            className={styles.title}
            level={5}
          >{`#${formatNumber} - ${species?.name ?? pokemon.name}`}</Title>
        }
        description={
          <Flex justify='center'>
            {types &&
              types.map((typeInfo, index) => (
                <PokemonTypeBadge
                  key={`${pokemon.name}-type-${index}`}
                  type={typeInfo.type.name}
                />
              ))}
          </Flex>
        }
      />
    </Card>
  );
};

export default PokemonCard;
