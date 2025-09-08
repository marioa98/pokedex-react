import type { FunctionComponent } from 'react';
import type { PokemonDashboardProps } from './types';
import { Descriptions, Flex, Image, Select } from 'antd';
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
  const { abilities, height, name, types, weight, sprites } = pokemonInfo;
  const { varieties, flavor_text_entries, genera } = pokemonSpecie;

  const weaknesses = usePokemonWeakness(types);

  return (
    <Flex align='center' justify='center' wrap gap='large'>
      <Image
        alt={name}
        src={sprites.other['official-artwork'].front_default}
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
            label='Abilities'
            style={{ textTransform: 'capitalize' }}
            span={3}
          >
            {getAbilitiesFormatted(abilities)}
          </Descriptions.Item>
          <Descriptions.Item
            label='Genus'
            style={{ textTransform: 'capitalize' }}
            span={3}
          >
            {getLocalizedGenus(genera)}
          </Descriptions.Item>

          <Descriptions.Item label='Height' span={3}>
            {getHeightFormat(height)}
          </Descriptions.Item>
          <Descriptions.Item label='Weight' span={3}>
            {getWeightFormat(weight)}
          </Descriptions.Item>
        </Descriptions>
      </Flex>
    </Flex>
  );
};

export default PokemonDashboard;
