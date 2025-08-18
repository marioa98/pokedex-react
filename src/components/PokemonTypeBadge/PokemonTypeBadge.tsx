import type { FunctionComponent } from 'react';
import type { PokemonTypeBadgeProps } from './types';
import { Tag } from 'antd';
import styles from './pokemonTag.module.scss';
import clsx from 'clsx';

const PokemonTypeBadge: FunctionComponent<PokemonTypeBadgeProps> = ({
  type,
}) => (
  <Tag className={clsx(styles.container, styles[type])} bordered={false}>
    {type}
  </Tag>
);

export default PokemonTypeBadge;
