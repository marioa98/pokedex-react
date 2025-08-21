import type { FunctionComponent } from 'react';
import type { PokemonAvatarProps } from './types';
import { useNavigate } from 'react-router-dom';
import { Flex, Image, Typography } from 'antd';
import { goToDetailsPath } from '@/routes/routes';
import PokemonTypeBadge from '../PokemonTypeBadge/PokemonTypeBadge';
import styles from './pokemonAvatar.module.scss';

const { Title } = Typography;

const PokemonAvatar: FunctionComponent<PokemonAvatarProps> = ({ pokemon }) => {
  const { name, types, sprites } = pokemon;

  const navigate = useNavigate();

  return (
    <Flex vertical className={styles.pokemon}>
      <Image
        width={150}
        height={150}
        preview={false}
        onClick={() => {
          navigate(goToDetailsPath(pokemon.name), {
            replace: true,
          });
        }}
        src={sprites.other['official-artwork'].front_default}
        className={styles.sprite}
      />

      <Flex justify='center' align='center' vertical>
        <Title className={styles.name} level={5}>
          {name}
        </Title>
        <Flex align='center' justify='center'>
          {types &&
            types.map(({ type }, typeIndex) => (
              <PokemonTypeBadge
                key={`pokemon-type-${typeIndex}`}
                type={type.name}
              />
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PokemonAvatar;
