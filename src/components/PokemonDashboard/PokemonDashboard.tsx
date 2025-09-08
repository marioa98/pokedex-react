import { useEffect, useState, type FunctionComponent } from 'react';
import type { PokemonDashboardProps } from './types';
import { Descriptions, Flex, Image, Select, Switch } from 'antd';
import PokemonTypeBadge from '../PokemonTypeBadge/PokemonTypeBadge';
import {
  getAbilitiesFormatted,
  getHeightFormat,
  getLocalizedDescription,
  getLocalizedGenus,
  getWeightFormat,
} from '@/utils/pokemon';
import styles from './pokemonDashboard.module.scss';
import usePokemonWeakness from '@/hooks/usePokemonWeaknesses';

const formatPokemonVariantName = (name: string): string => {
  return name.replace('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const PokemonDashboard: FunctionComponent<PokemonDashboardProps> = ({
  pokemonInfo,
  pokemonSpecie,
  onVariantSelect,
}) => {
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [spriteSrc, setSpriteSrc] = useState<string>(
    pokemonInfo.sprites.other['official-artwork'].front_default
  );
  const { abilities, height, name, types, weight, sprites } = pokemonInfo;
  const { varieties, flavor_text_entries, genera } = pokemonSpecie;

  const weaknesses = usePokemonWeakness(types);

  const onShinyToggle = (checked: boolean) => {
    setIsShiny(checked);
  }

  useEffect(() => {
    const spritesList = sprites.other['official-artwork'];
    setSpriteSrc(() => {
      if (isShiny && spritesList.front_shiny) return spritesList.front_shiny;
      return spritesList.front_default;
    });
  }, [isShiny, sprites]);

  return (
    <Flex align='center' justify='center' wrap gap='large'>
      <Image
        alt={name}
        src={spriteSrc}
        preview={false}
        className={styles.sprite}
      />
      <Flex
        gap='small'
        wrap
        justify='center'
        vertical
        className={styles['info-dashboard']}
      >
        {varieties.length > 1 && (
          <Select
            className={styles['variants-list']}
            defaultValue={formatPokemonVariantName(
              varieties.find((variant) => variant.is_default)?.pokemon.name ??
                ''
            )}
            onSelect={onVariantSelect}
          >
            {varieties.map(({ pokemon: pokemonVariant }) => (
              <Select.Option key={pokemonVariant.name}>
                {formatPokemonVariantName(pokemonVariant.name)}
              </Select.Option>
            ))}
          </Select>
        )}
        <Descriptions
          bordered
          size='middle'
          layout='vertical'
          column={6}
          className={styles.info}
        >
          <Descriptions.Item span={6} label='About'>
            {getLocalizedDescription(flavor_text_entries)}
          </Descriptions.Item>

          <Descriptions.Item label='Types' span={3}>
            {types.map(({ type: { name: typeName } },) => (
              <PokemonTypeBadge
                key={`${name}-type-${typeName}`}
                type={typeName}
              />
            ))}
          </Descriptions.Item>
          <Descriptions.Item label='Weaknesses' span={3}>
            {weaknesses.map((weakness) => (
              <PokemonTypeBadge
                key={`${name}-weakness-${weakness}`}
                type={weakness}
              />
            ))}
          </Descriptions.Item>

          <Descriptions.Item
            label='Genus'
            style={{ textTransform: 'capitalize' }}
            span={2}
          >
            {getLocalizedGenus(genera)}
          </Descriptions.Item>

          <Descriptions.Item label='Height' span={2}>
            {getHeightFormat(height)}
          </Descriptions.Item>
          <Descriptions.Item label='Weight' span={2}>
            {getWeightFormat(weight)}
          </Descriptions.Item>

          <Descriptions.Item
            label='Abilities'
            style={{ textTransform: 'capitalize' }}
            span={5}
          >
            {getAbilitiesFormatted(abilities)}
          </Descriptions.Item>

          <Descriptions.Item
            label='Shiny'
            span={1}
          >
            <Switch onChange={onShinyToggle} />
          </Descriptions.Item>
        </Descriptions>
      </Flex>
    </Flex>
  );
};

export default PokemonDashboard;
