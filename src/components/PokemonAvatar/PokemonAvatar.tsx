import type { FunctionComponent } from 'react';
import type { PokemonAvatarProps } from './types';
import { useNavigate } from 'react-router-dom';
import { Flex, Image, Typography } from 'antd';
import { routes } from '@/routes/routes';
import { getPokemonCardImg } from '@/utils/image';
import PokemonTypeBadge from '../PokemonTypeBadge/PokemonTypeBadge';
import styles from './pokemonAvatar.module.scss';

const { Title } = Typography;

const PokemonAvatar: FunctionComponent<PokemonAvatarProps> = ({ pokemon }) => {
  const navigate = useNavigate();

  return (
    <Flex vertical className={styles.pokemon}>
      <Image
        width={150}
        height={150}
        preview={false}
        onClick={() => {
          navigate(routes.pokemonByName.replace(':pokemonName', pokemon.name));
        }}
        src={getPokemonCardImg(pokemon.id)}
        className={styles.sprite}
      />

      <Flex justify='center' align='center' vertical>
        <Title className={styles.name} level={5}>
          {pokemon.name}
        </Title>
        <Flex align='center' justify='center'>
          {pokemon.types &&
            pokemon.types.map(({ type }, typeIndex) => (
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
