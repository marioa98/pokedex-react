import { Flex, Spin } from 'antd';
import type { FunctionComponent } from 'react';
import styles from './spinner.module.scss';

const Spinner: FunctionComponent = () => (
  <Flex align='center' justify='center' className={styles['spinner-container']}>
    <Spin size='large' />
  </Flex>
);

export default Spinner;
